<template>
    <n-upload
        v-model:file-list="mergeFileStore.fileList"
        multiple
        directory-dnd
        :max="100"
        accept=".xlsx"
        @before-upload="beforeUpload"
        :auto-upload="false"
        class="upload-custom [&_.n-upload-file-list]:max-h-35 [&_.n-upload-file-list]:overflow-scroll [&_.n-upload-file-list::-webkit-scrollbar]:w-5px [&_.n-upload-file-list::-webkit-scrollbar-thumb]:rounded-5px [&_.n-upload-file-list::-webkit-scrollbar-thumb]:bg-black/30"
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
</template>

<script setup lang="ts">
import type { UploadFileInfo } from 'naive-ui';
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5';

import { logger } from '@/utils/logger';
import { useMergeFileStore } from '@/stores/mergeFiles';

const mergeFileStore = useMergeFileStore();

async function beforeUpload(data: { file: UploadFileInfo; fileList: UploadFileInfo[] }) {
    if (
        data.file.file?.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
        logger.error('只能上传xlsx');
        return false;
    }
    return true;
}
</script>
