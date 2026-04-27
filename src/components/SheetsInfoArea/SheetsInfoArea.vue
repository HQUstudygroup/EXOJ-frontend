<template>
    <n-card segmented class="h-full" size="medium">
        <template #header>
            <div class="flex items-center gap-2">
                <n-icon>
                    <ListSharp />
                </n-icon>
                表信息
            </div>
        </template>

        <div v-if="!univerStore.sheetsInfo.length" class="h-full flex justify-center items-center">
            <n-empty description="暂无分析数据">
                <template #extra>
                    <n-upload :show-file-list="false" @change="handleFileChange">
                        <n-button size="small" type="primary"> 去分析 </n-button>
                    </n-upload>
                </template>
            </n-empty>
        </div>

        <n-tabs v-if="univerStore.sheetsInfo.length" animated>
            <n-tab-pane
                v-for="sheet in univerStore.sheetsInfo"
                :key="sheet.id"
                :name="sheet.id"
                :tab="sheet.name"
            >
                <div class="w-full flex justify-between mt-3">
                    <n-statistic label="总列数" tabular-nums>
                        <n-number-animation :from="0" :to="sheet.cols" />
                        <template #suffix> 列 </template>
                    </n-statistic>

                    <n-statistic label="总行数" tabular-nums>
                        <n-number-animation :from="0" :to="sheet.rows" />
                        <template #suffix> 行 </template>
                    </n-statistic>
                    <n-statistic label="数据量">
                        <n-number-animation :from="0" :to="sheet.cols * (sheet.rows - 1)" />
                        <template #suffix> 格 </template>
                    </n-statistic>
                    <n-statistic label="空值数量">
                        <n-number-animation :from="0" :to="sheet.empty" />
                        <template #suffix> 格 </template>
                    </n-statistic>
                </div>
            </n-tab-pane>
        </n-tabs>
    </n-card>
</template>

<script setup lang="ts">
import { useUniverStore } from '@/stores/univer';
import { ListSharp } from '@vicons/ionicons5';

const univerStore = useUniverStore();

const handleFileChange = async (options: any) => {
    const file = options.file?.file || options.file;

    if (!file) return;

    await univerStore.importExcel(file);
};
</script>

<style scoped></style>
