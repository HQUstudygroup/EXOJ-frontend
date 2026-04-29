<template>
    <div class="w-full min-h-full bg-[#f5f7fa] p-6 font-sans box-border flex flex-col h-full gap-2">
        <div class="text-xl font-bold bg-white rounded-lg p-4 mb-3">文件格式标准化</div>

        <div class="w-full h-4/5">
            <div class="bg-white rounded-lg shadow-sm p-6 flex flex-col">
                <div class="text-base font-bold border-b border-gray-200 pb-5">
                    文件格式标准化处理
                </div>
                <n-upload
                    v-model:file-list="fileList"
                    multiple
                    directory-dnd
                    :max="100"
                    accept=".xlsx"
                    :on-change="handleUploadChange"
                    :auto-upload="false"
                    class="upload-custom flex-1 flex flex-col [&_.n-upload-file-list]:max-h-66 [&_.n-upload-file-list]:overflow-scroll [&_.n-upload-file-list::-webkit-scrollbar]:w-5px [&_.n-upload-file-list::-webkit-scrollbar-thumb]:rounded-5px [&_.n-upload-file-list::-webkit-scrollbar-thumb]:bg-black/30"
                >
                    <n-upload-dragger
                        class="bg-blue-50 !border-2 border-dashed border-blue-300 hover:bg-blue-100 hover:border-blue-400 transition-all duration-200 rounded-lg py-6"
                    >
                        <div class="mb-3 flex justify-center">
                            <n-icon size="48" :depth="3">
                                <ArchiveIcon />
                            </n-icon>
                        </div>

                        <n-text class="text-base font-medium text-gray-700 block text-center">
                            点击或者拖动文件到该区域来上传
                        </n-text>

                        <n-p depth="4" class="mt-1 text-xs text-gray-400 text-center">
                            请保证每个文件表头一致，否则标准化可能会有错误(目前仅支持.xlsx格式)
                        </n-p>
                    </n-upload-dragger>
                </n-upload>
                <div class="flex gap-3 flex-wrap">
                    <n-button type="info" :disabled="!files.length" @click="openPreview">
                        预览原始数据
                    </n-button>
                    <n-button type="success" :disabled="!canProcess" @click="startProcess">
                        一键格式标准化
                    </n-button>
                    <n-button type="warning" @click="openHistoryModal"> 预览&导出 </n-button>
                    <n-button type="primary" @click="showTemplateModal = true">
                        配置格式模板
                    </n-button>

                    <ConfigurationPanel
                        v-model:show="showTemplateModal"
                        v-model:columns="columns"
                        :extracted-fields="extractedFields"
                    />
                </div>
                <div v-if="processing || done" class="text-sm font-medium my-5">处理进度</div>
                <n-progress
                    v-if="processing || done"
                    type="line"
                    :percentage="progress"
                    indicator-placement="inside"
                    :rail-color="'#e0e7ff'"
                    :fill-color="'#3b82f6'"
                />

                <n-alert v-if="done" type="success" class="mt-3"> 格式标准化完成 </n-alert>
                <div class="text-red-600 my-3" v-if="errMsg" v-text="errMsg"></div>
            </div>
        </div>

        <n-modal
            v-model:show="showPreview"
            preset="card"
            title="原始文件内容预览"
            class="w-[85%] max-h-[85vh]"
            :bordered="false"
        >
            <div class="overflow-auto max-h-[75vh]">
                <div class="overflow-x-auto rounded-xl border border-gray-200">
                    <div class="mb-3 flex items-center gap-3">
                        <span class="text-sm text-gray-500">选择文件：</span>

                        <n-select
                            v-model:value="previewFileIndex"
                            :options="fileNames.map((name, idx) => ({ label: name, value: idx }))"
                            size="small"
                            class="w-[300px]"
                        />
                    </div>
                    <table class="w-full border-collapse text-sm">
                        <thead>
                            <tr>
                                <th
                                    v-for="(cell, cIdx) in (originalDataList[previewFileIndex] ||
                                        [])[0]"
                                    :key="cIdx"
                                    class="bg-blue-50 border border-gray-200 p-3 whitespace-nowrap font-medium text-gray-700 text-center"
                                >
                                    {{ cell }}
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr
                                v-for="(row, rIdx) in (
                                    originalDataList[previewFileIndex] || []
                                ).slice(1)"
                                :key="rIdx"
                            >
                                <td
                                    v-for="(cell, cIdx) in row"
                                    :key="cIdx"
                                    class="border border-gray-200 p-3 whitespace-nowrap hover:bg-gray-50 transition-colors text-center"
                                >
                                    {{ formatPreviewCell(cell) || '-' }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </n-modal>
        <n-modal
            v-model:show="showHistoryModal"
            preset="card"
            title="处理结果"
            class="w-[750px] max-h-[80vh]"
            :bordered="false"
        >
            <div class="max-h-[65vh] overflow-y-auto">
                <div
                    v-for="(item, idx) in processedFiles"
                    :key="idx"
                    class="flex items-center justify-between border-b py-3 px-1"
                >
                    <div class="flex-1">{{ item.name }}</div>
                    <div class="flex gap-2">
                        <n-button size="small" type="info" @click="previewProcessed(item)">
                            预览
                        </n-button>
                        <n-modal
                            v-model:show="showFilePreviewModal"
                            preset="card"
                            title="文件预览"
                            class="w-[85%] max-h-[85vh]"
                            :bordered="false"
                        >
                            <div class="overflow-auto max-h-[70vh]">
                                <div class="overflow-x-auto rounded-xl border border-gray-200">
                                    <table class="w-full border-collapse text-sm">
                                        <thead>
                                            <tr>
                                                <th
                                                    v-for="(cell, cIdx) in previewHead"
                                                    :key="cIdx"
                                                    class="bg-blue-50 border border-gray-200 p-3 whitespace-nowrap font-medium text-gray-700 text-center"
                                                >
                                                    {{ cell }}
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr v-for="(row, rIdx) in previewBody" :key="rIdx">
                                                <td
                                                    v-for="(cell, cIdx) in row"
                                                    :key="cIdx"
                                                    class="border border-gray-200 p-3 whitespace-nowrap hover:bg-gray-50 transition-colors text-center"
                                                >
                                                    {{ formatPreviewCell(cell) || '-' }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </n-modal>

                        <n-button size="small" type="success" @click="exportSingleFile(item)">
                            导出
                        </n-button>
                    </div>
                </div>

                <div v-if="processedFiles.length === 0" class="text-gray-400 text-center py-10">
                    暂无处理结果
                </div>
            </div>
        </n-modal>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import * as XLSX from 'xlsx';
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5';
import ExcelJS from 'exceljs';
import ConfigurationPanel from '@/components/DocumentStandardization/ConfigurationPanel.vue';

// 列配置类型定义
export interface ColumnConfig {
    field: string;
    type: 'string' | 'number' | 'money' | 'date' | 'boolean';
    fontFamily: string;
    fontSize: number;
    numType: 'int' | 'decimal' | 'percent';
    decimalDigits: number;
    cleanMoneyUnit: boolean;
    moneyFormat?: 'lower' | 'upper';
    rule: string;
}

// 处理后文件类型
interface ProcessedFile {
    name: string;
    data: any[][];
}

// Naive UI Upload 类型
interface UploadFileInfo {
    file?: File;
    [key: string]: any;
}

const showTemplateModal = ref(false);
const fileList = ref<UploadFileInfo[]>([]);
const files = ref<File[]>([]);
const fileNames = ref<string[]>([]);

const extractedFields = ref<string[]>([]);

const processing = ref(false);
const progress = ref(0);
const done = ref(false);
const errMsg = ref('');

const processedFiles = ref<ProcessedFile[]>([]);

const showPreview = ref(false);
const showHistoryModal = ref(false);
const showFilePreviewModal = ref(false);

const previewHead = ref<string[]>([]);
const previewBody = ref<any[][]>([]);

const templateLocked = ref(false);
const originalDataList = ref<any[][]>([]);
const previewFileIndex = ref(0);

const columns = ref<ColumnConfig[]>([
    {
        field: null as any,
        type: 'string',
        fontFamily: '微软雅黑',
        fontSize: 12,
        numType: 'int',
        decimalDigits: 2,
        cleanMoneyUnit: true,
        moneyFormat: 'upper',
        rule: 'YYYY-MM-DD',
    },
]);

const cleanHeader = (h: any): string =>
    String(h || '')
        .trim()
        .replace(/\s+/g, '');

const canProcess = computed(() => {
    return files.value.length > 0 && columns.value.some((c) => c.field);
});

const handleUploadChange = async ({ fileList: fl }: { fileList: UploadFileInfo[] }) => {
    fileList.value = fl;

    const rawFiles = fl.map((f) => f.file).filter(Boolean) as File[];
    files.value = rawFiles;
    fileNames.value = rawFiles.map((f) => f.name);

    if (!rawFiles.length) return;

    const allData = await Promise.all(rawFiles.map(readExcel));
    originalDataList.value = allData;

    previewFileIndex.value = 0;

    const headers = (allData[0]?.[0] || []).map(cleanHeader);
    extractedFields.value = headers;
    templateLocked.value = true;

    done.value = false;
    errMsg.value = '';
};

const readExcel = (file: File): Promise<any[][]> => {
    return new Promise((resolve) => {
        const r = new FileReader();

        r.onload = (e) => {
            const wb = XLSX.read(e.target?.result, { type: 'array' });
            const ws = wb.Sheets[wb.SheetNames[0]];
            const arr = XLSX.utils.sheet_to_json(ws, { header: 1 });
            resolve(arr as any[][]);
        };

        r.readAsArrayBuffer(file);
    });
};

const numberToChineseUpper = (num: number): string => {
    if (isNaN(num) || num === 0) return '零元整';

    const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    const unit = ['', '拾', '佰', '仟', '万', '拾', '佰', '仟', '亿'];

    const int = Math.floor(Math.abs(num));
    const dec = Math.round((Math.abs(num) - int) * 100);

    let s = int.toString().split('').reverse().join('');
    let r = '';

    for (let i = 0; i < s.length; i++) {
        r = digit[+s[i]] + unit[i] + r;
    }

    r += '元';

    if (dec >= 10) r += digit[Math.floor(dec / 10)] + '角';
    if (dec % 10 !== 0) r += digit[dec % 10] + '分';
    else r += '整';

    return num < 0 ? `负${r}` : r;
};

const formatCell = (val: any, col: ColumnConfig): any => {
    if (val == null || val === '') return '';

    let v = String(val).trim();

    if (col.type === 'string') return v;

    if (col.type === 'number') {
        const n = +v.replace(/[^\d.-]/g, '') || 0;

        if (col.numType === 'int') return parseInt(n.toString());
        if (col.numType === 'decimal') return n.toFixed(col.decimalDigits);
        if (col.numType === 'percent') return (n * 100).toFixed(col.decimalDigits) + '%';
    }

    if (col.type === 'money') {
        if (col.cleanMoneyUnit) v = v.replace(/[^\d.-]/g, '');
        const n = +v || 0;

        return col.moneyFormat === 'upper' ? numberToChineseUpper(n) : n.toFixed(2);
    }

    if (col.type === 'date') {
        const d = new Date(v.replace(/\./g, '-'));
        if (isNaN(d.getTime())) return v;

        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const d2 = String(d.getDate()).padStart(2, '0');

        return col.rule === 'YYYY-MM-DD' ? `${y}-${m}-${d2}` : `${y}/${m}/${d2}`;
    }
    if (col.type === 'boolean') {
        const isChecked = /^(√|✓|✔|☑|✅|是|true|TRUE|True)$/i.test(v);

        let result = '';
        if (col.rule === '是/否') {
            result = isChecked ? '是' : '否';
        } else if (col.rule === 'TRUE/FALSE') {
            result = isChecked ? 'TRUE' : 'FALSE';
        } else {
            result = isChecked ? '是' : '否';
        }

        return result;
    }

    return v;
};

const startProcess = async () => {
    if (!files.value.length) {
        errMsg.value = '无文件可处理';
        return;
    }

    if (!columns.value.length) {
        errMsg.value = '未配置列规则';
        return;
    }

    processing.value = true;
    done.value = false;
    progress.value = 0;

    processedFiles.value = [];

    let finished = 0;

    for (const file of files.value) {
        const data = await readExcel(file);

        const headers = (data[0] || []).map(cleanHeader);

        const headerIndexMap = new Map<string, number>();
        headers.forEach((h, i) => {
            headerIndexMap.set(h, i);
        });

        const newData = JSON.parse(JSON.stringify(data)) as any[][];

        for (let row = 1; row < newData.length; row++) {
            const r = newData[row];

            columns.value.forEach((col) => {
                const idx = headerIndexMap.get(cleanHeader(col.field));

                if (idx !== undefined && r[idx] != null) {
                    r[idx] = formatCell(r[idx], col);
                }
            });
        }

        const originalName = file.name;
        const dotIndex = originalName.lastIndexOf('.');
        const baseName = dotIndex !== -1 ? originalName.slice(0, dotIndex) : originalName;
        const ext = dotIndex !== -1 ? originalName.slice(dotIndex) : '';

        const finalName = `${baseName}-标准化${processedFiles.value.length + 1}${ext}`;

        processedFiles.value.push({
            name: finalName,
            data: newData,
        });

        finished++;
        progress.value = Math.round((finished / files.value.length) * 100);
    }

    processing.value = false;
    done.value = true;
    progress.value = 100;
};

const openPreview = () => {
    previewFileIndex.value = 0;
    showPreview.value = true;
};

const openHistoryModal = () => {
    showHistoryModal.value = true;
};

const previewProcessed = (item: ProcessedFile) => {
    previewHead.value = item.data[0] || [];
    previewBody.value = item.data.slice(1) || [];
    showFilePreviewModal.value = true;
};

const exportSingleFile = async (item: ProcessedFile) => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('标准化结果');

    const headers = item.data[0];
    const body = item.data.slice(1);

    const headerRow = sheet.addRow(headers);

    headerRow.eachCell((cell) => {
        cell.font = {
            bold: true,
            name: '微软雅黑',
            size: 12,
        };

        cell.alignment = {
            vertical: 'middle',
            horizontal: 'center',
        };
    });

    body.forEach((row) => {
        const r = sheet.addRow(row);

        r.eachCell((cell, colNumber) => {
            const headerName = headers[colNumber - 1];
            const colConfig = columns.value.find(
                (c) => cleanHeader(c.field) === cleanHeader(headerName)
            );
            if (!colConfig) return;

            if (colConfig.type === 'string') {
                cell.font = {
                    name: colConfig.fontFamily || '微软雅黑',
                    size: Number(colConfig.fontSize) || 12,
                };
            }

            if (colConfig.type === 'number') {
                cell.numFmt =
                    colConfig.numType === 'percent'
                        ? '0.00%'
                        : colConfig.numType === 'decimal'
                          ? '0.00'
                          : '0';
            }

            if (colConfig.type === 'money') {
                cell.numFmt = '#,##0.00';
            }
            if (colConfig.type === 'boolean') {
                cell.font = {
                    name: '微软雅黑',
                    size: 12,
                };
            }

            cell.alignment = {
                vertical: 'middle',
                horizontal: 'left',
            };
        });
    });

    sheet.columns = headers.map(() => ({ width: 20 }));

    const buffer = await workbook.xlsx.writeBuffer();

    const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = item.name;
    link.click();
};
const excelDateToJSDate = (num: number) => {
    const base = new Date(1899, 11, 30);
    return new Date(base.getTime() + num * 86400000);
};
const formatPreviewCell = (val: any) => {
    if (val == null || val === '') return '';

    const num = Number(val);
    if (!isNaN(num)) {
        if (num > 30000 && num < 60000) {
            const d = excelDateToJSDate(num);

            if (!isNaN(d.getTime())) {
                const y = d.getFullYear();
                const m = String(d.getMonth() + 1).padStart(2, '0');
                const d2 = String(d.getDate()).padStart(2, '0');

                return `${y}-${m}-${d2}`;
            }
        }
    }

    return val;
};
</script>
