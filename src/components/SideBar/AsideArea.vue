<template>
    <n-menu
        :options="menuOptions"
        :render-label="renderMenuLabel"
        :render-icon="renderMenuIcon"
        :expand-icon="expandIcon"
    />
</template>

<script setup lang="ts">
import type { MenuOption } from 'naive-ui';
import { BookmarkOutline, CaretDownOutline } from '@vicons/ionicons5';
import { NIcon } from 'naive-ui';
import { h } from 'vue';

const menuOptions: MenuOption[] = [
    {
        label: '舞，舞，舞',
        key: 'dance-dance-dance',
        children: [
            {
                type: 'group',
                label: '人物',
                key: 'people',
                children: [
                    {
                        label: '叙事者',
                        key: 'narrator',
                    },
                    {
                        label: '羊男',
                        key: 'sheep-man',
                    },
                ],
            },
            {
                label: '饮品',
                key: 'beverage',
                children: [
                    {
                        label: '威士忌',
                        key: 'whisky',
                        href: 'http://localhost:5173/about',
                    },
                ],
            },
            {
                label: '食物',
                key: 'food',
                children: [
                    {
                        label: '三明治',
                        key: 'sandwich',
                    },
                ],
            },
            {
                label: '过去增多，未来减少',
                key: 'the-past-increases-the-future-recedes',
            },
        ],
    },
];

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

function expandIcon() {
    return h(NIcon, null, { default: () => h(CaretDownOutline) });
}
</script>

<style scoped></style>
