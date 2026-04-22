<template>
    <div class="w-full h-2/3">
        <div ref="el" class="w-full h-full" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';

const props = defineProps<{
    option: any;
}>();

const el = ref<HTMLDivElement | null>(null);
let chart: echarts.ECharts | null = null;

function render() {
    if (!el.value) return;

    if (!chart) {
        chart = echarts.init(el.value);

        window.addEventListener('resize', resize);
    }

    if (!props.option) return;

    chart.setOption(props.option, {
        notMerge: false,
        lazyUpdate: true,
    });
}

function resize() {
    chart?.resize();
}

watch(
    () => props.option,
    () => {
        render();
    },
    { deep: true }
);

onMounted(() => {
    render();
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', resize);
    chart?.dispose();
    chart = null;
});
</script>
