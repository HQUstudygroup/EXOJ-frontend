<template>
    <div class="w-full h-2/3">
        <div ref="el" class="w-full h-100 flex justify-center" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';

const props = defineProps<{
    contentWidth: number;
    option: any;
}>();

const el = ref<HTMLDivElement | null>(null);
let chart: echarts.ECharts | null = null;

function render() {
    if (!el.value) return;

    if (!chart) {
        chart = echarts.init(el.value);
    }

    if (!props.option) return;

    resize();

    chart.setOption(props.option, {
        notMerge: false,
        lazyUpdate: true,
    });
}

function resize() {
    if (!el.value) return;

    chart?.resize({
        width: (el.value.clientWidth * props.contentWidth) / 100,
    });
}

watch(() => props.option, render);
watch(() => props.contentWidth, resize);

onMounted(() => {
    render();
});

onBeforeUnmount(() => {
    chart?.dispose();
    chart = null;
});
</script>
