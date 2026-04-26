<template>
    <div class="w-full min-h-screen bg-[#f5f7fa] p-6 font-sans box-border relative">
        <div v-if="globalMask" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-4"></div>

        <div v-if="showHistoryModal" class="fixed inset-0 z-50 flex items-center justify-center">
            <div class="absolute inset-0 bg-black/50" @click="closeHistoryModal"></div>
            <div
                class="bg-white rounded-xl shadow-2xl w-[750px] p-6 relative z-1 max-h-[80vh] flex flex-col"
            >
                <!-- 已经处理文件列表+ 关闭按钮 -->
                <div class="flex justify-between items-center mb-3">
                    <h2 class="text-lg font-bold m-0">已处理文件列表</h2>
                    <button
                        @click="closeHistoryModal"
                        class="w-7 h-7 flex items-center justify-center rounded-full hover:bg-red-100 text-red-500 transition-colors text-lg"
                    >
                        ×
                    </button>
                </div>

                <div class="flex-1 overflow-y-auto">
                    <div
                        v-for="(item, idx) in processedFiles"
                        :key="idx"
                        class="flex items-center justify-between border-b py-3 px-1"
                    >
                        <input v-model="selectedFiles" :value="item" type="checkbox" class="mr-3" />
                        <div class="flex-1">{{ item.name }}</div>

                        <!-- 按钮组：预览 + 删除 -->
                        <div class="flex gap-2">
                            <button
                                @click="previewProcessed(item)"
                                class="bg-blue-500 text-white px-3 py-1 text-sm rounded"
                            >
                                预览
                            </button>
                            <button
                                @click="deleteProcessedFile(idx)"
                                class="bg-red-500 text-white px-3 py-1 text-sm rounded"
                            >
                                删除
                            </button>
                        </div>
                    </div>
                    <div v-if="processedFiles.length === 0" class="text-gray-400 text-center py-10">
                        暂无已处理文件
                    </div>
                </div>
                <div class="flex justify-end mt-4 pt-3 border-t">
                    <button
                        @click="exportSelected"
                        :disabled="selectedFiles.length === 0"
                        class="bg-yellow-500 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                        导出选中文件
                    </button>
                </div>
            </div>
        </div>

        <div
            v-if="showPreviewModal"
            class="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-50 bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl w-[85%] max-h-[85vh] flex flex-col"
        >
            <div
                class="flex justify-between items-center px-6 py-4 border-b border-gray-100 shrink-0"
            >
                <h3 class="text-lg font-semibold text-gray-800">处理后文件内容预览</h3>
                <button
                    @click="showPreviewModal = false"
                    class="w-7 h-7 flex items-center justify-center rounded-full hover:bg-red-100 text-red-500 transition-colors text-lg"
                >
                    ×
                </button>
            </div>

            <div class="flex-1 overflow-auto p-6">
                <div class="overflow-x-auto rounded-xl border border-gray-200">
                    <table class="w-full border-collapse text-sm">
                        <thead>
                            <tr>
                                <th
                                    v-for="(cell, cIdx) in previewHead"
                                    :key="cIdx"
                                    class="bg-blue-50 border border-gray-200 p-3 whitespace-nowrap font-medium text-gray-700"
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
                                    class="border border-gray-200 p-3 whitespace-nowrap hover:bg-gray-50 transition-colors"
                                >
                                    {{ cell ?? '-' }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div v-if="showTemplateModal" class="fixed inset-0 z-50 flex items-center justify-center">
            <div class="absolute inset-0 bg-black/50" @click="closeTemplateModal"></div>
            <div class="bg-white rounded-lg shadow-xl w-[500px] z-1 p-6 relative">
                <div class="flex justify-between items-center mb-5">
                    <h2 class="text-xl font-bold m-0">历史模板</h2>
                    <button
                        class="text-xl w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
                        @click="closeTemplateModal"
                    >
                        ×
                    </button>
                </div>
                <div class="max-h-[400px] overflow-y-auto space-y-3">
                    <div
                        v-for="(item, idx) in templateList"
                        :key="idx"
                        class="flex justify-between items-center border p-3 rounded"
                    >
                        <div>{{ item.name }}</div>
                        <div class="flex gap-2">
                            <button
                                class="bg-green-500 text-white px-2 py-1 text-xs rounded"
                                @click="loadTemplateByName(item.name)"
                            >
                                应用
                            </button>
                            <button
                                class="bg-red-500 text-white px-2 py-1 text-xs rounded"
                                @click="deleteTemplate(item.name)"
                            >
                                删除
                            </button>
                        </div>
                    </div>
                    <div v-if="templateList.length === 0" class="text-gray-500 text-center py-5">
                        暂无保存的模板
                    </div>
                </div>
            </div>
        </div>

        <div
            v-if="showUploadHistoryModal"
            class="fixed inset-0 z-50 flex items-center justify-center"
        >
            <div class="absolute inset-0 bg-black/50" @click="closeUploadHistoryModal"></div>
            <div class="bg-white rounded-lg shadow-xl w-[500px] z-1 p-6 relative">
                <div class="flex justify-between items-center mb-5">
                    <h2 class="text-xl font-bold m-0">历史上传文件</h2>
                    <button
                        class="text-xl w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
                        @click="closeUploadHistoryModal"
                    >
                        ×
                    </button>
                </div>
                <div class="max-h-[400px] overflow-y-auto space-y-3">
                    <div
                        v-for="(fileName, idx) in uploadHistoryList"
                        :key="idx"
                        class="flex justify-between items-center border p-3 rounded"
                    >
                        <div class="text-sm truncate flex-1">{{ fileName }}</div>
                        <div class="flex gap-2">
                            <button
                                class="bg-green-500 text-white px-2 py-1 text-xs rounded"
                                @click="applyHistoryFile(fileName)"
                            >
                                应用
                            </button>
                            <button
                                class="bg-red-500 text-white px-2 py-1 text-xs rounded"
                                @click="deleteUploadHistory(idx)"
                            >
                                删除
                            </button>
                        </div>
                    </div>
                    <div
                        v-if="uploadHistoryList.length === 0"
                        class="text-gray-500 text-center py-5"
                    >
                        暂无历史上传文件
                    </div>
                </div>
            </div>
        </div>

        <div class="text-xl font-bold bg-white rounded-lg p-4 mb-6">文件格式标准化</div>

        <div class="flex w-full gap-6">
            <div class="w-[48%] bg-white rounded-lg shadow-sm p-6">
                <div class="text-base font-bold border-b border-gray-200 pb-3 mb-5">
                    自定义列格式模板
                </div>
                <div class="mb-5">
                    <label class="block text-sm mb-2">模板名称</label>
                    <input
                        v-model="templateName"
                        class="w-[90%] p-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="请输入模板名称"
                    />
                </div>
                <div class="font-medium text-sm my-5">列字段格式配置</div>
                <div class="flex bg-gray-50 font-medium text-sm">
                    <div class="flex-1 p-3">列序号</div>
                    <div class="flex-1 p-3">字段名称</div>
                    <div class="flex-1 p-3">数据类型</div>
                    <div class="flex-1 p-3">格式规则</div>
                    <div class="flex-1 p-3">操作</div>
                </div>
                <div class="border border-gray-200 border-t-0">
                    <div
                        class="flex border-t border-gray-200 items-center"
                        v-for="(col, idx) in columns"
                        :key="idx"
                    >
                        <div class="flex-1 p-3 text-sm">{{ idx + 1 }}</div>
                        <div class="flex-1 p-3">
                            <select
                                v-model="col.field"
                                class="w-full p-1 border border-gray-300 rounded-lg text-sm"
                            >
                                <option value="">请选择字段</option>
                                <option v-for="name in extractedFields" :key="name" :value="name">
                                    {{ name }}
                                </option>
                            </select>
                        </div>
                        <div class="flex-1 p-3">
                            <select
                                v-model="col.type"
                                @click="onTypeChange(col)"
                                class="w-full p-1 border border-gray-300 rounded-lg text-sm"
                            >
                                <option value="string">文本</option>
                                <option value="number">数字</option>
                                <option value="money">财务金额</option>
                                <option value="date">日期</option>
                                <option value="boolean">状态布尔</option>
                            </select>
                        </div>
                        <div class="flex-1 p-3">
                            <div v-if="col.type === 'string'" class="flex gap-1">
                                <select
                                    v-model="col.fontFamily"
                                    class="w-[55%] p-1 border rounded-lg text-sm"
                                >
                                    <option value="宋体">宋体</option>
                                    <option value="微软雅黑">微软雅黑</option>
                                    <option value="黑体">黑体</option>
                                    <option value="仿宋_GB2312">仿宋</option>
                                    <option value="Arial">Arial</option>
                                    <option value="Times New Roman">Times New Roman</option>
                                    <option value="楷体_GB2312">楷体</option>
                                </select>
                                <select
                                    v-model="col.fontSize"
                                    class="w-[45%] p-1 border rounded-lg text-sm"
                                >
                                    <option value="9">9pt</option>
                                    <option value="10">10pt</option>
                                    <option value="11">11pt</option>
                                    <option value="12">12pt</option>
                                    <option value="14">14pt</option>
                                    <option value="16">16pt</option>
                                    <option value="18">18pt</option>
                                    <option value="20">20pt</option>
                                </select>
                            </div>
                            <div v-else-if="col.type === 'number'" class="flex gap-1">
                                <select
                                    v-model="col.numType"
                                    class="w-[55%] p-1 border rounded-lg text-sm"
                                >
                                    <option value="int">整数</option>
                                    <option value="decimal">小数</option>
                                    <option value="percent">百分数</option>
                                </select>
                                <select
                                    v-if="col.numType === 'decimal' || col.numType === 'percent'"
                                    v-model="col.decimalDigits"
                                    class="w-[45%] p-1 border rounded-lg text-sm"
                                >
                                    <option value="0">0位</option>
                                    <option value="1">1位</option>
                                    <option value="2">2位</option>
                                    <option value="3">3位</option>
                                    <option value="4">4位</option>
                                </select>
                            </div>
                            <div v-else-if="col.type === 'money'" class="flex flex-col gap-1">
                                <label class="flex items-center text-xs gap-1">
                                    <input type="checkbox" v-model="col.cleanMoneyUnit" />
                                    自动清除￥/元/万/空格脏字符
                                </label>
                                <select
                                    v-model="col.moneyFormat"
                                    class="p-1 border rounded-lg text-xs"
                                >
                                    <option value="lower">标准小写金额</option>
                                    <option value="upper">财务规范人民币大写</option>
                                </select>
                            </div>
                            <select
                                v-else-if="col.type === 'date'"
                                v-model="col.rule"
                                class="w-full p-1 border rounded-lg text-sm"
                            >
                                <option value="YYYY-MM-DD">YYYY-MM-DD 标准国标</option>
                                <option value="YYYY/MM/DD">YYYY/MM/DD</option>
                                <option value="MM-DD-YYYY">MM-DD-YYYY</option>
                            </select>
                            <select
                                v-else-if="col.type === 'boolean'"
                                v-model="col.rule"
                                class="w-full p-1 border rounded-lg text-sm"
                            >
                                <option value="是/否">是/否</option>
                                <option value="√/×">√/×</option>
                                <option value="TRUE/FALSE">TRUE/FALSE</option>
                            </select>
                        </div>
                        <div class="flex-1 p-3">
                            <button
                                @click="delCol(idx)"
                                class="bg-red-500 text-white px-2 py-1 rounded-lg text-xs"
                            >
                                删除
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 按钮：添加列配置（左）+ 清空列配置（右），同历史模板底色 -->
                <div class="flex gap-3 mt-5">
                    <button
                        @click="addCol"
                        class="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm"
                    >
                        添加列配置
                    </button>
                    <button
                        @click="clearColumns"
                        class="bg-gray-700 text-white px-3 py-2 rounded-lg text-sm"
                    >
                        清空列配置
                    </button>
                </div>

                <div class="flex gap-4 mt-5 items-center">
                    <button
                        @click="saveTemplate"
                        class="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm"
                    >
                        保存格式模板
                    </button>
                    <button
                        @click="openTemplateModal"
                        class="bg-gray-700 text-white px-3 py-2 rounded-lg text-sm"
                    >
                        历史模板
                    </button>
                    <span v-if="saveSuccessMsg" class="text-green-600 text-sm whitespace-nowrap">
                        模板保存成功
                    </span>
                </div>
            </div>

            <div class="w-[48%] bg-white rounded-lg shadow-sm p-6">
                <div class="text-base font-bold border-b border-gray-200 pb-3 mb-5">
                    文件格式标准化处理
                </div>
                <div
                    @click="handleFileClick"
                    class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-all"
                >
                    <p class="mb-2">点击上传 Excel / CSV 文件</p>
                    <p class="text-xs text-gray-500">确保上传文件无表头，仅有列名和列信息</p>
                    <input
                        ref="fileInput"
                        type="file"
                        accept=".xlsx,.xls,.csv"
                        class="hidden"
                        @change="handleFileChange"
                    />
                </div>
                <div class="text-sm mb-4" v-if="fileNames.length">
                    <div v-for="(n, i) in fileNames" :key="i">{{ n }}</div>
                </div>
                <div class="flex gap-3 flex-wrap mt-5">
                    <button
                        @click="openUploadHistoryModal"
                        class="bg-purple-500 text-white px-3 py-2 rounded-lg"
                    >
                        历史文件
                    </button>
                    <button
                        :disabled="!files.length"
                        @click="openPreview"
                        class="bg-blue-500 text-white px-3 py-2 rounded-lg disabled:opacity-50"
                    >
                        预览原始数据
                    </button>
                    <button
                        :disabled="!canProcess"
                        @click="startProcess"
                        class="bg-green-500 text-white px-3 py-2 rounded-lg disabled:opacity-50"
                    >
                        一键格式标准化
                    </button>
                    <button
                        @click="openHistoryModal"
                        class="bg-yellow-500 text-white px-3 py-2 rounded-lg"
                    >
                        已处理导出
                    </button>
                </div>
                <div class="text-sm font-medium my-4">处理进度</div>
                <div class="h-2 bg-gray-200 rounded-full overflow-hidden" v-if="processing">
                    <div
                        class="h-full bg-green-500 transition-all duration-300"
                        :style="{ width: progress + '%' }"
                    ></div>
                </div>
                <div class="text-green-600 my-3" v-if="done">✅ 格式标准化完成</div>
                <div class="text-red-600 my-3" v-if="errMsg" v-text="errMsg"></div>
            </div>
        </div>

        <div
            v-if="showPreview"
            class="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-50 bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl w-[85%] max-h-[85vh] flex flex-col"
        >
            <div
                class="flex justify-between items-center px-6 py-4 border-b border-gray-100 shrink-0"
            >
                <h3 class="text-lg font-semibold text-gray-800">原始文件内容预览</h3>
                <button
                    @click="closePreview"
                    class="w-7 h-7 flex items-center justify-center rounded-full hover:bg-red-100 text-red-500 transition-colors text-lg"
                >
                    ×
                </button>
            </div>
            <div class="flex-1 overflow-auto p-6">
                <div class="overflow-x-auto rounded-xl border border-gray-200">
                    <table class="w-full border-collapse text-sm">
                        <thead>
                            <tr>
                                <th
                                    v-for="(cell, cIdx) in originalData[0]"
                                    :key="cIdx"
                                    class="bg-blue-50 border border-gray-200 p-3 whitespace-nowrap font-medium text-gray-700"
                                >
                                    {{ cell }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, rIdx) in originalData.slice(1)" :key="rIdx">
                                <td
                                    v-for="(cell, cIdx) in row"
                                    :key="cIdx"
                                    class="border border-gray-200 p-3 whitespace-nowrap hover:bg-gray-50 transition-colors"
                                >
                                    {{ cell ?? '-' }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import * as XLSX from 'xlsx';

const templateName = ref('');
const columns = ref([
    {
        field: '',
        type: 'string',
        fontFamily: '微软雅黑',
        fontSize: 12,
        numType: 'int',
        decimalDigits: 2,
        cleanMoneyUnit: true,
        moneyFormat: 'lower',
        rule: 'YYYY-MM-DD',
    },
]);

const fileInput = ref(null);
const files = ref([]);
const fileNames = ref([]);
const extractedFields = ref([]);
const originalData = ref([]);
const resultWB = ref(null);
const processing = ref(false);
const progress = ref(0);
const done = ref(false);
const errMsg = ref('');
const showPreview = ref(false);
const saveSuccessMsg = ref(false);
const showTemplateModal = ref(false);
const templateList = ref([]);

// 已处理文件（本地存储持久化）
const processedFiles = ref([]);
const showHistoryModal = ref(false);
const selectedFiles = ref([]);
const showPreviewModal = ref(false);
const previewHead = ref([]);
const previewBody = ref([]);
const globalMask = ref(false);

const showUploadHistoryModal = ref(false);
const uploadHistoryList = ref([]);

// 页面加载时读取本地已处理文件
onMounted(() => {
    const saved = localStorage.getItem('processedFiles');
    if (saved) {
        processedFiles.value = JSON.parse(saved);
    }
});

// 保存到本地
const saveToLocal = () => {
    localStorage.setItem('processedFiles', JSON.stringify(processedFiles.value));
};

// 辅助：根据原文件名获取下一个序号
const getNextFileIndex = (baseName) => {
    let maxIndex = 0;
    processedFiles.value.forEach((item) => {
        const match = item.name.match(new RegExp(`^${baseName}-标准化(\\d+)(\\.\\w+)$`));
        if (match) {
            const idx = parseInt(match[1], 10);
            if (idx > maxIndex) maxIndex = idx;
        }
    });
    return maxIndex + 1;
};

// 删除后自动重命名**同组文件**，保持连续编号
const reindexGroupFiles = (baseName) => {
    if (processedFiles.value.length === 0) {
        saveToLocal();
        return;
    }

    // 筛选出同组的文件
    const groupFiles = processedFiles.value.filter((item) => {
        const match = item.name.match(new RegExp(`^${baseName}-标准化\\d+(\\.\\w+)$`));
        return !!match;
    });

    // 按顺序重命名
    groupFiles.forEach((item, index) => {
        const match = item.name.match(new RegExp(`^${baseName}-标准化\\d+(\\.\\w+)$`));
        if (match) {
            const ext = match[1];
            item.name = `${baseName}-标准化${index + 1}${ext}`;
        }
    });

    saveToLocal();
};

const loadUploadHistory = () => {
    const history = JSON.parse(localStorage.getItem('upload-file-history') || '[]');
    uploadHistoryList.value = [...new Set(history)];
};

const openUploadHistoryModal = () => {
    loadUploadHistory();
    showUploadHistoryModal.value = true;
    globalMask.value = true;
};

const closeUploadHistoryModal = () => {
    showUploadHistoryModal.value = false;
    globalMask.value = false;
};

const applyHistoryFile = async (fileName) => {
    closeUploadHistoryModal();
    await loadFileFromHistory(fileName);
};

const loadFileFromHistory = async (fileName) => {
    try {
        const base64 = localStorage.getItem('upload-file-base64-' + fileName);
        if (!base64) {
            errMsg.value = '历史文件已失效';
            return;
        }
        const res = await fetch(base64);
        const blob = await res.blob();
        const file = new File([blob], fileName, {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        files.value = [file];
        fileNames.value = [fileName];
        const headers = await readExcelHeaders(file);
        extractedFields.value = headers.filter(Boolean);
        done.value = false;
        errMsg.value = '';
    } catch (e) {
        errMsg.value = '加载历史文件失败';
        console.error(e);
    }
};

const deleteUploadHistory = (idx) => {
    const history = JSON.parse(localStorage.getItem('upload-file-history') || '[]');
    const delName = history[idx];
    history.splice(idx, 1);
    localStorage.setItem('upload-file-history', JSON.stringify(history));
    localStorage.removeItem('upload-file-base64-' + delName);
    loadUploadHistory();
};

const saveUploadHistory = (file) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result;
            const history = JSON.parse(localStorage.getItem('upload-file-history') || '[]');
            history.push(file.name);
            localStorage.setItem('upload-file-history', JSON.stringify([...new Set(history)]));
            localStorage.setItem('upload-file-base64-' + file.name, base64);
            resolve();
        };
        reader.readAsDataURL(file);
    });
};

