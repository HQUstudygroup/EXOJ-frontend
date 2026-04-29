<template>
    <div
        class="fixed w-14 h-14 rounded-full flex items-center justify-center text-[28px] cursor-grab active:cursor-grabbing z-[9999] select-none group"
        :style="{ left: x + 'px', top: y + 'px' }"
        @mousedown="startDrag"
    >
        <div
            class="absolute whitespace-nowrap px-3 py-1.5 text-sm text-white bg-black/70 rounded-lg shadow transition-all duration-200 pointer-events-none"
            :class="[
                isRightSide ? 'right-[70px]' : 'left-[70px]',
                dragging
                    ? 'opacity-0'
                    : isRightSide
                      ? 'opacity-0 translate-x-[10px] group-hover:opacity-100 group-hover:translate-x-0'
                      : 'opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0',
            ]"
        >
            {{ tipText }}
        </div>

        <div class="w-full h-full relative pointer-events-none">
            <img
                src="@/assets/ai_ball.png"
                class="w-full h-full rounded-full object-cover absolute inset-0 scale-115 transition-opacity duration-200 group-hover:opacity-0"
            />

            <img
                src="@/assets/ai_twoball.png"
                class="w-full h-full rounded-full object-cover absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';

import { useAiAssistantStore } from '@/stores/aiAssistant';

const isRightSide = computed(() => {
    return x.value > window.innerWidth / 2;
});

const aiAssistantStore = useAiAssistantStore();

const x = ref(290);
const y = ref(70);

let offsetX = 0;
let offsetY = 0;

let startX = 0;
let startY = 0;
let moved = false;

const dragging = ref(false);

const startDrag = (e: any) => {
    dragging.value = true;

    startX = e.clientX;
    startY = e.clientY;
    moved = false;

    offsetX = e.clientX - x.value;
    offsetY = e.clientY - y.value;

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', stopDrag);
};

const stopDrag = () => {
    dragging.value = false;

    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', stopDrag);

    if (!moved) {
        aiAssistantStore.showAssistantModal = !aiAssistantStore.showAssistantModal;
    }
};
const onMove = (e: any) => {
    if (!dragging.value) return;

    if (Math.abs(e.clientX - startX) > 3 || Math.abs(e.clientY - startY) > 3) {
        moved = true;
    }

    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;

    const maxX = window.innerWidth - BALL_SIZE;
    const maxY = window.innerHeight - BALL_SIZE;

    x.value = Math.min(Math.max(0, newX), maxX);
    y.value = Math.min(Math.max(0, newY), maxY);
};
const messages = [
    '我是你的AI小助手，有需要点我😎',
    '需要我帮你做什么吗？',
    '可以问我任何问题哦～',
    '点我试试，有惊喜 👀',
    '我在呢，有问题尽管说',
    '偷偷告诉你，我挺好用的 😏',
    '随时可以点我聊聊',
    '有什么想法可以直接说出来',
    '我可以帮你解决问题哦～',
];

const randomMsg = () => messages[Math.floor(Math.random() * messages.length)];
const tipText = ref(randomMsg());

setInterval(() => {
    tipText.value = randomMsg();
}, 4000);

const BALL_SIZE = 56;
</script>
