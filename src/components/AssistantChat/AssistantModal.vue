<template>
    <div>
        <n-button @click="showModal = true"> ai聊天 </n-button>

        <n-modal
            v-model:show="showModal"
            :show-mask="false"
            closable
            content-scrollable
            :segmented="{ content: true, footer: true }"
            title="AI 助手"
            preset="card"
            class="w-500px h-800px rounded-8 position-fixed right-3 bottom-3"
        >
            <template #header-extra>
                <n-button class="mr-10 rounded-5" @click="handleNewSession"> new session </n-button>
            </template>

            <MessageArea></MessageArea>

            <template #footer>
                <MessageInputBox></MessageInputBox>
            </template>
        </n-modal>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MessageInputBox from '@/components/AssistantChat/MessageInputBox.vue';
import { useAiAssistantStore } from '@/store/AiAssistant';
import MessageArea from './MessageArea.vue';

const AiAssistantStore = useAiAssistantStore();

/** 新建 Session */
const handleNewSession = () => {
    AiAssistantStore.addNewSession();
};
const showModal = ref(false);
</script>