const canProcess = computed(
    () => templateName.value && files.value.length && columns.value.some((c) => c.field)
);

const addCol = () =>
    columns.value.push({
        field: '',
        type: 'string',
        fontFamily: '微软雅黑',
        fontSize: 12,
        numType: 'int',
        decimalDigits: 2,
        cleanMoneyUnit: true,
        moneyFormat: 'lower',
        rule: 'YYYY-MM-DD',
    });

const delCol = (i) => columns.value.splice(i, 1);

// 清空所有列配置
const clearColumns = () => {
    columns.value = [
        {
            field: '',
            type: 'string',
            fontFamily: '微软雅黑',
            fontSize: 12,
            numType: 'int',
            decimalDigits: 2,
            cleanMoneyUnit: true,
            moneyFormat: 'lower',
            rule: 'YYYY-MM-DD',
        },
    ];
};

const handleFileClick = () => fileInput.value?.click();

const handleFileChange = async (e) => {
    files.value = Array.from(e.target.files);
    fileNames.value = files.value.map((f) => f.name);
    if (files.value.length) {
        await saveUploadHistory(files.value[0]);
    }
    if (!files.value.length) return;
    const f = files.value[0];
    const headers = await readExcelHeaders(f);
    extractedFields.value = headers.filter(Boolean);
    done.value = false;
    errMsg.value = '';
};

