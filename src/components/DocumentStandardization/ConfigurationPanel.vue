<template>
    <n-modal
        v-model:show="show"
        preset="card"
        style="width: 900px"
        title="自定义列格式模板"
        :mask-closable="false"
    >
        <div class="p-2">
            <div class="font-medium text-sm my-5">列字段格式配置</div>

            <!-- 表头 -->
            <div class="flex bg-gray-50 font-medium text-sm">
                <div class="flex-1 p-3">列序号</div>
                <div class="flex-1 p-3">字段名称</div>
                <div class="flex-1 p-3">数据类型</div>
                <div class="flex-1 p-3">格式规则</div>
                <div class="flex-1 p-3">操作</div>
            </div>

            <!-- 列配置 -->
            <div class="border border-gray-200 border-t-0">
                <div
                    class="flex border-t border-gray-200 items-center"
                    v-for="(col, idx) in columns"
                    :key="idx"
                >
                    <div class="flex-1 p-3 text-sm">{{ idx + 1 }}</div>

                    <div class="flex-1 p-3">
                        <select v-model="col.field" class="w-full p-1 border rounded-lg text-sm">
                            <option value="">请选择字段</option>
                            <option v-for="name in extractedFields" :key="name" :value="name">
                                {{ name }}
                            </option>
                        </select>
                    </div>

                    <div class="flex-1 p-3">
                        <select
                            v-model="col.type"
                            @change="onTypeChange(col)"
                            class="w-full p-1 border rounded-lg text-sm"
                        >
                            <option value="string">文本</option>
                            <option value="number">数字</option>
                            <option value="money">财务金额</option>
                            <option value="date">日期</option>
                            <option value="boolean">状态布尔</option>
                        </select>
                    </div>

                    <div class="flex-1 p-3">
                        <div v-if="col.type === 'string'" class="flex gap-1">
                            <select
                                v-model="col.fontFamily"
                                class="w-[55%] p-1 border rounded-lg text-sm"
                            >
                                <option value="微软雅黑">微软雅黑</option>
                                <option value="宋体">宋体</option>
                                <option value="Arial">Arial</option>
                            </select>
                            <select
                                v-model="col.fontSize"
                                class="w-[45%] p-1 border rounded-lg text-sm"
                            >
                                <option value="12">12pt</option>
                                <option value="14">14pt</option>
                                <option value="16">16pt</option>
                            </select>
                        </div>

                        <div v-else-if="col.type === 'number'" class="flex gap-1">
                            <select
                                v-model="col.numType"
                                class="w-[55%] p-1 border rounded-lg text-sm"
                            >
                                <option value="int">整数</option>
                                <option value="decimal">小数</option>
                                <option value="percent">百分数</option>
                            </select>
                        </div>

                        <div v-else-if="col.type === 'money'" class="text-xs">
                            <label>
                                <input type="checkbox" v-model="col.cleanMoneyUnit" />
                                清理单位
                            </label>
                        </div>

                        <select
                            v-else-if="col.type === 'date'"
                            v-model="col.rule"
                            class="w-full p-1 border rounded-lg text-sm"
                        >
                            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                            <option value="YYYY/MM/DD">YYYY/MM/DD</option>
                        </select>

                        <select
                            v-else-if="col.type === 'boolean'"
                            v-model="col.rule"
                            class="w-full p-1 border rounded-lg text-sm"
                        >
                            <option value="是/否">是/否</option>
                            <option value="TRUE/FALSE">TRUE/FALSE</option>
                        </select>
                    </div>

                    <div class="flex-1 p-3">
                        <n-button size="small" type="error" @click="delCol(idx)"> 删除 </n-button>
                    </div>
                </div>
            </div>

            <div class="flex gap-3 mt-5">
                <n-button type="primary" @click="addCol">添加列</n-button>
                <n-button type="default" @click="clearColumns">清空</n-button>
                <n-button type="success" @click="close"> 完成 </n-button>
            </div>
        </div>
    </n-modal>
</template>

<script setup>
import { computed } from 'vue';


const props = defineProps({
    show: Boolean,
    columns: Array,
    extractedFields: Array,
});

const emit = defineEmits(['update:show', 'update:columns']);

const show = computed({
    get: () => props.show,
    set: (val) => emit('update:show', val),
});

const columns = computed({
    get: () => props.columns,
    set: (val) => emit('update:columns', val),
});

const addCol = () => {
    columns.value.push({
        field: '',
        type: 'string',
        fontFamily: '微软雅黑',
        fontSize: 12,
        numType: 'int',
        decimalDigits: 2,
        cleanMoneyUnit: true,
        rule: 'YYYY-MM-DD',
    });
};

const delCol = (i) => columns.value.splice(i, 1);

const clearColumns = () => {
    columns.value = [
        {
            field: '',
            type: 'string',
            fontFamily: '微软雅黑',
            fontSize: 12,
            numType: 'int',
            decimalDigits: 2,
            cleanMoneyUnit: true,
            rule: 'YYYY-MM-DD',
        },
    ];
};

const onTypeChange = (col) => {
    if (col.type === 'string') {
        col.fontFamily = '微软雅黑';
        col.fontSize = 12;
    }
    if (col.type === 'number') {
        col.numType = 'int';
    }
    if (col.type === 'money') {
        col.cleanMoneyUnit = true;
    }
    if (col.type === 'date') {
        col.rule = 'YYYY-MM-DD';
    }
};

const close = () => {
    show.value = false;
};
</script>
