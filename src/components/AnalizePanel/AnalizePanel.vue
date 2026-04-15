<template>
    <div class="h-full position-relative">
        <n-button
            icon-placement="right"
            class="position-absolute m-5 z-1 right-2 flex items-center"
            type="primary"
            size="small"
            :focusable="false"
        >
            <template #icon>
                <n-icon>
                    <ArrowForwardOutline />
                </n-icon>
            </template>
            进入分析
        </n-button>

        <n-transfer
            v-model:value="transferValue"
            :options="univerStore.transferOptions"
            virtual-scroll
            source-filterable
            target-filterable
            @update:value="handleChange"
            class="box-border h-full p-3"
        >
        </n-transfer>
    </div>
</template>

<script setup lang="ts">
import { ArrowForwardOutline } from '@vicons/ionicons5';
import { useUniverStore } from '@/stores/univer';

import { ref } from 'vue';

const univerStore = useUniverStore();
const transferValue = ref();

function handleChange() {
    console.log('当前选中:', transferValue.value); // arrays
}
</script>

<style scoped></style>