const readExcelHeaders = (file) => {
    return new Promise((resolve) => {
        const r = new FileReader();
        r.onload = (e) => {
            const wb = XLSX.read(e.target.result, { type: 'array', cellStyles: true });
            const ws = wb.Sheets[wb.SheetNames[0]];
            const arr = XLSX.utils.sheet_to_json(ws, { header: 1 });
            originalData.value = arr;
            resolve(arr[0] || []);
        };
        r.readAsArrayBuffer(file);
    });
};

const onTypeChange = (col) => {
    if (col.type === 'string') {
        col.fontFamily = '微软雅黑';
        col.fontSize = 12;
    }
    if (col.type === 'number') {
        col.numType = 'int';
        col.decimalDigits = 2;
    }
    if (col.type === 'money') {
        col.cleanMoneyUnit = true;
        col.moneyFormat = 'lower';
    }
    if (col.type === 'date') col.rule = 'YYYY-MM-DD';
    if (col.type === 'boolean') col.rule = '是/否';
};

const numberToChineseUpper = (num) => {
    if (isNaN(num) || num === 0) return '零元整';
    const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    const unit = ['', '拾', '佰', '仟', '万', '拾', '佰', '仟', '亿'];
    const int = Math.floor(Math.abs(num));
    const dec = Math.round((Math.abs(num) - int) * 100);
    let s = int.toString().split('').reverse().join('');
    let r = '';
    for (let i = 0; i < s.length; i++) r = digit[+s[i]] + unit[i] + r;
    r += '元';
    if (dec >= 10) r += digit[Math.floor(dec / 10)] + '角';
    if (dec % 10 !== 0) r += digit[dec % 10] + '分';
    else if (dec === 0) r += '整';
    return num < 0 ? `负${r}` : r;
};

