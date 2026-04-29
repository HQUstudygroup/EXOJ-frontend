import { type FUniver } from '@univerjs/presets';
import { type FWorkbook } from '@univerjs/preset-sheets-core';

import debounce from '@/utils/debounce';

import { defineStore } from 'pinia';
import { markRaw } from 'vue';
import { importUnitable } from '@/utils/uniTableIO';

export const useUniverStore = defineStore('univer', {
    state: () => ({
        univerAPI: null as FUniver | null,
        workbook: null as FWorkbook | null,
        formulaDescriptions: null as any,

        reRenderStates: null as any,

        sheetsInfo: [] as {
            id: string;
            name: string;
            rows: number;
            cols: number;
            empty: number;
        }[],

        transferOptions: [] as { label: string; value: string }[],

        transferValues: [] as string[],

        commandListenerDisposable: null as any,

        replace: false as boolean,
    }),

    actions: {
        setAPI(api: FUniver | null) {
            if (!api) return;
            this.univerAPI = markRaw(api) as FUniver;
            (window as any).univerAPI = this.univerAPI;
            this.workbook = markRaw(this.univerAPI.getActiveWorkbook() as FWorkbook) as FWorkbook;

            this.initCommandListener();
        },

        clearCommandListener() {
            if (this.commandListenerDisposable) {
                if (typeof this.commandListenerDisposable.dispose === 'function') {
                    this.commandListenerDisposable.dispose();
                }
                this.commandListenerDisposable = null;
            }
        },

        initCommandListener() {
            if (!this.workbook) return;

            this.clearCommandListener();

            this.reRenderStates = debounce(() => {
                if (!this.workbook) return;

                this.transferOptions = [];
                const sheets = this.workbook.getSheets();

                this.sheetsInfo = sheets.map((sheet) => {
                    const sheetRange = sheet.getDataRange();

                    const sheetName = sheetRange.getSheetName();
                    const sheetDataMatrix = sheetRange.getDisplayValues();
                    this.getSheetColHeader(sheetName, sheetDataMatrix[0]);

                    return {
                        id: sheetRange.getSheetId(),
                        name: sheetName,
                        rows: sheetRange.getLastRow() + 1,
                        cols: sheetRange.getLastColumn() + 1,
                        empty: sheetDataMatrix.flat().filter((v) => v === '').length,
                    };
                });
            }, 200);

            this.commandListenerDisposable = this.workbook?.onCommandExecuted((command: any) => {
                if (command.id.startsWith('sheet.mutation.')) this.reRenderStates();
                if (command.id === 'sheet.operation.set-worksheet-active') '';
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

        getUniqueSheetName(desiredName: string, existingNames: string[]) {
            if (!existingNames.includes(desiredName)) return desiredName;

            const regex = /^(.+?)\s*\((\d+)\)$/;
            const match = desiredName.match(regex);

            let baseName: string;
            let startNumber: number;

            if (match) {
                baseName = match[1];
                startNumber = parseInt(match[2], 10);
            } else {
                baseName = desiredName;
                startNumber = 1;
            }

            let newName = `${baseName} (${startNumber})`;
            let counter = startNumber;

            while (existingNames.includes(newName)) {
                counter++;
                newName = `${baseName} (${counter})`;
            }

            return newName;
        },

        async importDataToUnitable(file: File) {
            if (!this.univerAPI || !this.workbook) {
                throw new Error('univerAPI 实例不存在');
            }

            const workbookData = await importUnitable(file);

            if (this.replace) {
                this.univerAPI.dispose();
                this.univerAPI?.createWorkbook(workbookData);

                this.workbook = markRaw(
                    this.univerAPI.getActiveWorkbook() as FWorkbook
                ) as FWorkbook;
            } else {
                const randomId = `${Date.now()}_${Math.random().toString(36).substr(2, 8)}`;

                const dataRefactor = (data: any, randomId: string) => {
                    return JSON.parse(
                        JSON.stringify(data)
                            .replace(/(sheet-\d+)/g, `$1${randomId}`)
                            .replace(/(style_\d+)/g, `$1${randomId}`)
                    );
                };

                const currentData = this.workbook.save();

                const mergedData = {
                    ...currentData,
                    id: `${currentData.id}_${new Date().getTime().toString()}`,
                    sheets: {
                        ...currentData.sheets,
                        ...dataRefactor(workbookData.sheets, randomId),
                    },
                    sheetOrder: [
                        ...currentData.sheetOrder,
                        ...dataRefactor(workbookData.sheetOrder, randomId),
                    ],
                    styles: {
                        ...currentData.styles,
                        ...dataRefactor(workbookData.styles, randomId),
                    },
                };

                this.univerAPI.dispose();
                this.workbook.dispose();
                this.clearCommandListener();

                this.univerAPI?.createWorkbook(mergedData);
                this.workbook = markRaw(
                    this.univerAPI.getActiveWorkbook() as FWorkbook
                ) as FWorkbook;

                this.workbook.setActiveSheet(this.workbook.getSheets().at(-1)!);

                (() => {
                    const sheet = this.workbook?.getSheets()[0];
                    const value = sheet!.getRange(0, 0, 1, 1).getValue?.();
                    if (value == null || value === '') this.workbook?.deleteSheet(sheet!);
                })();
            }

            this.initCommandListener();
            this.reRenderStates();
        },

        async getSheetColHeader(sheetName: string, matrix: string[]) {
            this.transferOptions.push(
                ...matrix
                    .filter((item) => item !== '')
                    .map((item) => ({
                        label: `${sheetName} ─ ${item}`,
                        value: `${sheetName} ─ ${item}`,
                    }))
            );
        },

        async getFormulaInfo(formulaName: string) {
            if (formulaName === '') return;

            if (!this.formulaDescriptions) {
                this.formulaDescriptions = (
                    this.univerAPI?.getFormula() as any
                )._functionService._functionDescriptions;
            }

            const formulaInfo = await this.formulaDescriptions.get(formulaName);

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
