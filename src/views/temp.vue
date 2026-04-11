<template>
    <!-- 顶部已处理文件标签栏 -->
    <div class="processed-file-bar">
        <n-tag
            v-for="(file, index) in processedFiles"
            :key="index"
            type="primary"
            closable
            @close="removeProcessedFile(index)"
            @click="goToFilePreview(file)"
            style="cursor: pointer; margin-right: 8px"
        >
            {{ file.name }}
        </n-tag>
    </div>

    <!-- 分成左右两半的操作栏 -->
    <div class="action-bar double-bar">
        <!-- 左半部分：筛选和查看数据 -->
        <div class="bar-left">
            <n-button
                style="
                    border-radius: 20px;
                    padding: 0 16px;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                "
                @click="openFilterModal"
            >
                <n-icon>
                    <FilterOutline />
                </n-icon>
                筛选
            </n-button>
            <n-button style="border-radius: 20px; padding: 0 16px" @click="goToDataView">
                查看数据
            </n-button>
        </div>

        <!-- 右半部分：开始处理 -->
        <div class="bar-right">
            <n-button
                type="primary"
                style="border-radius: 20px; padding: 0 20px"
                @click="startProcess"
            >
                开始处理
            </n-button>
        </div>
    </div>

    <!-- 穿梭框 -->
    <n-transfer v-model:value="value" :options="showOptions" />

    <!-- 筛选弹窗 -->
    <n-modal
        v-model:show="showFilterModal"
        preset="card"
        title="筛选条件"
        style="width: 520px"
        :closable="false"
    >
        <!-- 标题栏帮助图标 -->
        <template #header-extra>
            <n-space>
                <n-icon style="cursor: pointer; color: #999; font-size: 20px">
                    <HelpCircleOutline />
                </n-icon>
                <n-icon style="cursor: pointer; color: #1890ff; font-size: 20px">
                    <BulbOutline />
                </n-icon>
            </n-space>
        </template>

        <!-- 筛选条件行 -->
        <div v-for="(row, index) in filterRows" :key="index" class="filter-row">
            <!-- 字段选择 -->
            <n-select
                v-model:value="row.field"
                :options="fieldOptions"
                placeholder="请选择"
                style="width: 140px"
                size="large"
            />
            <!-- 条件选择 -->
            <n-select
                v-model:value="row.condition"
                :options="conditionOptions"
                placeholder="请选择"
                style="width: 120px"
                size="large"
            />
            <!-- 值选择 -->
            <n-select
                v-model:value="row.value"
                :options="getValueOptions(row.field)"
                placeholder="请选择"
                style="width: 140px"
                size="large"
            />
            <!-- + / - 按钮 -->
            <n-space>
                <n-button
                    size="small"
                    quaternary
                    @click="addFilterRow"
                    :disabled="filterRows.length >= 4"
                >
                    +
                </n-button>
                <n-button
                    size="small"
                    quaternary
                    @click="removeFilterRow(index)"
                    :disabled="filterRows.length <= 1"
                >
                    −
                </n-button>
            </n-space>
        </div>

        <!-- 提示文字 -->
        <div style="color: #ff4d4f; font-size: 14px; margin: 12px 0 20px 0">最多四个筛选条件</div>

        <!-- 底部按钮 -->
        <div style="display: flex; justify-content: flex-end; gap: 16px">
            <n-button size="large" @click="cancelFilter">放弃筛选</n-button>
            <n-button type="primary" size="large" @click="confirmFilter">确定筛选</n-button>
        </div>
    </n-modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { FilterOutline, HelpCircleOutline, BulbOutline } from '@vicons/ionicons5';
import { useRouter } from 'vue-router';

// 1. 基础数据定义
// 原始字段列表
const fieldOptions = ref([
    { label: '序号', value: 'id', type: 'number' },
    { label: '名称', value: 'name', type: 'string' },
    { label: '状态', value: 'status', type: 'select', options: ['启用', '禁用'] },
]);

// 条件选项
const conditionOptions = ref([
    { label: '等于', value: 'eq' },
    { label: '不等于', value: 'ne' },
    { label: '大于', value: 'gt' },
    { label: '小于', value: 'lt' },
    { label: '大于等于', value: 'ge' },
    { label: '小于等于', value: 'le' },
    { label: '包含', value: 'contains' },
    { label: '不包含', value: 'notContains' },
]);

// 逻辑选项
const logicOptions = ref([
    { label: '并且', value: 'and' },
    { label: '或者', value: 'or' },
]);

