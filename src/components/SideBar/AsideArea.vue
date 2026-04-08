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
        label: 'Excel函数处理',
        key: 'dance-dance-dance',
        children: [
            {
                label: '数据计算函数',
                key: 'people',
                children: [
                    {
                        label: 'SUM',
                        key: 'sum',
                    },
                    {
                        label: 'AVERAGE',
                        key: 'average',
                    },
                    {
                        label: 'MAX',
                        key: 'max',
                    },
                    {
                        label: 'MIN',
                        key: 'min',
                    },
                    {
                        label: 'COUNT',
                        key: 'count',
                    },
                    {
                        label: 'COUNTA',
                        key: 'counta',
                    },
                    {
                        label: 'COUNTBLANK',
                        key: 'countblank',
                    },
                    {
                        label: 'ROUND',
                        key: 'round',
                    },
                    {
                        label: 'ROUNDUP',
                        key: 'roundup',
                    },
                    {
                        label: 'ROUNDDOWN',
                        key: 'rounddown',
                    },
                    {
                        label: 'ABS',
                        key: 'abs',
                    },
                    {
                        label: 'MOD',
                        key: 'mod',
                    },
                ],
            },
            {
                label: '逻辑判断函数',
                key: 'beverage',
                children: [
                    {
                        label: 'IF',
                        key: 'if',
                    },
                    {
                        label: 'IFS',
                        key: 'ifs',
                    },
                    {
                        label: 'AND',
                        key: 'and',
                    },
                    {
                        label: 'OR',
                        key: 'or',
                    },
                    {
                        label: 'NOT',
                        key: 'not',
                    },
                    {
                        label: 'IFERROR',
                        key: 'iferror',
                    },
                ],
            },
            {
                label: '查找引用函数',
                key: 'lookup-functions',
                children: [
                    {
                        label: 'VLOOKUP',
                        key: 'vlookup',
                    },
                    {
                        label: 'HLOOKUP',
                        key: 'hlookup',
                    },
                    {
                        label: 'INDEX',
                        key: 'index',
                    },
                    {
                        label: 'MATCH',
                        key: 'match',
                    },
                    {
                        label: 'XLOOKUP',
                        key: 'xlookup',
                    },
                    {
                        label: 'CHOOSE',
                        key: 'choose',
                    },
                    {
                        label: 'INDEIRECT',
                        key: 'inderect',
                    },
                    {
                        label: 'OFFSET',
                        key: 'offset',
                    },
                ],
            },
            {
                label: '文本处理函数',
                key: 'text-functions',
                children: [
                    {
                        label: 'LEFT',
                        key: 'left',
                    },
                    {
                        label: 'RIGHT',
                        key: 'right',
                    },
                    {
                        label: 'MID',
                        key: 'mid',
                    },
                    {
                        label: 'LEN',
                        key: 'len',
                    },
                    {
                        label: 'TRIM',
                        key: 'trim',
                    },
                    {
                        label: 'UPPER',
                        key: 'upper',
                    },
                    {
                        label: 'LOWER',
                        key: 'lower',
                    },
                    {
                        label: 'PROPER',
                        key: 'PROPER',
                    },
                    {
                        label: 'CONCAT',
                        key: 'concat',
                    },
                    {
                        label: 'TEXT',
                        key: 'text',
                    },
                ],
            },
            {
                label: '日期时间函数',
                key: 'date-time-functions',
                children: [
                    {
                        label: 'TODAY',
                        key: 'today',
                    },
                    {
                        label: 'NOW',
                        key: 'now',
                    },
                    {
                        label: 'YEAR',
                        key: 'year',
                    },
                    {
                        label: 'MONTH',
                        key: 'month',
                    },
                    {
                        label: 'DAY',
                        key: 'day',
                    },
                    {
                        label: 'HOUR',
                        key: 'hour',
                    },
                    {
                        label: 'MINUTE',
                        key: 'minute',
                    },
                    {
                        label: 'DATEDIF',
                        key: 'datedif',
                    },
                ],
            },
            {
                label: '统计分析函数',
                key: 'statistical-analysis-functions',
                children: [
                    {
                        label: 'SUMIF',
                        key: 'sumif',
                    },
                    {
                        label: 'SUMIFS',
                        key: 'sumifs',
                    },
                    {
                        label: 'COUNTIF',
                        key: 'countif',
                    },
                    {
                        label: 'COUNTIFS',
                        key: 'COUNTIFs',
                    },
                    {
                        label: ' AVERAGEIF',
                        key: 'averageif',
                    },
                    {
                        label: 'AVERAGEIFS',
                        key: 'averageifs',
                    },
                ],
            },
        ],
    },
    {
        label: '文件格式转换',
        key: 'change',
        children: [
            {
                label: 'Word转PDF',
                key: 'wcp',
            },
            {
                label: 'PDF转Word',
                key: 'pcd',
            },
            {
                label: 'PDF转Excel',
                key: 'pce',
            },
            {
                label: 'Excel转PDF',
                key: 'ecp',
            },
            {
                label: 'Word转Excel',
                key: 'wce',
            },
            {
                label: 'Excel转Word',
                key: 'ecw',
            },
        ],
    },
    {
        label: '多文件合并',
        key: 'merge-files',
    },
    {
        label: '文件格式标准化',
        key: 'unify-formats',
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
