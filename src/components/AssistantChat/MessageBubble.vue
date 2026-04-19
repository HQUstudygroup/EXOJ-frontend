<template>
    <t-chat-message
        v-for="msg in AiAssistantStore.messages"
        animation="circle"
        :avatar="
            msg.role === 'user'
                ? 'https://tdesign.gtimg.com/site/avatar.jpg'
                : 'https://tdesign.gtimg.com/site/chat-avatar.png'
        "
        :chat-content-props="{
            markdown: { options: options },
        }"
        :name="msg.role === 'user' ? 'User' : 'Asssistant'"
        :role="msg.role"
        :placement="msg.role === 'user' ? 'right' : 'left'"
        :status="msg.isPending ? 'pending' : ''"
        :variant="msg.role === 'user' ? 'base' : 'outline'"
        :content="[
            {
                type: msg.role === 'user' ? 'text' : 'markdown',
                data: msg.content,
            },
        ]"
    >
    </t-chat-message>
</template>

<script setup lang="ts">
import { useAiAssistantStore } from '@/stores/AiAssistant';

const AiAssistantStore = useAiAssistantStore();

import katex from 'katex';

/**
 * 配置全局数学公式渲染引擎 (KaTeX)
 *
 * 将 katex 实例挂载至 window 全局对象，以供AI流式渲染使用。
 * @type {import('katex')}
 */

(window as any).katex = katex;

const options = {
    engine: {
        syntax: {
            mathBlock: {
                engine: 'katex',
            },
            inlineMath: {
                engine: 'katex',
            },
        },
    },
};
</script>

<style scoped></style>
