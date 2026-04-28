<template>
    <div class="absolute z-99 py-2 pr-5 right-0 flex gap-5 items-center">
        <n-switch
            v-model:value="univerStore.replace"
            :rail-style="railStyle"
            @update:value="
                logger.info(`已切换 ${univerStore.replace ? '单文件模式' : '表追加模式'}`, 1)
            "
        >
            <template #checked> 单文件模式 </template>
            <template #unchecked> 表追加模式 </template>
        </n-switch>
        <n-button
            size="tiny"
            type="primary"
            :focusable="false"
            @click="exportUnitable('csv', univerStore.univerAPI)"
        >
            导出 CSV
        </n-button>
        <n-button
            size="tiny"
            type="primary"
            :focusable="false"
            @click="exportUnitable('xlsx', univerStore.univerAPI)"
        >
            导出 EXCEL
        </n-button>
    </div>
</template>

<script setup lang="ts">
import { exportUnitable } from '@/utils/uniTableIO';
import { useUniverStore } from '@/stores/univer';

const univerStore = useUniverStore();

import type { CSSProperties } from 'vue';
import { logger } from '@/utils/logger';

function railStyle({ focused, checked }: { focused: boolean; checked: boolean }) {
    const style: CSSProperties = {};
    if (checked) {
        style.background = '#d03050';
        if (focused) {
            style.boxShadow = '0 0 0 2px #d0305040';
        }
    } else {
        style.background = '#2080f0';
        if (focused) {
            style.boxShadow = '0 0 0 2px #2080f040';
        }
    }
    return style;
}
</script>
