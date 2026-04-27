<template>
    <div class="w-full mt-10">
        <div v-if="loading" class="w-full h-full flex justify-center items-center">
            <n-spin />
        </div>

        <div v-else v-for="(chart, index) in charts" :key="index" class="w-[88%]">
            <div class="h-full w-full">
                <ChartBox
                    :id="`${chart.chartName}_${index}`"
                    :content-width="chartSizeMap[index] ?? 70"
                    :option="generateChart(chart.chartName, chart.chartType, chart.data)"
                />

                <div class="w-full">
                    <div class="w-full flex justify-center">
                        <div class="w-full flex justify-center items-center gap-5">
                            <div class="w-1/8 flex justify-between items-center">
                                <n-text class="w-16" depth="3"> 尺寸： </n-text>
                                <n-slider
                                    class="w-full"
                                    :min="25"
                                    :default-value="70"
                                    v-model:value="chartSizeMap[index]"
                                />
                            </div>
                            <n-button type="info"> Info </n-button>
                        </div>
                    </div>
                </div>

                <div class="mt-3"></div>
            </div>

            <NDivider v-if="index !== charts.length - 1" />
        </div>
        <n-anchor class="fixed top-1/3 right-20 w-1/12" type="block">
            <n-anchor-link :title="tabName">
                <n-anchor-link
                    v-for="(chart, index) in charts"
                    :title="chart.chartName"
                    :href="`#${chart.chartName}_${index}`"
                    :class="[index === 0 ? 'mt-2' : '']"
                />
            </n-anchor-link>
        </n-anchor>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import * as chartDBService from '@/db/charts';
import { generateChart } from '@/services/chart';

import type { Chart } from '@/models/chartTypes';
import ChartBox from './ChartBox.vue';

const props = defineProps<{
    tabName: string;
}>();

const charts = ref<Chart[]>([]);

const chartSizeMap = ref<Record<number, number>>({});

const loading = ref(true);

onMounted(async () => {
    loading.value = true;

    charts.value = (await chartDBService.getChartsByTab(props.tabName)) as Chart[];

    loading.value = false;
});
</script>
