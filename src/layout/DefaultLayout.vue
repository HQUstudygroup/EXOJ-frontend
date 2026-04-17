<template>
    <n-layout class="h-screen" content-class="flex flex-col">
        <n-layout-header bordered class="h-1/15 shrink-0">
            <header-area></header-area>
        </n-layout-header>
        <n-layout has-sider class="flex-1">
            <n-layout-sider
                bordered
                :native-scrollbar="false"
                :collapsed-width="0"
                collapse-mode="width"
                show-trigger="arrow-circle"
                collapsed-trigger-style="top: 250px; right: -25px"
                trigger-style="top: 250px"
            >
                <aside-area @show-function="showFunction" />
            </n-layout-sider>
            <n-layout-content bordered content-class="p-10 px-18 h-full" :native-scrollbar="false">
                <router-view />
            </n-layout-content>
        </n-layout>
    </n-layout>

    <!-- 弹窗组件 -->
    <FunctionModal ref="modalRef" />
</template>

<script setup lang="ts">
import HeaderArea from '@/components/Header/HeaderArea.vue';
import AsideArea from '@/components/SideBar/AsideArea.vue';
import FunctionModal from '@/components/SideBar/FunctionModal.vue';
import { ref } from 'vue';

const modalRef = ref();

// 接收函数key → 获取数据 → 打开弹窗
const showFunction = (key) => {
    // 这里就是你以后从后端/接口拿数据的地方
    const data = {
        name: key.toUpperCase(),
        desc: '函数说明（从接口获取）',
        example: '=' + key.toUpperCase() + '(A1:A10)',
    };
    modalRef.value?.openModal(data);
};
</script>

<style sc></style>
