import { type FUniver } from '@univerjs/presets';
import { type FWorkbook } from '@univerjs/preset-sheets-core';

import readXlsx from '@/utils/xlsxUtil';
import debounce from '@/utils/debounce';

import { defineStore } from 'pinia';
import { markRaw } from 'vue';

export const useUniverStore = defineStore('univer', {
    state: () => ({
        univerAPI: null as FUniver | null,
        workbook: null as FWorkbook | null,
        formulaService: null as any,

        reRenderStates: null as any,

        sheetsInfo: [] as {
            id: string;
            name: string;
            rows: number;
            cols: number;
            empty: number;
        }[],

        transferOptions: [] as { label: string; value: string }[],
    }),

    actions: {
        setAPI(api: FUniver) {
            this.univerAPI = markRaw(api) as FUniver;
            (window as any).univerAPI = this.univerAPI;
            this.workbook = markRaw(this.univerAPI.getActiveWorkbook() as FWorkbook) as FWorkbook;

            this.formulaService = this.univerAPI.getFormula()['_functionService'];

            this.initCommandListener();
        },

        initCommandListener() {
            if (!this.workbook || this.reRenderStates) return;

            this.reRenderStates = debounce(() => {
                if (!this.workbook) return;

                this.transferOptions = [];
                const sheets = this.workbook.getSheets();

                this.sheetsInfo = sheets.map((sheet) => {
                    const sheetRange = sheet.getDataRange();

                    const sheetName = sheetRange.getSheetName();
                    const sheetDataMatrix = sheetRange.getDisplayValues();
                    this.getSheetColHeader(sheetName, sheetDataMatrix);

                    return {
                        id: sheetRange.getSheetId(),
                        name: sheetName,
                        rows: sheetRange.getLastRow() + 1,
                        cols: sheetRange.getLastColumn() + 1,
                        empty: sheetDataMatrix.flat().filter((v) => v === '').length,
                    };
                });
            }, 200);

            this.workbook.onCommandExecuted((command: any) => {
                if (command.id.startsWith('sheet.mutation.')) {
                    this.reRenderStates();
                }
            });
        },

        filterData(dataList: any[][], filterOutDataList: number[]) {
            const excludeSet = new Set(filterOutDataList);

            const result = dataList
                .filter((_, index) => {
                    return index !== 0 && !excludeSet.has(index);
                })
                .map((item) => item[0]);

            return result;
        },

        async importExcel(file: File) {
            if (!this.univerAPI || !this.workbook) return;

            const data = await readXlsx(file);

            let sheet = this.workbook.getActiveSheet();
            if (!sheet) return;

            const value = sheet.getRange(0, 0, 1, 1).getValue?.();
            const isEmpty = value == null || value === '';

            if (!isEmpty) {
                sheet = this.workbook.insertSheet();
            }

            sheet.getRange(0, 0, data.length, data[0].length).setValues(data);

            const sheetName = file.name.replace(/\.[^/.]+$/, '');
            sheet.setName(sheetName);

            this.workbook.setActiveSheet(sheet);
        },

        async getSheetColHeader(sheetName: string, matrix: string[][]) {
            this.transferOptions.push(
                ...matrix[0]
                    .filter((item) => item !== '')
                    .map((item) => ({
                        label: `${sheetName} ─ ${item}`,
                        value: `${sheetName} ─ ${item}`,
                    }))
            );

            console.log(this.transferOptions);
        },

        async getFormulaInfo(formulaName: string) {
            if (!this.formulaService || formulaName === '') return;

            const formulaInfo = await this.formulaService.getDescription(formulaName);

            return formulaInfo;
        },

        async getDataFromCols(colsHeaders: string[]) {
            return colsHeaders.reduce<Record<string, any>>((acc, item) => {
                const parts = item.split(' ─ ');
                const tableName = parts[0];
                const colName = parts[1];

                const dataSheet = this.workbook?.getSheetByName(tableName);
                if (!dataSheet) return acc;

                const dataHeaders = dataSheet
                    .getRange(0, 0, 1, dataSheet.getLastColumn() + 1)
                    .getValues()[0];

                const colIndex = dataHeaders?.indexOf(colName);
                if (colIndex === -1 || colIndex === undefined) return acc;

                const colData = dataSheet
                    .getRange(0, colIndex, dataSheet.getLastRow() + 1, 1)
                    .getValues();

                const filteredOutRows = dataSheet.getFilter()?.getFilteredOutRows() || [];

                const finalData = this.filterData(colData as any[][], filteredOutRows as number[]);

                acc[item] = finalData;

                return acc;
            }, {});
        },
    },
});
