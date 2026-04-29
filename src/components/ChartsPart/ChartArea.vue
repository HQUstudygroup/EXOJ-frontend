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
                        class="mt-3 w-full h-full text-wrap overflow-auto px-20"
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

    const content = `
# This is TDesign

## This is TDesign

### This is TDesign

#### This is TDesign

The point of reference-style links is not that they’re easier to write. The point is that with reference-style links, your document source is vastly more readable. Compare the above examples: using reference-style links, the paragraph itself is only 81 characters long; with inline-style links, it’s 176 characters; and as raw \`HTML\`, it’s 234 characters. In the raw \`HTML\`, there’s more markup than there is text.

> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet.

an example | *an example* | **an example**

1. Bird
1. McHale
1. Parish
    1. Bird
    1. McHale
        1. Parish

- Red
- Green
- Blue
    - Red
    - Green
        - Blue

This is [an example](http://example.com/ "Title") inline link.

<http://example.com/>
# TDesign（腾讯设计体系）核心特性与技术架构

以下是关于 TDesign（腾讯设计体系）的核心特性与技术架构的表格化总结：

| 分类 | 核心内容 | 关键技术/特性 |
|------|----------|---------------|
| **设计理念** | • 设计价值观：用户为本、科技向善、突破创新... | • 设计原子单元 |
| **核心组件库** | • 基础组件：Button/Input/Table/Modal... | • 组件覆盖率  |
| **技术特性** | • 多框架支持：Vue/React/Angular... | • 按需加载 |
\`\`\`bash
$ npm i tdesign-vue-next
\`\`\`

---

\`\`\`javascript
import { createApp } from 'vue';
import App from './app.vue';

const app = createApp(App);
app.use(TDesignChat);
\`\`\`
  `;

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
