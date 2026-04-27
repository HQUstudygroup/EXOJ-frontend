import * as XLSX from 'xlsx';

function readXlsx(file: File): Promise<any[][]> {
    return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target!.result as ArrayBuffer);

            const workbook = XLSX.read(data, { type: 'array' });

            const firstSheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[firstSheetName];

            const json: any[][] = XLSX.utils.sheet_to_json(sheet, {
                header: 1,
                defval: '',
            });

            resolve(json);
        };

        reader.readAsArrayBuffer(file);
    });
}

export default readXlsx;

export function exportXlsx(data: any[][], fileName = '合并结果.xlsx') {
    // 1. 转 sheet
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // 2. 创建 workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // 3. 导出
    XLSX.writeFile(workbook, fileName);
}
