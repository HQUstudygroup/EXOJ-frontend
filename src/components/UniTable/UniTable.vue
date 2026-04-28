<template>
    <div
        :class="[
            'shadow-[0_4px_16px_rgba(0,0,0,0.5)]',
            contentClass ? contentClass : 'h-200 w-350',
        ]"
        ref="container"
    />
</template>

<script lang="ts" setup>
import { UniverSheetsCorePreset } from '@univerjs/preset-sheets-core';
import UniverPresetSheetsCoreZhCN from '@univerjs/preset-sheets-core/locales/zh-CN';
import { UniverSheetsFilterPreset } from '@univerjs/preset-sheets-filter';
import UniverPresetSheetsFilterZhCN from '@univerjs/preset-sheets-filter/locales/zh-CN';
import { UniverSheetsSortPreset } from '@univerjs/preset-sheets-sort';
import UniverPresetSheetsSortZhCN from '@univerjs/preset-sheets-sort/locales/zh-CN';
import { UniverSheetsHyperLinkPreset } from '@univerjs/preset-sheets-hyper-link';
import UniverPresetSheetsHyperLinkZhCN from '@univerjs/preset-sheets-hyper-link/locales/zh-CN';
import { createUniver, LocaleType, mergeLocales } from '@univerjs/presets';

import '@univerjs/preset-sheets-core/lib/index.css';
import '@univerjs/preset-sheets-sort/lib/index.css';
import '@univerjs/preset-sheets-filter/lib/index.css';
import '@univerjs/preset-sheets-hyper-link/lib/index.css';

import { onMounted, ref, onActivated, nextTick } from 'vue';

import { useUniverStore } from '@/stores/univer';

defineProps<{
    contentClass?: string;
}>();

const univerStore = useUniverStore();

const container = ref<HTMLElement | null>(null);
const isCreating = ref(false);

async function initUnitable(savedData: any) {
    if (!container.value) return;

    const { univer, univerAPI } = createUniver({
        locale: LocaleType.ZH_CN,
        locales: {
            [LocaleType.ZH_CN]: mergeLocales(
                UniverPresetSheetsCoreZhCN,
                UniverPresetSheetsSortZhCN,
                UniverPresetSheetsFilterZhCN,
                UniverPresetSheetsHyperLinkZhCN
            ),
        },
        presets: [
            UniverSheetsCorePreset({
                container: container.value as HTMLElement,
            }),
            UniverSheetsSortPreset(),
            UniverSheetsFilterPreset(),
            UniverSheetsHyperLinkPreset(),
        ],
    });

    if (savedData) {
        await univerAPI.createWorkbook(savedData);
    } else {
        await univerAPI.createWorkbook({});
    }

    univerStore.setAPI(univerAPI);

    isCreating.value = false;
}

async function recreateUnitable() {
    if (isCreating.value) return;
    isCreating.value = true;

    let savedData = null;
    if (univerStore.univerAPI) {
        try {
            const workbook = univerStore.univerAPI.getActiveWorkbook();
            savedData = workbook?.save();
        } catch (e) {
            console.warn('保存数据失败', e);
        }

        univerStore.univerAPI.dispose?.();
        univerStore.setAPI(null);
    }

    await nextTick();

    initUnitable(savedData);
}

/** uniTable 生命周期管理 */
onMounted(() => {
    recreateUnitable();
});

onActivated(() => {
    recreateUnitable();
});
</script>
