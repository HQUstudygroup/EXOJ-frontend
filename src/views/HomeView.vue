<template>
    <div>
        <FilterModal />

        <n-transfer
            v-model:value="value1"
            :options="options1"
            virtual-scroll
            source-filterable
            target-filterable
            @update:value="handleChange"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FilterModal from '@/components/FilterModal/FilterModal.vue';

function createOptions() {
    return Array.from({ length: 20 }).map((v, i) => ({
        label: `Option ${i}`,
        value: `Option ${i}`,
    }));
}

function handleChange(newValue: string[]) {
    console.log('当前选中:', newValue);
}

const options1 = createOptions();
const value1 = ref();
</script>

<style scoped></style>
