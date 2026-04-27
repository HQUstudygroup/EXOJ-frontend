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
            <!-- 表头：使用 grid 布局，自适应等分 -->
            <div class="grid grid-cols-8 bg-gray-50 font-medium text-sm">
                <div class="p-3 flex justify-center">列序号</div>
                <div class="col-span-2 p-3 flex justify-center">字段名称</div>
                <div class="col-span-2 p-3 flex justify-center">数据类型</div>
                <div class="col-span-2 p-3 flex justify-center">格式规则</div>
                <div class="p-3 flex justify-center">操作</div>
            </div>

            <!-- 列配置 -->
            <n-scrollbar style="max-height: 200px">
                <div class="border border-gray-200 border-t-0">
                    <div
                        class="grid grid-cols-8 border-t border-gray-200 items-center"
                        v-for="(col, idx) in columns"
                        :key="idx"
                    >
                        <div class="p-3 text-sm flex justify-center">{{ idx + 1 }}</div>

                        <div class="col-span-2 p-3 flex justify-center">
                            <n-select
                                v-model:value="col.field"
                                :options="extractedFields.map((f) => ({ label: f, value: f }))"
                                placeholder="请选择字段"
                                clearable
                                size="small"
                            />
                        </div>

                        <div class="col-span-2 p-3 flex justify-center">
                            <n-select
                                v-model:value="col.type"
                                :options="[
                                    { label: '文本', value: 'string' },
                                    { label: '数字', value: 'number' },
                                    { label: '财务金额', value: 'money' },
                                    { label: '日期', value: 'date' },
                                    { label: '状态布尔', value: 'boolean' },
                                ]"
                                size="small"
                                @update:value="() => onTypeChange(col)"
                            />
                        </div>

                        <div class="col-span-2 p-3 flex justify-center">
                            <div v-if="col.type === 'string'" class="flex gap-2">
                                <n-select
                                    v-model:value="col.fontFamily"
                                    filterable
                                    :options="fontOptions.map((f) => ({ label: f, value: f }))"
                                    size="small"
                                    class="flex-1"
                                    :menu-props="{
                                        style: {
                                            minWidth: '220px',
                                        },
                                    }"
                                />
                                <div class="flex items-stretch flex-1">
                                    <input
                                        :value="col.fontSize"
                                        type="number"
                                        min="8"
                                        max="72"
                                        step="1"
                                        class="px-2 border rounded-full text-sm w-full"
                                        placeholder="字号"
                                        @input="
                                            (e) => {
                                                const target = e.target as HTMLInputElement;
                                                let val = Number(target.value);
                                                if (val > 72) val = 72;
                                                if (val < 8) val = 8;
                                                col.fontSize = val;
                                            }
                                        "
                                    />
                                    <span
                                        class="flex items-center px-3 border rounded-r-lg bg-gray-50 text-xs whitespace-nowrap"
                                    >
                                        pt
                                    </span>
                                </div>
                            </div>

                            <div v-else-if="col.type === 'number'" class="flex">
                                <n-select
                                    v-model:value="col.numType"
                                    :options="[
                                        { label: '整数', value: 'int' },
                                        { label: '小数', value: 'decimal' },
                                        { label: '百分数', value: 'percent' },
                                    ]"
                                    size="small"
                                    class="flex-1 min-w-100px"
                                    :menu-props="{
                                        style: {
                                            minWidth: '100px',
                                        },
                                    }"
                                />
                            </div>

                            <div v-else-if="col.type === 'money'" class="flex gap-2 items-center">
                                <label>
                                    <input type="checkbox" v-model="col.cleanMoneyUnit" />
                                    清理单位
                                </label>

                                <n-select
                                    v-model:value="col.moneyFormat"
                                    :options="[
                                        { label: '小写金额', value: 'lower' },
                                        { label: '大写金额', value: 'upper' },
                                    ]"
                                    size="small"
                                />
                            </div>

                            <n-select
                                v-if="col.type === 'date'"
                                v-model:value="col.rule"
                                :options="[
                                    { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
                                    { label: 'YYYY/MM/DD', value: 'YYYY/MM/DD' },
                                ]"
                                size="small"
                            />

                            <n-select
                                v-if="col.type === 'boolean'"
                                v-model:value="col.rule"
                                :options="[
                                    { label: '是/否', value: '是/否' },
                                    { label: 'TRUE/FALSE', value: 'TRUE/FALSE' },
                                ]"
                                size="small"
                            />
                        </div>

                        <div class="p-3 flex justify-center">
                            <n-button size="small" type="error" @click="delCol(idx)">
                                删除
                            </n-button>
                        </div>
                    </div>
                </div>
            </n-scrollbar>

            <div class="flex gap-3 mt-5">
                <n-button type="primary" @click="addCol">添加列</n-button>
                <n-button type="default" @click="clearColumns">清空</n-button>
                <n-button type="success" @click="close"> 完成 </n-button>
            </div>
        </div>
    </n-modal>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ColumnConfig } from '@/views/formatStandardizationView.vue'; // 引入父组件定义的类型

const props = defineProps({
    show: {
        type: Boolean,
        required: true,
    },
    columns: {
        type: Array as () => ColumnConfig[],
        required: true,
    },
    extractedFields: {
        type: Array as () => string[],
        required: true,
    },
});

const emit = defineEmits<{
    'update:show': [val: boolean];
    'update:columns': [val: ColumnConfig[]];
}>();

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
        field: null as any,
        type: 'string',
        fontFamily: '微软雅黑',
        fontSize: 12,
        numType: 'int',
        decimalDigits: 2,
        cleanMoneyUnit: true,
        rule: 'YYYY-MM-DD',
    });
};

const delCol = (i: number) => {
    columns.value.splice(i, 1);
};

const clearColumns = () => {
    columns.value = [
        {
            field: null as any,
            type: 'string',
            fontFamily: '微软雅黑',
            fontSize: 12,
            numType: 'int',
            decimalDigits: 2,
            moneyFormat: 'upper',
            cleanMoneyUnit: true,
            rule: 'YYYY-MM-DD',
        },
    ];
};

const onTypeChange = (col: ColumnConfig) => {
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
    if (col.type === 'boolean') {
        col.rule = '是/否';
    }
};

const close = () => {
    show.value = false;
};

const fontOptions = [
    '微软雅黑',
    '宋体',
    '黑体',
    '仿宋',
    '楷体',
    '等线',
    '方正黑体',
    '方正兰亭黑',
    '华文黑体',
    '华文宋体',
    '华文中宋',
    '华文仿宋',
    '华文楷体',
    '思源黑体',
    '思源宋体',
    'Arial',
    'Calibri',
    'Times New Roman',
    'Verdana',
    'Tahoma',
    'Segoe UI',
    'Courier New',
    'Consolas',
    'PingFang SC',
    'Heiti SC',
    'Songti SC',
    'STHeiti',
    'STSong',
    'Helvetica',
    'Helvetica Neue',
    'Georgia',
    'Trebuchet MS',
    'Lucida Sans',
];
</script>
