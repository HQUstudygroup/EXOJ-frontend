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
