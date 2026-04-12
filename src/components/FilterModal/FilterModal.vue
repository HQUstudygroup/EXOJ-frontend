<template>
    <div>
        <n-button @click="filterStore.showModal = true"> 来吧 </n-button>

        <n-modal
            v-model:show="filterStore.showModal"
            preset="card"
            title="条件筛选"
            class="min-w-xl max-w-1/3 max-h-xl"
            :mask-closable="false"
            content-scrollable
            :closable="false"
            :segmented="{ content: true, footer: true }"
        >
            <template #default>
                <filter-area />
            </template>

            <template #header-extra>
                <filter-header-extra />
            </template>

            <template #footer>
                <filter-footer />
            </template>
        </n-modal>
    </div>
</template>

<script setup lang="ts">
import { useFilterStore } from '@/stores/tableFilter';

const filterStore = useFilterStore();
</script>

<style scoped></style>
