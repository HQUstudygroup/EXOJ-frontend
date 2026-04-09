<template>
    <n-layout class="h-screen" content-class="flex flex-col">
        <n-layout-header bordered class="h-1/15 shrink-0">
            <header-area></header-area>
        </n-layout-header>
        <n-layout has-sider class="flex-1">
            <n-layout-sider
                bordered
                :native-scrollbar="false"
                collapse-mode="width"
                show-trigger="arrow-circle"
                collapsed-width="0"
                collapsed-trigger-style="top: 250px; right: -25px"
                trigger-style="top: 250px"
            >
                <aside-area></aside-area>
            </n-layout-sider>
            <n-layout-content bordered content-class="p-18" :native-scrollbar="false">
                <router-view />
            </n-layout-content>
        </n-layout>
    </n-layout>
</template>

<script setup lang="ts">
import HeaderArea from '@/components/Header/HeaderArea.vue';
import AsideArea from '@/components/SideBar/AsideArea.vue';
</script>

<style scoped></style>
