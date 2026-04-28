import LuckyExcel from '@mertdeveci55/univer-import-export';
import { logger } from './logger';

/**
 * 根据文件后缀自动选择导入方式
 * @param file - 文件对象
 * @returns Promise 返回 Univer 数据
 */
async function importUnitable(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
        const suffix = file.name.split('.').pop()?.toLowerCase();

        if (!suffix || !['xlsx', 'csv'].includes(suffix)) {
            const error = '不支持的文件格式，请上传 .xlsx 或 .csv 文件';
            logger.error(error);
            reject(new Error(error));
            return;
        }

        const onSuccess = (data: any) => {
            console.log(`导入成功 (${suffix}):`, data);
            resolve(data);
        };

        const onError = (error: any) => {
            console.error(`导入失败 (${suffix}):`, error);
            reject(error);
        };

        if (suffix === 'xlsx') {
            LuckyExcel.transformExcelToUniver(file, onSuccess, onError);
        } else if (suffix === 'csv') {
            LuckyExcel.transformCsvToUniver(file, onSuccess, onError);
        }
    });
}

async function exportUnitable(exportFileType: 'xlsx' | 'csv', univerAPI: any) {
    const snapshot = univerAPI?.getActiveWorkbook()?.save();
    if (!snapshot) return;

    const fileName = `表格.${exportFileType}`;

    if (exportFileType === 'xlsx') {
        LuckyExcel.transformUniverToExcel({
            snapshot,
            fileName,
            success: () => logger.success('导出成功'),
            error: (err) => logger.error(`导出失败: ${err}`),
        });
    } else if (exportFileType === 'csv') {
        LuckyExcel.transformUniverToCsv({
            snapshot,
            fileName,
            getBuffer: true,
            success: (csvContent) => {
                if (!csvContent) return;

                Object.entries(csvContent).forEach(([name, data]) => {
                    const blob = new Blob(
                        ['\uFEFF' + data.split('data:text/csv;charset=utf-8,')[1]],
                        {
                            type: 'text/csv;charset=utf-8;',
                        }
                    );
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');

                    link.href = url;
                    link.download = `${name}.csv`;
                    link.click();

                    URL.revokeObjectURL(url);
                });

                logger.success(`导出成功`);
            },
            error: (err) => logger.error(`导出失败: ${err}`),
        });
    } else logger.error('导出错误❌');

    return;
}

export { exportUnitable, importUnitable };