const formatCell = (val, col) => {
    if (val == null || val === '') return '';
    let v = String(val).trim();
    if (col.type === 'string') return v;

    if (col.type === 'number') {
        const n = +v.replace(/[^\d.-]/g, '') || 0;
        if (col.numType === 'int') return parseInt(n);
        if (col.numType === 'decimal') return n.toFixed(col.decimalDigits);
        if (col.numType === 'percent') return (n * 100).toFixed(col.decimalDigits) + '%';
    }

    if (col.type === 'money') {
        if (col.cleanMoneyUnit) v = v.replace(/[^\d.-]/g, '');
        const n = +v || 0;
        return col.moneyFormat === 'upper' ? numberToChineseUpper(n) : n.toFixed(2);
    }

    if (col.type === 'date') {
        try {
            const clean = v.replace(/\./g, '-');
            const d = new Date(clean);
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, '0');
            const d2 = String(d.getDate()).padStart(2, '0');
            return col.rule === 'YYYY-MM-DD' ? `${y}-${m}-${d2}` : `${y}/${m}/${d2}`;
        } catch {
            return v;
        }
    }

    if (col.type === 'boolean') {
        const keepList = ['—', '——', '-', '--'];
        if (keepList.includes(v)) return val;
        const [yes, no] = col.rule.split('/');
        const trueArr = ['是', 'true', 'TRUE', '1', '√'];
        const falseArr = ['否', 'false', 'FALSE', '0', '×'];
        if (trueArr.includes(v)) return yes;
        if (falseArr.includes(v)) return no;
        return val;
    }
    return v;
};

