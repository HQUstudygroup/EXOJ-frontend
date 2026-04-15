import { defineStore } from 'pinia';
import { type FUniver } from '@univerjs/presets';
import { type FWorkbook } from '@univerjs/preset-sheets-core';
import readXlsx from '@/utils/xlsxUtil';
import debounce from '@/utils/debounce';
import { markRaw } from 'vue';

export const useUniverStore = defineStore('univer', {
    state: () => ({
        univerAPI: null as FUniver | null,
        workbook: null as FWorkbook | null,

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
                console.log(command);
                if (command.id.startsWith('sheet.mutation.')) {
                    this.reRenderStates();
                }
            });
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
                        label: `${sheetName}_${item}`,
                        value: `${sheetName}_${item}`,
                    }))
            );

            console.log(this.transferOptions);
        },
    },
});
