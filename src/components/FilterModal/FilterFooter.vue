<template>
    <div class="flex justify-between items-center">
        <div class="flex gap-2 self-start">
            <n-tag class="" :bordered="false" size="small" type="success">
                已经设置了{{ filterStore.filterRows.length }}个筛选条件
            </n-tag>
            <n-tag class="" :bordered="false" size="small" type="error">
                最多可设置{{
                    filterStore.logicOptions.length - filterStore.filterRows.length
                }}个筛选条件
            </n-tag>
        </div>

        <div class="flex gap-3 justify-end">
            <n-button @click="filterStore.handlerFilterAbandon"> 放弃筛选 </n-button>
            <n-button type="primary" @click="filterStore.handlerFilterSubmit"> 确定筛选 </n-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useFilterStore } from '@/stores/tableFilter';

const filterStore = useFilterStore();
</script>

<style scoped></style>
