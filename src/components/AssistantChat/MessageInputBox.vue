<template>
    <div class="h-25 pb-5">
        <t-chat-sender
            v-model="prompt"
            :loading="AiAssistantStore.isInputLoading"
            :textarea-props="{
                placeholder: scene === 'default' ? '需要我帮你做什么吗？' : '输入你的分析需求',
                class: 'max-h-12 overflow-hidden',
            }"
            @send="handlerSendMessage"
            @stop="AiAssistantStore.stopCurrentTask"
        >
            <template #input-prefix v-if="route.path === '/index'">
                <n-select
                    v-model:value="scene"
                    :options="sceneOptions"
                    :show-arrow="false"
                    size="tiny"
                    :consistent-menu-width="false"
                    class="w-20 [&_>*]:rounded-full mr-2 ![&_*]:p-0 text-center"
                />
            </template>
            <template #footer-prefix>
                <n-select
                    v-model:value="value"
                    :options="assistantModelOptions"
                    :consistent-menu-width="false"
                    class="w-25 [&_>*]:rounded-full"
                />
            </template>
        </t-chat-sender>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAiAssistantStore } from '@/stores/AiAssistant';
import { useRoute } from 'vue-router';
const route = useRoute();

const value = ref('openclaw/default');
const prompt = ref('');
const scene = ref<string>('default');

const sceneOptions = [
    {
        label: '默认问答',
        value: 'default',
    },
    {
        label: '数据分析',
        value: 'analyze',
    },
];

const assistantModelOptions = [
    {
        label: '默认模型',
        value: 'openclaw/default',
    },
    {
        label: '千问',
        value: 'openclaw/qwen',
    },
    {
        label: 'deepseek',
        value: 'openclaw/deepseek',
    },
    {
        label: 'glm-4.7',
        value: 'openclaw/glm-4.7',
    },
];

const AiAssistantStore = useAiAssistantStore();

/**
 * 发送框发送消息的回调函数。
 * 进入AiAssistantStore 发起 AI 对话请求
 */
const handlerSendMessage = function () {
    if (AiAssistantStore.isInputLoading || !prompt.value) return;

    AiAssistantStore.requestAssistant(prompt.value, scene.value);
    prompt.value = '';
};
</script>

<style scoped></style>
