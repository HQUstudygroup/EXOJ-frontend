<template>
    <div class="w-900px mx-auto">
        <!-- 标题 -->
        <div class="flex items-center gap-2 mb-4">
            <div class="w-1.5 h-5 bg-blue-500 rounded-full"></div>
            <n-text class="text-lg font-medium tracking-[0.08em] text-gray-900"> 文件合并 </n-text>
        </div>

        <!-- 上传区域 -->
        <MergeUploadBox></MergeUploadBox>

        <!-- 合并操作 -->
        <div class="mt-4">
            <MergeExcel :file-list="mergeFileStore.fileList" />
        </div>
        <div class="mt-4">
            <Datatable :table-data="mergeFileStore.tableData" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMergeFileStore } from '@/stores/mergeFiles';

import MergeUploadBox from '@/components/fileMerge/MergeUploadBox.vue';
import MergeExcel from '@/components/fileMerge/MergeExcel.vue';
import Datatable from '@/components/fileMerge/MergeDataTable.vue';

const mergeFileStore = useMergeFileStore();
</script>
