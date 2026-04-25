<template>
    <div>
        <n-data-table
            :columns="tableColumns"
            :data="tableDataParsed"
            :max-height="250"
            virtual-scroll
            :scroll-x="scrollX"
            :min-row-height="48"
            :height-for-row="heightForRow"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { DataTableColumns } from 'naive-ui';

const props = defineProps<{
    tableData: any[][];
}>();

const tableColumns = ref<DataTableColumns<any>>([]);
const tableDataParsed = ref<any[]>([]);
const scrollX = ref(0);

watch(
    () => props.tableData,
    (val) => {
        if (!val || !val.length) return;

        // 表头（第一行）
        const headers = val[0];

        // 生成列
        tableColumns.value = headers.map((col: any, index: number) => ({
            title: col || `列${index + 1}`,
            key: `col_${index}`,
            width: 120,
        }));

        // 生成数据
        tableDataParsed.value = val.slice(1).map((row, rowIndex) => {
            const obj: any = { key: rowIndex };

            row.forEach((cell: any, colIndex: number) => {
                obj[`col_${colIndex}`] = cell;
            });

            return obj;
        });

        // 横向滚动宽度
        scrollX.value = headers.length * 120;
    },
    { immediate: true }
);

const heightForRow = () => 48;
</script>
