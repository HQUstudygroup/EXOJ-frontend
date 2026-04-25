<template>
    <div class="flex flex-col gap-3">
        <div class="flex items-center gap-2">
            <span>从第</span>
            <n-input-number v-model:value="startRow" :min="1" />
            <span>行开始合并</span>
        </div>

        <div class="flex items-center justify-between items-center">
            <n-text :style="{ visibility: mergedData.length ? 'visible' : 'hidden' }">
                已合并 {{ mergedData.length }} 行数据
            </n-text>

            <div class="flex items-center gap-4">
                <n-button
                    :loading="loading"
                    @click="handleMerge"
                    class="!rounded-full !border-none px-6 font-semibold tracking-wide !text-white bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 shadow-sm hover:shadow-lg ring-1 ring-white/10 transition-all duration-200"
                >
                    开始合并
                </n-button>
                <n-button
                    :disabled="!mergedData.length"
                    @click="handleExport"
                    class="!rounded-full !border-none px-6 font-semibold tracking-wide !text-white bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 shadow-sm hover:shadow-lg ring-1 ring-white/10 transition-all duration-200"
                >
                    导出Excel
                </n-button>
            </div>
        </div>

        <n-divider class="!m-3"></n-divider>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import readXlsx from '@/utils/xlsxUtil';
import { exportXlsx } from '@/utils/xlsxUtil';
import { NDivider } from 'naive-ui';

const props = defineProps<{
    fileList: any[];
}>();

const emit = defineEmits<{
    (e: 'success', data: any[][]): void;
}>();

const startRow = ref(1);
const mergedData = ref<any[][]>([]);
const loading = ref(false);

async function handleMerge() {
    const files = props.fileList.map((item) => item.file).filter(Boolean);

    if (!files.length) return;

    loading.value = true;

    const result: any[][] = [];

    let headerAdded = false;

    const startIndex = Math.max(startRow.value - 1, 0);

    for (let fIndex = 0; fIndex < files.length; fIndex++) {
        const file = files[fIndex];

        if (!file.name.endsWith('.xlsx')) continue;

        const data = await readXlsx(file);

        if (!headerAdded) {
            const headerRows = data.slice(0, startIndex);
            result.push(...headerRows);
            headerAdded = true;
        }

        for (let i = startIndex; i < data.length; i++) {
            const row = data[i];

            const isEmpty = row.every((cell) => cell === '' || cell === null || cell === undefined);

            if (isEmpty) break;

            result.push(row);
        }
    }

    mergedData.value = result;
    emit('success', result);
    loading.value = false;
}
function handleExport() {
    if (!mergedData.value.length) return;

    exportXlsx(mergedData.value, '合并结果.xlsx');
}
</script>
