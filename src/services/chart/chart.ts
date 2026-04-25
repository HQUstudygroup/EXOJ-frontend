import * as chartEngine from './engines';

import type { ChartUIKey, ChartTypes } from '../../models/chartTypes';
import { CHART_PARAM_SCHEMA } from './schema';
import { logger } from '@/utils/logger';

const ENGINE_MAP = {
    line: chartEngine.generateLine,
    bar: chartEngine.generateBar,
    scatter: chartEngine.generateScatter,
    area: chartEngine.generateArea,
    histogram: chartEngine.generateHistogram,
    boxplot: chartEngine.generateBoxplot,
    heatmap: chartEngine.generateHeatmap,
    pie: chartEngine.generatePie,

    'stacked-bar': chartEngine.generateStackedBar,
    'grouped-bar': chartEngine.generateGroupedBar,
    'percent-bar': chartEngine.generatePercentBar,

    'smooth-line': chartEngine.generateSmoothLine,
    'trend-line': chartEngine.generateTrendLine,
    'moving-average': chartEngine.generateMovingAverage,

    funnel: chartEngine.generateFunnel,
    sankey: chartEngine.generateSankey,
    candlestick: chartEngine.generateCandlestick,
};

function getChartSchema(key: ChartUIKey) {
    return CHART_PARAM_SCHEMA[key];
}

function generateChart(key: ChartUIKey, data: any[]) {
    const schema = CHART_PARAM_SCHEMA[key];
    if (!schema) {
        logger.error('没有这个类别的图表');
        return;
    }

    const engine = ENGINE_MAP[schema.name as ChartTypes];

    if (!engine) throw new Error(`Unknown chart type: ${schema.type}`);

    return engine(undefined, data);
}

export { getChartSchema, generateChart };
