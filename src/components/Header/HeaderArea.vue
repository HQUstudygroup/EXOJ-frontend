<template>
    <div class="flex w-full h-full justify-between">
        <n-image lazy preview-disabled class="pl-15" src="@/assets/logo4.png" object-fit="fill" />

        <div class="py-4 pr-8 flex items-center gap-3">
            <n-button
                strong
                round
                :focusable="false"
                class="c-black bg-white b-solid b-0.5"
                @click="router.push('/analyze-page')"
            >
                查看分析结果
            </n-button>

            <n-upload
                multiple
                :show-file-list="false"
                @change="handleFileChange"
                accept=".xls,.xlsx,.csv"
            >
                <n-button strong round :focusable="false" type="info"> 上传数据 </n-button>
            </n-upload>

            <n-button
                circle
                text
                :focusable="false"
                size="large"
                class="ml-3 c-gray-500 !hover:c-amber-300"
                @click="aiAssistantStore.showAssistantModal = !aiAssistantStore.showAssistantModal"
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
import { useRouter } from 'vue-router';

import { Sparkles } from '@vicons/ionicons5';

import { useUniverStore } from '@/stores/univer';
import { useAiAssistantStore } from '@/stores/aiAssistant';

const router = useRouter();

const univerStore = useUniverStore();
const aiAssistantStore = useAiAssistantStore();

const handleFileChange = async (options: any) => {
    const file = options.file?.file || options.file;

    if (!file) return;

    await univerStore.importDataToUnitable(file);
};
</script>

<style scoped></style>