const startProcess = () => {
    if (!originalData.value.length) {
        errMsg.value = '无数据可处理';
        return;
    }
    processing.value = true;
    done.value = false;
    progress.value = 0;
    const data = JSON.parse(JSON.stringify(originalData.value));
    const headers = data[0] || [];

    setTimeout(() => {
        for (let row = 1; row < data.length; row++) {
            const r = data[row];
            columns.value.forEach((col) => {
                const idx = headers.findIndex((h) => h === col.field);
                if (idx !== -1 && r[idx] != null) r[idx] = formatCell(r[idx], col);
            });
            progress.value = (row / data.length) * 100;
        }

        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, '标准化结果');

        const originalName = files.value[0]?.name || '未命名文件';
        const dotIndex = originalName.lastIndexOf('.');
        let baseName = dotIndex !== -1 ? originalName.slice(0, dotIndex) : originalName;
        let ext = dotIndex !== -1 ? originalName.slice(dotIndex) : '';

        // 关键修改：按原文件名分组计数，而不是全局计数
        const newNum = getNextFileIndex(baseName);
        const finalName = `${baseName}-标准化${newNum}${ext}`;

        const fileItem = { name: finalName, data };
        processedFiles.value.push(fileItem);

        saveToLocal();
        resultWB.value = wb;
        processing.value = false;
        done.value = true;
        progress.value = 100;
    }, 600);
};

