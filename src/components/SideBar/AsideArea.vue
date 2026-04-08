<template>
    <n-menu :options="asideOptions" :render-label="renderMenuLabel" :render-icon="renderMenuIcon" />
</template>

<script setup lang="ts">
import type { MenuOption } from 'naive-ui';
import { asideOptions } from './asideOptions';
import { BookmarkOutline } from '@vicons/ionicons5';
import { NIcon } from 'naive-ui';
import { h } from 'vue';

function renderMenuLabel(option: MenuOption) {
    if ('href' in option) {
        return h('a', { href: option.href }, option.label as string);
    }
    return option.label as string;
}

function renderMenuIcon(option: MenuOption) {
    // 渲染图标占位符以保持缩进
    if (option.key === 'sheep-man') return true;
    // 返回 falsy 值，不再渲染图标及占位符
    if (option.key === 'food') return null;
    return h(NIcon, null, { default: () => h(BookmarkOutline) });
}
</script>

<style scoped></style>
