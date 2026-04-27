import { defineStore } from 'pinia';
import { readXlsx, exportXlsx } from '@/utils/xlsxUtil';

export const useMergeFileStore = defineStore('mergefiles', {
    state: () => ({
        fileList: [] as any[],
        tableData: [] as any[],

        startRow: 1,
        mergedData: [] as any[][],
        loading: false,
    }),

    getters: {
        hasData: (state) => state.mergedData.length > 0,
        rowCount: (state) => state.mergedData.length,
    },

    actions: {
        async handleMerge() {
            const files = this.fileList
                .map((item) => item.file)
                .filter((f): f is File => !!f && f.name.endsWith('.xlsx'));

            if (files.length === 0) return [];

            this.loading = true;
            const result: any[][] = [];
            let headerAdded = false;

            // 计算起始索引
            const startIndex = Math.max(this.startRow - 1, 0);

            try {
                for (const file of files) {
                    const data = await readXlsx(file);
                    if (!data || data.length === 0) continue;

                    // 处理表头：仅保留第一个文件的表头
                    if (!headerAdded) {
                        const headerRows = data.slice(0, startIndex);
                        result.push(...headerRows);
                        headerAdded = true;
                    }

                    // 处理内容：从指定的起始行开始读取
                    for (let i = startIndex; i < data.length; i++) {
                        const row = data[i];

                        // 判断是否为空行
                        const isEmpty = row.every(
                            (cell) => cell === '' || cell === null || cell === undefined
                        );

                        if (isEmpty) break; // 遇到空行停止读取当前文件
                        result.push(row);
                    }
                }

                // 更新状态
                this.mergedData = result;
                return result;
            } catch (error) {
                console.error('Excel merge error:', error);
                throw error;
            } finally {
                this.loading = false;
                this.tableData = this.mergedData;
            }
        },

        handleExport() {
            if (!this.mergedData.length) return;

            exportXlsx(this.mergedData, '合并结果.xlsx');
        },
    },
});
