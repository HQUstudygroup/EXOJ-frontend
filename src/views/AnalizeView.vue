<template>
    <div class="h-full w-full flex flex-col">
        <tab-pane-header></tab-pane-header>

        <div v-if="!tabNames[0]" class="h-3/4 flex items-center justify-center">
            <n-empty size="large" description="没有任何分析数据">
                <template #extra>
                    <n-button size="small" @click="router.push('/index')"> 看看别的 </n-button>
                </template>
            </n-empty>
        </div>

        <n-tabs
            v-else
            closable
            v-model:value="activeTab"
            :on-close="handleClose"
            type="card"
            class="h-7/8 flex flex-col"
        >
            <n-tab-pane
                v-for="tabName in tabNames"
                :key="tabName"
                :name="tabName"
                :tab="tabName"
                class="capture-container flex-1 overflow-auto"
            >
                <ChartArea :tab-name="tabName"></ChartArea>
            </n-tab-pane>
        </n-tabs>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import * as chartDBService from '@/db/charts';
import { logger } from '@/utils/logger';

import ChartArea from '@/components/ChartsPart/ChartArea.vue';
import TabPaneHeader from '@/components/ChartsPart/TabPaneHeader.vue';

const router = useRouter();

const activeTab = ref<string | null>(null);
const tabNames = ref<string[]>([]);

onMounted(async () => {
    tabNames.value = await chartDBService.getAllTabNames();
    activeTab.value = tabNames.value[0] ?? null;
});

function handleClose(name: string) {
    logger.info(`删除标签页 ${name}`);
    const index = tabNames.value.findIndex((v) => name === v);

    tabNames.value.splice(index, 1);
    chartDBService.deleteTab(name);
}
</script>

<style scoped>
::-webkit-scrollbar-button {
    display: none;
    height: 0;
    width: 0;
}

::-webkit-scrollbar {
    width: 5px;
}

::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 5px;
}

::-webkit-scrollbar-track {
    background: transparent;
}
</style>
