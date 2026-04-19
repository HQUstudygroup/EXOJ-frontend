<template>
    <div class="h-full flex flex-col gap-3">
        <n-split
            :resize-trigger-size="3"
            direction="vertical"
            pane1-class="h-full"
            pane2-class="p-5 h-full box-border"
            :default-size="0.35"
            :max="0.6"
            :min="0.3"
        >
            <template #1>
                <n-split
                    :resize-trigger-size="3"
                    direction="horizontal"
                    pane1-class="p-3 box-border h-full"
                    :default-size="0.4"
                    :max="0.6"
                    :min="0.35"
                >
                    <template #1>
                        <sheets-info-area></sheets-info-area>
                    </template>

                    <template #2>
                        <analize-panel></analize-panel>
                    </template>
                </n-split>
            </template>

            <template #2>
                <uni-table :content-class="'w-full h-full'"></uni-table>
            </template>
        </n-split>
    </div>
</template>

<script setup lang="ts">
import SheetsInfoArea from '@/components/SheetsInfoArea/SheetsInfoArea.vue';
import AnalizePanel from '@/components/AnalizePanel/AnalizePanel.vue';
import UniTable from '@/components/UniTable/UniTable.vue';
import { useUniverStore } from '@/stores/univer';

const univerStore = useUniverStore();

(window as any).univerStore = univerStore;
</script>

<style scoped></style>
