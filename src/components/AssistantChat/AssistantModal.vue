<template>
    <div>
        <n-modal
            v-model:show="aiAssistantStore.showAssistantModal"
            :show-mask="false"
            content-scrollable
            :segmented="{ content: true, footer: true }"
            title="AI 助手"
            preset="card"
            class="w-1/4vw h-5/6vh rounded-8 position-fixed right-5 bottom-10 shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
        >
            <template #header-extra>
                <n-button class="mr-3 rounded-5" @click="handleNewSession"> New Session </n-button>
            </template>

            <MessageArea></MessageArea>

            <template #footer>
                <MessageInputBox></MessageInputBox>
            </template>
        </n-modal>
    </div>
</template>

<script setup lang="ts">
import MessageInputBox from '@/components/AssistantChat/MessageInputBox.vue';
import { useAiAssistantStore } from '@/stores/AiAssistant';
import MessageArea from './MessageArea.vue';

const aiAssistantStore = useAiAssistantStore();

const handleNewSession = () => {
    aiAssistantStore.addNewSession();
};
</script>
