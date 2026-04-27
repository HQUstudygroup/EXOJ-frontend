import { defineStore } from 'pinia';

import type { ChartTypes } from '@/models/chartTypes';
import { CHART_PARAM_SCHEMA } from '@/services/chart/schema';

import { useUniverStore } from './univer';

import { logger } from '@/utils/logger';
import * as chartDBService from '@/db/charts';

const univerStore = useUniverStore();

type Row = {
    chartName: string;
    data: Record<string, string>;
};

export const useChartModalStore = defineStore('chartModal', {
    state: () => ({
        show: false,
        tabName: '',

        fields: {
            required: [] as string[],
            optional: [] as string[],
        },

        paramsRows: [] as Row[],

        options: [] as { label: string; value: string }[],

        currentIndex: 0,
    }),

    getters: {
        currentRow(state) {
            return (
                state.paramsRows[state.currentIndex] || {
                    chartName: '',
                    data: {},
                }
            );
        },
    },

    actions: {
        setSelectOptions(transferValues: string[]) {
            this.options = transferValues.map((v) => ({
                label: v,
                value: v,
            }));
        },

        setCurrent(index: number) {
            this.currentIndex = index;
        },

        open(required: string[], optional: string[] = []) {
            this.fields.required = required;
            this.fields.optional = optional;

            const all = [...required, ...optional];

            this.paramsRows = [this.createRow(all)];
            this.currentIndex = 0;
            this.show = true;
        },

        createRow(allFields: string[]): Row {
            const data: Record<string, string> = {};

            allFields.forEach((k) => {
                data[k] = '';
            });

            return {
                chartName: `图${this.paramsRows.length + 1}`,
                data,
            };
        },

        addRow() {
            if (this.paramsRows.length >= 5) return;

            const all = [...this.fields.required, ...this.fields.optional];

            this.paramsRows.push(this.createRow(all));
        },

        removeRow(index: number) {
            this.paramsRows.splice(index, 1);

            if (this.paramsRows.length === 0) return;

            this.currentIndex = Math.min(index, this.paramsRows.length - 1);
        },

        close() {
            this.show = false;
            this.tabName = '';
            this.paramsRows = [];
        },

        validateResult(): boolean {
            const name = this.tabName?.trim();

            if (!name) {
                logger.error('标签页名称不能为空！');
                return false;
            }

            const hasEmpty = this.paramsRows.some((row) =>
                this.fields.required.some((field) => !row.data[field]?.trim())
            );

            if (hasEmpty) {
                logger.error('存在未填写的必填字段');
                return false;
            }

            return true;
        },

        async dataConfirm(chartType: ChartTypes) {
            if (!this.validateResult()) {
                return;
            }

            const finalAnalyzeData = {
                tabName: this.tabName,
                paramsRows: await Promise.all(
                    this.paramsRows.map(async (row) => {
                        const uniqueDataCols = [...new Set(Object.values(row.data))];

                        const fetchedData = await univerStore.getDataFromCols(uniqueDataCols);

                        const combinedData = Object.entries({ ...row.data }).reduce<
                            Record<string, any>
                        >((acc, [key, dataKey]) => {
                            acc[key] = fetchedData[dataKey];
                            return acc;
                        }, {});

                        return {
                            chartName: row.chartName,
                            chartType: chartType,
                            data: combinedData,
                        };
                    })
                ),
            };

            if (!chartDBService.isTabExist(finalAnalyzeData.tabName)) {
                chartDBService.createChartTab(finalAnalyzeData.tabName);
            }

            const chartTabLength =
                (await chartDBService.getChartsByTab(this.tabName)).length +
                finalAnalyzeData.paramsRows.length;

            if (chartTabLength > 10) {
                logger.error('标签页图表数量超出');
                return;
            }

            chartDBService.addChartToTab(
                finalAnalyzeData.tabName,
                finalAnalyzeData.paramsRows as any
            );

            logger.warning('图表为空的话可能是数据问题', 8);

            this.close();
        },
    },
});
