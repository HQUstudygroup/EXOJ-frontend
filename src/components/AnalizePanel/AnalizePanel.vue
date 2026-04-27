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

        <AnalizeModal></AnalizeModal>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { ChartUIKey } from '@/models/chartTypes';
import { CHART_PARAM_SCHEMA } from '@/services/chart/schema';

import { useUniverStore } from '@/stores/univer';
import { useMenuStore } from '@/stores/menu';
import { useChartModalStore } from '@/stores/chartModal';
import { logger } from '@/utils/logger';

import AnalizeModal from './AnalizeModal.vue';
import { ArrowForwardOutline } from '@vicons/ionicons5';

const menuStore = useMenuStore();
const univerStore = useUniverStore();
const chartModalStore = useChartModalStore();

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

    const requiredParam = CHART_PARAM_SCHEMA[menuStore.activeKey as ChartUIKey].required;
    const optionalParam = CHART_PARAM_SCHEMA[menuStore.activeKey as ChartUIKey].optional;

    chartModalStore.open(requiredParam, optionalParam);

    chartModalStore.setSelectOptions(transferValue.value);
}
</script>

<style scoped></style>
