import { type ChartUIKey } from './types';

const CHART_PARAM_SCHEMA: Record<ChartUIKey, any> = {
    line: {
        name: 'line',
        type: 'line',
        required: ['x', 'y'],
    },
    bar: {
        name: 'bar',
        type: 'bar',
        required: ['x', 'y'],
    },
    scatter: {
        name: 'scatter',
        type: 'scatter',
        required: ['x', 'y'],
    },
    'smooth-line': {
        name: 'smooth-line',
        type: 'line',
        required: ['x', 'y'],
    },
    histogram: {
        name: 'histogram',
        type: 'histogram',
        required: ['value'],
    },
    boxplot: {
        name: 'boxplot',
        type: 'boxplot',
        required: ['group', 'value'],
    },
    heatmap: {
        name: 'heatmap',
        type: 'heatmap',
        required: ['x', 'y', 'value'],
    },
    pie: {
        name: 'pie',
        type: 'pie',
        required: ['category', 'value'],
    },

    'stacked-bar': {
        name: 'stacked-bar',
        type: 'bar',
        required: ['x', 'y', 'group'],
    },
    'grouped-bar': {
        name: 'grouped-bar',
        type: 'bar',
        required: ['x', 'y', 'group'],
    },
    'percent-bar': {
        name: 'percent-bar',
        type: 'bar',
        required: ['x', 'y', 'group'],
    },

    area: {
        name: 'area',
        type: 'area',
        required: ['x', 'y', 'group'],
    },
    'trend-line': {
        name: 'trend-line',
        type: 'line',
        required: ['x', 'y'],
    },
    'moving-average': {
        name: 'moving-average',
        type: 'line',
        required: ['x', 'y'],
    },

    funnel: {
        name: 'funnel',
        type: 'funnel',
        required: ['stage', 'value'],
    },
    sankey: {
        name: 'sankey',
        type: 'sankey',
        required: ['source', 'target', 'value'],
        optional: ['links'],
    },
    candlestick: {
        name: 'candlestick',
        type: 'candlestick',
        required: ['time', 'open', 'close', 'low', 'high'],
        optional: ['volume'],
    },
};

export { CHART_PARAM_SCHEMA };
