<template>
    <div class="h-full position-relative">
        <n-button
            icon-placement="right"
            class="position-absolute m-5 z-1 right-2 flex items-center"
            type="primary"
            size="small"
            :focusable="false"
            @click="goAnalyze"
        >
            <template #icon>
                <n-icon>
                    <ArrowForwardOutline />
                </n-icon>
            </template>
            进入分析
        </n-button>

        <n-transfer
            v-model:value="transferValue"
            :options="univerStore.transferOptions"
            virtual-scroll
            source-filterable
            target-filterable
            class="box-border h-full p-3"
        >
        </n-transfer>
    </div>
</template>

<script setup lang="ts">
import { ArrowForwardOutline } from '@vicons/ionicons5';
import { ref } from 'vue';

import { useUniverStore } from '@/stores/univer';
import { useMenuStore } from '@/stores/menu';
import { logger } from '@/utils/logger';

const menuStore = useMenuStore();
const univerStore = useUniverStore();
const transferValue = ref();

async function goAnalyze() {
    if (!transferValue.value) {
        logger.error('似乎没有选择任何字段进行分析');
        return;
    }

    if (!menuStore.isDataVisualization) {
        logger.error('还没选择数据可视化类别');
        return;
    }
}
</script>

<style scoped></style>
