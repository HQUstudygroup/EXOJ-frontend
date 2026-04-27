<template>
    <n-modal v-model:show="modalStore.show" :mask-closable="false" :closable="false">
        <div class="w-1/3 mx-auto">
            <n-card segmented title="图表配置" :bordered="false">
                <template #header-extra>
                    <n-input
                        autosize
                        show-count
                        v-model:value="modalStore.tabName"
                        placeholder="添加到 {标签页名称}"
                        size="small"
                        class="min-w-48"
                        maxlength="10"
                    />
                </template>

                <div>
                    <div class="flex gap-4">
                        <div class="w-40 border rounded p-2 flex flex-col gap-2 justify-between">
                            <div class="flex flex-col gap-3">
                                <div
                                    v-for="(row, i) in modalStore.paramsRows"
                                    :key="i"
                                    class="px-2 py-1 rounded cursor-pointer"
                                    :class="
                                        modalStore.currentIndex === i
                                            ? 'bg-blue-100'
                                            : 'hover:bg-gray-100'
                                    "
                                    @click="modalStore.setCurrent(i)"
                                >
                                    {{ row.chartName ? row.chartName : '无标题' }}
                                </div>
                            </div>

                            <div class="flex flex-col gap-2">
                                <n-tag
                                    size="tiny"
                                    type="error"
                                    :bordered="false"
                                    class="bg-transparent"
                                >
                                    每次最多可添加 5 个图表
                                </n-tag>
                                <n-tag
                                    size="tiny"
                                    type="error"
                                    :bordered="false"
                                    class="bg-transparent"
                                >
                                    标签页最多可容纳 10 个图表
                                </n-tag>
                            </div>
                        </div>

                        <div class="flex-1 border rounded px-3">
                            <div class="flex justify-between">
                                <n-input
                                    autosize
                                    show-count
                                    v-model:value="modalStore.currentRow.chartName"
                                    size="small"
                                    maxlength="15"
                                    placeholder="图表标题"
                                    class="min-w-30 mb-2"
                                />

                                <div class="flex justify-end gap-2 mb-3">
                                    <n-button
                                        size="small"
                                        @click="modalStore.addRow"
                                        :disabled="modalStore.paramsRows.length >= 5"
                                    >
                                        +
                                    </n-button>
                                    <n-button
                                        size="small"
                                        @click="modalStore.removeRow(modalStore.currentIndex)"
                                        :disabled="modalStore.paramsRows.length <= 1"
                                    >
                                        -
                                    </n-button>
                                </div>
                            </div>

                            <div class="my-3">
                                <div class="text-xs text-red-500 mb-1">必填字段</div>

                                <div
                                    v-for="req in modalStore.fields.required"
                                    :key="req"
                                    class="flex items-center gap-2 mb-2"
                                >
                                    <div class="w-16 text-xs">{{ req }}</div>

                                    <n-select
                                        v-model:value="modalStore.currentRow.data[req]"
                                        :options="modalStore.options"
                                        size="small"
                                        class="flex-1"
                                    />
                                </div>
                            </div>

                            <div v-if="modalStore.fields.optional.length">
                                <div class="text-xs text-gray-400 mb-1">可选字段</div>

                                <div
                                    v-for="opt in modalStore.fields.optional"
                                    :key="opt"
                                    class="flex items-center gap-2 mb-2"
                                >
                                    <div class="w-16 text-xs text-gray-400">{{ opt }}</div>

                                    <n-select
                                        v-model:value="modalStore.currentRow.data[opt]"
                                        :options="modalStore.options"
                                        size="small"
                                        class="flex-1"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <template #footer>
                    <div class="flex justify-end gap-2">
                        <n-button @click="modalStore.close()">取消</n-button>
                        <n-button
                            type="primary"
                            @click="modalStore.dataConfirm(menuStore.activeKey as ChartTypes)"
                        >
                            分析
                        </n-button>
                    </div>
                </template>
            </n-card>
        </div>
    </n-modal>
</template>

<script setup lang="ts">
import type { ChartTypes } from '@/models/chartTypes';
import { useChartModalStore } from '@/stores/chartModal';
import { useMenuStore } from '@/stores/menu';

const modalStore = useChartModalStore();
const menuStore = useMenuStore();
</script>
