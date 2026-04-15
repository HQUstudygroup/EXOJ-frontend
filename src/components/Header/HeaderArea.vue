<template>
    <div class="flex w-full h-full justify-between">
        <n-image
            lazy
            preview-disabled
            class="pl-15"
            src="/src/assets/logo4.png"
            object-fit="fill"
        />

        <div class="py-4 pr-8 flex gap-3">
            <n-button strong round :focusable="false" class="c-black bg-white b-solid b-0.5">
                我的数据
            </n-button>

            <n-button strong round :focusable="false" class="c-black bg-white b-solid b-0.5">
                查看数据
            </n-button>

            <n-upload :show-file-list="false" @change="handleFileChange">
                <n-button strong round :focusable="false" type="info"> 上传数据 </n-button>
            </n-upload>

            <n-button
                circle
                text
                :focusable="false"
                size="large"
                class="ml-3 c-gray-500 !hover:c-amber-300"
            >
                <template #icon>
                    <n-icon>
                        <Sparkles />
                    </n-icon>
                </template>
            </n-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Sparkles } from '@vicons/ionicons5';
import { useUniverStore } from '@/stores/univer';

const univerStore = useUniverStore();

const handleFileChange = async (options: any) => {
    const file = options.file?.file || options.file;

    if (!file) return;

    await univerStore.importExcel(file);
};
</script>

<style scoped></style>
