import { defineStore } from 'pinia';
import type { FUniver } from '@univerjs/presets';
import readXlsx from '@/utils/xlsxUtil';
import { markRaw } from 'vue';

export const useUniverStore = defineStore('univer', {
    state: () => ({
        univerAPI: null as FUniver | null,
    }),

    actions: {
        setAPI(api: FUniver) {
            this.univerAPI = markRaw(api) as FUniver;
        },

        async importExcel(file: File) {
            if (!this.univerAPI) return;

            const data = await readXlsx(file);

            const workbook = this.univerAPI.getActiveWorkbook();
            if (!workbook) return;

            let sheet = workbook.getActiveSheet();
            if (!sheet) return;

            const value = sheet.getRange(0, 0, 1, 1).getValue?.();
            const isEmpty = value == null || value === '';

            if (!isEmpty) {
                sheet = workbook.insertSheet();
            }

            sheet.getRange(0, 0, data.length, data[0].length).setValues(data);

            const sheetName = file.name.replace(/\.[^/.]+$/, '');
            console.log('Setting sheet name to:', sheetName);
            sheet.setName(sheetName);

            workbook.setActiveSheet(sheet);
        },
    },
});
