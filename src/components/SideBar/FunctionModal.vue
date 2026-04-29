<template>
    <n-modal
        v-model:show="menuStore.showFormulaInfoModal"
        preset="card"
        class="w-1/3 h-125 shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
        :show-mask="false"
        :closable="false"
        :bordered="true"
        content-scrollable
        draggable
        segmented
    >
        <!-- Header -->
        <template #header>
            <div class="flex items-center gap-3">
                <span class="text-xl font-bold">{{ menuStore.formulaInfo?.functionName }}</span>
                <n-tag size="small" type="info">函数</n-tag>
            </div>
        </template>

        <!-- 描述 -->
        <template #default>
            <div class="text-gray-600 mb-4">
                {{ menuStore.formulaInfo?.description }}
            </div>

            <!-- 语法 -->
            <div class="mb-5">
                <div class="text-xs text-gray-400 mb-2">语法</div>
                <div class="bg-gray-900 text-green-400 font-mono text-sm p-3 rounded-xl">
                    {{ syntax }}
                </div>
            </div>

            <!-- 参数 -->
            <div>
                <div class="text-xs text-gray-400 mb-3">参数说明</div>

                <div class="flex flex-col gap-3 max-h-420 overflow-auto pr-1">
                    <div
                        v-for="item in menuStore.formulaInfo?.functionParameter"
                        :key="item.name"
                        class="bg-gray-50 hover:bg-gray-100 transition rounded-xl p-3 border border-gray-200"
                    >
                        <!-- 标题行 -->
                        <div class="flex items-center justify-between mb-1">
                            <div class="flex items-center gap-2">
                                <span class="font-mono text-blue-600 text-sm">
                                    {{ item.name }}
                                </span>

                                <n-tag size="tiny" :type="item.require ? 'error' : 'default'">
                                    {{ item.require ? '必需' : '可选' }}
                                </n-tag>
                            </div>

                            <span class="text-xs text-gray-400"> 示例: {{ item.example }} </span>
                        </div>

                        <!-- 描述 -->
                        <div class="text-sm text-gray-600 leading-relaxed">
                            {{ item.detail }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- 示例 -->
            <div class="mt-6">
                <div class="text-xs text-gray-400 mb-2">示例</div>
                <div class="bg-black text-green-400 font-mono text-sm p-3 rounded-xl">
                    {{ example }}
                </div>
            </div>
        </template>

        <template #footer>
            <n-button
                class="float-end"
                :focusable="false"
                type="primary"
                @click="menuStore.showFormulaInfoModal = false"
            >
                学会了
            </n-button>
        </template>
    </n-modal>
</template>

<script lang="ts" setup>
import { useMenuStore } from '@/stores/menu';

import { NButton } from 'naive-ui';
import { computed } from 'vue';

const menuStore = useMenuStore();

const syntax = computed(() => {
    if (menuStore.formulaInfo === undefined) return;

    return `${menuStore.formulaInfo?.functionName}(${menuStore.formulaInfo?.functionParameter
        .map((p: any) => (p.require ? p.name : `[${p.name}]`))
        .join(', ')})`;
});

const example = computed(() => {
    if (menuStore.formulaInfo === undefined) return;

    return `${menuStore.formulaInfo?.functionName}(${menuStore.formulaInfo?.functionParameter.map((p: any) => p.example).join(', ')})`;
});
</script>
