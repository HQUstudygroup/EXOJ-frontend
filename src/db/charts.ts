import { dbPromise } from './db';
import type { Chart } from '@/models/chartTypes';

/**
 * 判断指定 tab 是否存在
 * @param tabName tab 名称
 * @returns 是否存在
 */
async function isTabExist(tabName: string): Promise<boolean> {
    const db = await dbPromise;

    const value = await db.get('chartTabs', tabName);

    return value !== undefined;
}

/**
 * 向指定 tab 添加 chart
 * - 若 tab 不存在会自动创建
 *
 * @param tabName tab 名称
 * @param chart 图表数据
 */
async function addChartToTab(tabName: string, chartData: Chart[]) {
    const db = await dbPromise;

    let chartTab = await db.get('chartTabs', tabName);

    if (!chartTab) {
        chartTab = {
            tabName,
            charts: [],
        };

        await db.add('chartTabs', chartTab);
    }

    chartTab.charts.push(...structuredClone(chartData));

    await db.put('chartTabs', chartTab);
}

/**
 * 创建一个空 tab
 * @param tabName tab 名称
 */
async function createChartTab(tabName: string) {
    const db = await dbPromise;

    const hasTab = await isTabExist(tabName);
    if (hasTab) return;

    const chartTab = {
        tabName,
        charts: [],
    };

    await db.add('chartTabs', chartTab);
}

/**
 * 删除整个 tab
 * @param tabName tab 名称
 */
async function deleteTab(tabName: string) {
    const db = await dbPromise;
    await db.delete('chartTabs', tabName);
}

/**
 * 删除 tab 下某个 chart
 * @param tabName tab 名称
 * @param chartIndex chart 索引
 */
async function deleteChart(tabName: string, chartIndex: number) {
    const db = await dbPromise;

    const chartTab = await db.get('chartTabs', tabName);
    if (!chartTab) return;

    chartTab.charts.splice(chartIndex, 1);

    await db.put('chartTabs', chartTab);
}

/**
 * 获取所有 tab 名称
 * @returns tabName 列表
 */
async function getAllTabNames(): Promise<string[]> {
    const db = await dbPromise;

    const chartTabs = await db.getAll('chartTabs');

    return chartTabs.map((tab) => tab.tabName);
}

/**
 * 获取指定 tab 下所有 charts
 * @param tabName tab 名称
 * @returns chart 数组（不存在返回空数组）
 */
async function getChartsByTab(tabName: string) {
    const db = await dbPromise;

    const chartTab = await db.get('chartTabs', tabName);

    return chartTab?.charts ?? [];
}

export {
    isTabExist,
    addChartToTab,
    createChartTab,
    deleteTab,
    deleteChart,
    getAllTabNames,
    getChartsByTab,
};
