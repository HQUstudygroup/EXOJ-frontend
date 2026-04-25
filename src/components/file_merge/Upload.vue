<template>
    <div class="w-900px mx-auto">
        <!-- 标题 -->
        <div class="flex items-center gap-2 mb-4">
            <div class="w-1.5 h-5 bg-blue-500 rounded-full"></div>
            <n-text class="text-lg font-medium tracking-[0.08em] text-gray-900"> 文件合并 </n-text>
        </div>

        <!-- 上传区域 -->
        <n-upload
            v-model:file-list="fileList"
            multiple
            directory-dnd
            :max="100"
            accept=".xlsx"
            @before-upload="beforeUpload"
            :auto-upload="false"
            class="upload-custom [&_.n-upload-file-list]:max-h-80px [&_.n-upload-file-list]:overflow-y-auto [&_.n-upload-file-list::-webkit-scrollbar]:w-0 hover:[&_.n-upload-file-list::-webkit-scrollbar]:w-4px hover:[&_.n-upload-file-list::-webkit-scrollbar-thumb]:bg-black/30 hover:[&_.n-upload-file-list::-webkit-scrollbar-thumb]:rounded-4px"
        >
            <n-upload-dragger
                class="bg-blue-50 border-2 border-dashed border-blue-300 hover:bg-blue-100 hover:border-blue-400 transition-all duration-200 rounded-lg py-6"
            >
                <div class="mb-3 flex justify-center">
                    <n-icon size="48" :depth="3">
                        <ArchiveIcon />
                    </n-icon>
                </div>

                <n-text class="text-base font-medium text-gray-700 block text-center">
                    点击或者拖动文件到该区域来上传
                </n-text>

                <n-p depth="4" class="mt-1 text-xs text-gray-400 text-center">
                    请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
                </n-p>
            </n-upload-dragger>
        </n-upload>

        <!-- 合并操作 -->
        <div class="mt-4">
            <MergeExcel :file-list="fileList" @success="handleResult" />
        </div>
        <div class="mt-4">
            <Datatable :table-data="tableData" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5';
import MergeExcel from './MergeExcel.vue';

const fileList = ref<any[]>([]);

import Datatable from './DataTable.vue';

const tableData = ref<any[][]>([]);

function handleResult(data: any[][]) {
    tableData.value = data;
}

import type { UploadFileInfo } from 'naive-ui';

async function beforeUpload(data: { file: UploadFileInfo; fileList: UploadFileInfo[] }) {
    if (
        data.file.file?.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
        console.error('只能上传xlsx');
        return false;
    }
    return true;
}
</script>
