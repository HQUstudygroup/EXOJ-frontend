<template>
    <div class="w-full mt-10">
        <div v-if="loading" class="w-full h-full flex justify-center items-center">
            <n-spin />
        </div>

        <div
            v-else
            v-for="(chart, index) in charts"
            :key="`${chart.chartName}_${index}`"
            class="w-[88%] pb-10"
        >
            <div class="h-full w-full">
                <ChartBox
                    :id="`${chart.chartName}_${index}`"
                    :content-width="chartSizeMap[index] ?? 70"
                    :option="generateChart(chart.chartName, chart.chartType, chart.data)"
                />

                <div class="w-full h-full flex flex-col">
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
                        <n-button :focusable="false" type="info" @click="handleAnalyze(index)">
                            智能分析
                        </n-button>
                        <n-popconfirm
                            placement="right"
                            :positive-button-props="{ type: 'error' }"
                            :negative-button-props="{ type: 'success' }"
                            @positive-click="
                                () => {
                                    charts.splice(index, 1);
                                    chartDBService.deleteChart(tabName, index);
                                }
                            "
                        >
                            <template #trigger>
                                <n-button :focusable="false" type="error"> 删除图表 </n-button>
                            </template>
                            这是永久删除哦！
                        </n-popconfirm>
                    </div>
                    <t-chat-markdown
                        :class="[
                            'mt-3 max-w-full h-full text-wrap overflow-auto px-20 bg-slate-50 border-l-solid border-l-2 border-l-blue-600',
                            displayTexts[index] ? 'pb-10 pt-5' : '',
                        ]"
                        :content="displayTexts[index]"
                    />
                </div>
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
import { streamText } from '@/utils/streamText';

import type { Chart } from '@/models/chartTypes';
import ChartBox from './ChartBox.vue';

const props = defineProps<{
    tabName: string;
}>();

const charts = ref<Chart[]>([]);

const chartSizeMap = ref<Record<number, number>>({});
const displayTexts = ref<Record<number, string>>({});

const loading = ref(true);

function handleAnalyze(index: number) {
    displayTexts.value[index] = '';

    const content = `## 一、分析建议

频数分析用于研究数据分布情况，本次数据主要包含 K 线价格（open / close / high / low）以及成交量（volume）和消费金额等指标。

通过频数与占比分析，可以清晰反映数据的集中趋势与波动特征。

---

## 二、智能分析

### （1）整体数据分析

从整体数据来看：

- 收盘价分布显示，样本中约 **45.00%** 集中在「110以上区间」，说明市场后期上涨趋势明显
- 成交量分布中，「40000 ~ 60000 区间」占比约 **50.00%**，为主要交易密集区
- 消费金额数据中，「300 ~ 800 区间」占比约 **62.00%**，属于核心消费人群

---

### （2）进一步分析

进一步分析可知：

- 高成交量通常伴随价格上涨阶段，说明资金推动作用明显
- 最低价逐步上移，表明市场支撑增强
- 高消费用户占比约 **20.00%**，属于重点价值用户群体

---

### （3）综合判断

👉 因此可以判断：

- 当前市场处于 **稳步上涨 + 结构健康** 阶段
- 用户消费结构呈现「中部集中，高端与低端分层」特征
- 后续应重点关注 **高价值用户** 与 **高成交量区间变化**`;

    streamText(content, (t) => {
        displayTexts.value[index] = t;
    });
}

onMounted(async () => {
    loading.value = true;

    charts.value = (await chartDBService.getChartsByTab(props.tabName)) as Chart[];

    loading.value = false;
});
</script>
