<template>
    <div class="flex flex-col gap-3">
        <div class="flex items-center gap-2">
            <span>从第</span>
            <n-input-number v-model:value="mergeFileStore.startRow" :min="1" />
            <span>行开始合并</span>
        </div>

        <div class="flex items-center justify-between items-center">
            <n-text
                :style="{ visibility: mergeFileStore.mergedData.length ? 'visible' : 'hidden' }"
            >
                已合并 {{ mergeFileStore.mergedData.length }} 行数据
            </n-text>

            <div class="flex items-center gap-4">
                <n-button
                    :loading="mergeFileStore.loading"
                    @click="mergeFileStore.handleMerge"
                    class="!rounded-full !border-none px-6 font-semibold tracking-wide !text-white bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 shadow-sm hover:shadow-lg ring-1 ring-white/10 transition-all duration-200"
                >
                    开始合并
                </n-button>
                <n-button
                    :disabled="!mergeFileStore.mergedData.length"
                    @click="mergeFileStore.handleExport"
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
import { NDivider } from 'naive-ui';
import { useMergeFileStore } from '@/stores/mergeFiles';

const mergeFileStore = useMergeFileStore();
</script>
