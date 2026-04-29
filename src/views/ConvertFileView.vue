<template>
    <div class="p-4 px-1/8 h-full">
        <div class="flex flex-col justify-center gap-5 h-full">
            <div class="text-xl font-bold mb-4">文件格式处理</div>

            <n-upload
                v-model:file-list="fileList"
                multiple
                directory-dnd
                :max="20"
                :show-file-list="false"
                :default-upload="false"
                @change="handleFileChange"
                accept=".xls,.xlsx,.doc,.docx,.pdf,.csv"
            >
                <n-upload-dragger
                    class="bg-blue-50 !border-2 border-dashed border-blue-300 hover:bg-blue-100 hover:border-blue-400 transition-all duration-200 rounded-lg py-6"
                >
                    <div class="mb-12px h-80px flex items-end justify-center">
                        <n-icon size="48" :depth="3">
                            <ArchiveIcon />
                        </n-icon>
                    </div>
                    <n-text style="font-size: 16px"> 点击或者拖动文件到该区域来上传 </n-text>
                    <n-p depth="3" style="margin: 8px 0 0 0">
                        仅支持xls、xlsx、doc、docx、pdf、csv格式(最多20个)
                    </n-p>
                </n-upload-dragger>
            </n-upload>

            <div class="flex justify-center items-center h-full">
                <div
                    v-if="fileItems.length"
                    class="space-y-3 h-[500px] w-full max-w-[90%] overflow-y-auto pr-2"
                >
                    <div class="font-medium text-gray-700">已上传文件</div>

                    <div
                        v-for="(item, index) in fileItems"
                        :key="index"
                        class="flex items-center justify-between p-3 border rounded-lg bg-white shadow-sm"
                    >
                        <!-- 文件名 -->
                        <div class="truncate max-w-[40%]">{{ item.name }}</div>

                        <!-- 操作按钮组 -->
                        <div class="flex items-center gap-5">
                            <!-- 转换类型选择 -->
                            <n-select
                                v-model:value="item.convertType"
                                :options="item.convertOptions"
                                placeholder="类型"
                                size="small"
                                style="width: 110px"
                            />

                            <!-- 转换按钮 -->
                            <n-button
                                type="primary"
                                size="small"
                                :loading="item.loading"
                                @click="handleSingleConvert(item)"
                                class="!rounded-full !border-none px-6 font-semibold tracking-wide !text-white bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 shadow-sm hover:shadow-lg ring-1 ring-white/10 transition-all duration-200"
                            >
                                转换
                            </n-button>

                            <!-- 导出按钮 -->
                            <n-button
                                type="success"
                                size="small"
                                @click="handleSingleDownload(item)"
                                :disabled="!item.blob"
                                class="!rounded-full !border-none px-6 font-semibold tracking-wide !text-white bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 shadow-sm hover:shadow-lg ring-1 ring-white/10 transition-all duration-200"
                            >
                                导出
                            </n-button>

                            <!-- 删除按钮 -->
                            <n-button
                                circle
                                quaternary
                                size="small"
                                @click="removeFile(index)"
                                :disabled="item.loading"
                            >
                                <n-icon>
                                    <CloseIcon />
                                </n-icon>
                            </n-button>
                        </div>
                    </div>
                </div>

                <n-empty v-else description="什么也没有，因为还没导入文件" size="huge" class="m-0">
                </n-empty>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMessage } from 'naive-ui';
import { ArchiveOutline as ArchiveIcon, CloseOutline as CloseIcon } from '@vicons/ionicons5';

const message = useMessage();

// 上传文件列表（用于绑定组件）
const fileList = ref<any[]>([]);

// 自定义文件项列表（核心数据）
interface FileItem {
    name: string;
    file: File;
    convertType: string;
    convertOptions: { label: string; value: string }[];
    loading: boolean;
    blob: Blob | null;
}
const fileItems = ref<FileItem[]>([]);

// 格式映射
const extMap: Record<string, string> = {
    xls: 'excel',
    xlsx: 'excel',
    doc: 'word',
    docx: 'word',
    pdf: 'pdf',
    csv: 'csv',
};

const convertMap: Record<string, string[]> = {
    excel: ['pdf', 'word'],
    word: ['excel'],
    pdf: ['excel'],
    csv: ['pdf', 'word'],
};

/**
 * 上传文件变化处理
 */
const handleFileChange = (optionsData: any) => {
    const incomingFiles: File[] = optionsData.fileList.map((it: any) => it.file).filter(Boolean);

    if (!incomingFiles.length) return;

    const newFiles: File[] = [];

    for (const file of incomingFiles) {
        const isExist = fileItems.value.some(
            (it) => it.file.name === file.name && it.file.size === file.size
        );

        if (!isExist) {
            newFiles.push(file);
        }
    }

    if (!newFiles.length) return;

    let successCount = 0;

    newFiles.forEach((file: File) => {
        const ext = file.name.split('.').pop()?.toLowerCase();
        const fileType = extMap[ext || ''];

        if (!fileType) {
            message.warning(`${file.name} 不支持的文件类型`);
            return;
        }

        const options =
            convertMap[fileType]?.map((type) => ({
                label: `转 ${type.toUpperCase()}`,
                value: type,
            })) || [];

        if (!options.length) {
            message.warning(`${file.name} 暂无可转换格式`);
            return;
        }

        const defaultType = options[0]?.value || '';

        fileItems.value.push({
            name: file.name,
            file,
            convertType: defaultType,
            convertOptions: options,
            loading: false,
            blob: null,
        });

        successCount++;
    });

    if (successCount > 0) {
        message.success(`成功添加 ${successCount} 个文件`);
    }
};

/**
 * 单个文件转换
 */
const handleSingleConvert = async (item: FileItem) => {
    if (!item.convertType) {
        message.warning('请先选择转换类型');
        return;
    }

    item.loading = true;

    try {
        const blob = await convertFile(item.file, item.convertType);
        item.blob = blob;
        message.success(`${item.name} 转换成功`);
    } catch (err) {
        message.error(`${item.name} 转换失败`);
        console.error(err);
    } finally {
        item.loading = false;
    }
};

/**
 * 单个文件导出
 */
const handleSingleDownload = (item: FileItem) => {
    if (!item.blob) return;

    const url = URL.createObjectURL(item.blob);
    const a = document.createElement('a');
    a.href = url;

    const nameWithoutExt = item.name.split('.').slice(0, -1).join('.');
    const extMap: Record<string, string> = {
        excel: '.xlsx',
        pdf: '.pdf',
        word: '.docx',
    };
    a.download = nameWithoutExt + extMap[item.convertType] || '.file';

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

/**
 * 删除单个文件
 */
const removeFile = (index: number) => {
    fileItems.value.splice(index, 1);
    fileList.value.splice(index, 1);
};

/**
 * 调用接口转换文件
 */
async function convertFile(file: File, convertType: string): Promise<Blob> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('changeType', convertType);

    const res = await fetch('http://localhost:8000/files/convert', {
        method: 'POST',
        body: formData,
    });

    if (!res.ok) throw new Error('接口请求失败');
    return await res.blob();
}
</script>
