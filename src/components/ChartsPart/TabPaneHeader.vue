<template>
    <div>
        <div class="flex justify-between">
            <n-button
                text
                strong
                :focusable="false"
                class="!hover:c-black c-gray-600"
                @click="router.push('/index')"
            >
                <template #icon>
                    <n-icon>
                        <ArrowBack />
                    </n-icon>
                </template>
                返回分析
            </n-button>

            <n-button type="error" @click="exportPDF('.capture-container')"> 生成 PDF </n-button>
        </div>
        <n-divider />
    </div>
</template>

<script setup lang="ts">
import { ArrowBack } from '@vicons/ionicons5';

import { useRouter } from 'vue-router';
import { exportPDF } from '@/utils/saveDOM';

const router = useRouter();
</script>

<style scoped></style>