// 穿梭框
const originalOptions = ref(
    Array.from({ length: 100 }).map((_, i) => ({
        label: `Option ${i}`,
        value: i,
        id: i,
        name: `Option ${i}`,
        status: i % 2 === 0 ? '启用' : '禁用',
        disabled: i % 5 === 0,
    }))
);

// 2. 筛选相关状态
const showFilterModal = ref(false);
const filterLogic = ref('and');
const filterRows = ref([{ field: '', condition: '', value: '' }]);

// 3. 计算属性：筛选后的数据
const showOptions = computed(() => {
    let result = [...originalOptions.value];
    const validRows = filterRows.value.filter((row) => row.field && row.condition && row.value);

    if (validRows.length === 0) return result;

    // 根据逻辑筛选
    if (filterLogic.value === 'and') {
        result = result.filter((item) => {
            return validRows.every((row) => matchCondition(item, row));
        });
    } else {
        result = result.filter((item) => {
            return validRows.some((row) => matchCondition(item, row));
        });
    }

    return result;
});

// 4. 工具方法
// 根据字段获取值选项
const getValueOptions = (field: string) => {
    const fieldConfig = fieldOptions.value.find((f) => f.value === field);
    if (!fieldConfig) return [];
    if (fieldConfig.type === 'select') {
        return fieldConfig.options.map((opt) => ({ label: opt, value: opt }));
    }
    return [...new Set(originalOptions.value.map((item) => item[field as keyof typeof item]))].map(
        (val) => ({ label: String(val), value: val })
    );
};

// 匹配单个条件
const matchCondition = (item: any, row: any) => {
    const fieldConfig = fieldOptions.value.find((f) => f.value === row.field);
    if (!fieldConfig) return true;

    const itemValue = item[row.field];
    const condition = row.condition;
    const targetValue = row.value;

    switch (condition) {
        case 'eq':
            return itemValue == targetValue;
        case 'ne':
            return itemValue != targetValue;
        case 'gt':
            return Number(itemValue) > Number(targetValue);
        case 'lt':
            return Number(itemValue) < Number(targetValue);
        case 'ge':
            return Number(itemValue) >= Number(targetValue);
        case 'le':
            return Number(itemValue) <= Number(targetValue);
        case 'contains':
            return String(itemValue).includes(String(targetValue));
        case 'notContains':
            return !String(itemValue).includes(String(targetValue));
        default:
            return true;
    }
};

// 新增筛选行
const addFilterRow = () => {
    if (filterRows.value.length < 4) {
        filterRows.value.push({ field: '', condition: '', value: '' });
    }
};

// 删除筛选行
const removeFilterRow = (index: number) => {
    filterRows.value.splice(index, 1);
};

// 打开筛选弹窗
const openFilterModal = () => {
    showFilterModal.value = true;
};

// 放弃筛选
const cancelFilter = () => {
    showFilterModal.value = false;
    // 重置筛选条件
    filterRows.value = [{ field: '', condition: '', value: '' }];
    filterLogic.value = 'and';
};

// 确定筛选
const confirmFilter = () => {
    showFilterModal.value = false;
};

// 已处理文件预览
const options = originalOptions;
const value = ref([]);
const router = useRouter();

const processedFiles = ref([{ id: 1, name: '学生信息汇总', path: '/preview/1' }]);

const removeProcessedFile = (index: number) => {
    processedFiles.value.splice(index, 1);
};

const goToFilePreview = (file: { id: number; name: string; path: string }) => {
    router.push(file.path);
};

const goToDataView = () => {
    router.push('/data-view');
};

const startProcess = () => {
    const newFile = {
        id: Date.now(),
        name: `处理结果-${Date.now()}`,
        path: `/preview/${Date.now()}`,
    };
    processedFiles.value.push(newFile);
    goToFilePreview(newFile);
};
</script>

<style scoped>
/* 已处理文件标签栏样式 */
.processed-file-bar {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    background: #ffffff;
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: 8px;
}

/* 分成左右两半的操作栏 */
.action-bar {
    display: flex;
    align-items: center;
    padding: 0;
    background: #ffffff;
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: 16px;
}

/* 左右两栏平分宽度 */
.double-bar {
    display: flex;
    width: 100%;
}

/* 左栏 */
.bar-left {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    padding: 10px 16px;
    border-right: 1px solid #e5e7eb;
    gap: 12px;
}

/* 右栏 */
.bar-right {
    flex: 1;
    display: flex;
    justify-content: left;
    padding: 10px 16px;
}

/* 按钮样式统一 */
.n-button {
    font-size: 14px;
    font-weight: 500;
}

/* 筛选行样式 */
.filter-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
}

/* 弹窗标题样式 */
:deep(.n-card-header__main) {
    font-weight: 600;
    font-size: 18px;
}
</style>
