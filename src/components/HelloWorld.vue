<template>
    <About :option="chartSpec" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ChartUIKey } from '@/services/chart/types';
import { generateChart } from '@/services/chart/chart';
import About from './About.vue';
import { chartTestData } from './test';

import { useMenuStore } from '@/stores/menu';
const menuStore = useMenuStore();

const data = computed(() => chartTestData[menuStore.activeKey as ChartUIKey]);
console.log(data);

const chartSpec = computed(() => {
    return generateChart(menuStore.activeKey as ChartUIKey, data.value as any);
});
</script>
