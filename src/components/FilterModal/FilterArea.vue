<template>
    <div class="flex flex-col gap-5">
        <div
            v-for="(row, index) in filterStore.filterRows"
            :key="index"
            class="flex gap-5 items-center pr-5"
        >
            <n-statistic class="basis-1/2" label="列名">
                <n-select
                    filterable
                    clearable
                    placeholder="请选择列"
                    v-model:value="row.field"
                    :options="filterStore.availableOptions"
                    @update:value="
                        (val: string | null | undefined) => filterStore.handleFieldChange(row, val)
                    "
                    size="small"
                />
            </n-statistic>
            <n-statistic class="basis-2/5" label="条件列表">
                <n-select
                    filterable
                    clearable
                    placeholder="请选择条件"
                    v-model:value="row.condition"
                    :options="filterStore.availableOptions"
                    @update:value="
                        (val: string | null | undefined) => filterStore.handleFieldChange(row, val)
                    "
                    size="small"
                />
            </n-statistic>
            <n-statistic class="basis-1/3" label="值">
                <n-select
                    filterable
                    clearable
                    placeholder="请填写值"
                    v-model:value="row.value"
                    :options="filterStore.availableOptions"
                    @update:value="
                        (val: string | null | undefined) => filterStore.handleFieldChange(row, val)
                    "
                    size="small"
                />
            </n-statistic>

            <div class="flex gap-3 basis-sm self-end">
                <n-button focusable size="small" quaternary @click="filterStore.addFilterRow">
                    +
                </n-button>
                <n-button
                    focusable
                    size="small"
                    quaternary
                    @click="filterStore.removeFilterRow(index)"
                >
                    −
                </n-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useFilterStore } from '@/stores/tableFilter';
const filterStore = useFilterStore();
</script>

<style scoped></style>
