<template>
    <div>
        <hot-table :data="data" :rowHeaders="true" :colHeaders="true" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { HotTable } from '@handsontable/vue3';
import { registerAllModules } from 'handsontable/registry';

registerAllModules();

const data = ref([
    ['', 'Ford', 'Volvo', 'Toyota', 'Honda'],
    ['2016', 10, 11, 12, 13],
    ['2017', 20, 11, 14, 13],
    ['2018', 30, 15, 12, 13],
]);
</script>

<style scoped></style>