// 删除已处理文件，并自动重命名**同组文件**，保持连续编号
const deleteProcessedFile = (idx) => {
    const item = processedFiles.value[idx];
    processedFiles.value.splice(idx, 1);

    // 提取原文件baseName，重命名同组文件
    const match = item.name.match(/^(.*?)-标准化\d+(\.\w+)$/);
    if (match) {
        const baseName = match[1];
        reindexGroupFiles(baseName);
    } else {
        saveToLocal();
    }
};

const openPreview = () => {
    showPreview.value = true;
    globalMask.value = true;
};
const closePreview = () => {
    showPreview.value = false;
    globalMask.value = false;
};

const openHistoryModal = () => {
    showHistoryModal.value = true;
    globalMask.value = true;
};
const closeHistoryModal = () => {
    showHistoryModal.value = false;
    globalMask.value = false;
};

const previewProcessed = (item) => {
    previewHead.value = item.data[0] || [];
    previewBody.value = item.data.slice(1) || [];
    showPreviewModal.value = true;
};

const exportSelected = () => {
    selectedFiles.value.forEach((item) => {
        const ws = XLSX.utils.aoa_to_sheet(item.data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, item.name);
    });
};

const openTemplateModal = () => {
    templateList.value = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('excel-template-')) {
            templateList.value.push({ name: key.replace('excel-template-', '') });
        }
    }
    showTemplateModal.value = true;
    globalMask.value = true;
};
const closeTemplateModal = () => {
    showTemplateModal.value = false;
    globalMask.value = false;
};

const loadTemplateByName = (name) => {
    const data = localStorage.getItem('excel-template-' + name);
    if (data) {
        columns.value = JSON.parse(data);
        templateName.value = name;
        closeTemplateModal();
    }
};
const deleteTemplate = (name) => {
    localStorage.removeItem('excel-template-' + name);
    openTemplateModal();
};
const saveTemplate = () => {
    if (!templateName.value) {
        errMsg.value = '请输入模板名称';
        setTimeout(() => {
            errMsg.value = '';
        }, 3000);
        return;
    }
    localStorage.setItem('excel-template-' + templateName.value, JSON.stringify(columns.value));
    saveSuccessMsg.value = true;
    setTimeout(() => (saveSuccessMsg.value = false), 2000);
};
</script>
