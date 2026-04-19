<template>
    <div class="h-25 pb-5">
        <t-chat-sender
            v-model="prompt"
            :loading="AiAssistantStore.isInputLoading"
            :textarea-props="{
                placeholder: '请输入消息...',
                class: 'max-h-12 overflow-hidden',
            }"
            @send="handlerSendMessage"
            @stop="AiAssistantStore.stopCurrentTask"
        >
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
import { useAiAssistantStore } from '@/stores/aiAssistant';

const value = ref('openclaw/default');
const prompt = ref('');

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

    AiAssistantStore.requestAssistant(prompt.value);
    prompt.value = '';
};
</script>

<style scoped></style>
