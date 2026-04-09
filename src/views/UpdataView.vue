<template>
    <div class="data-page">
        <!-- 顶部返回按钮 -->
        <div class="top-back">
            <n-button quaternary @click="goBack">
                <template #icon>
                    <n-icon><ArrowBackOutline /></n-icon>
                </template>
                进入数易办公
            </n-button>
        </div>

        <!-- 页面头部：标题 + 操作按钮 -->
        <div class="page-header">
            <h2 class="page-title">数易办公-案例数据集</h2>
            <div class="header-actions">
                <n-button quaternary style="margin-right: 12px">
                    <template #icon>
                        <n-icon><DocumentTextOutline /></n-icon>
                    </template>
                    上传说明
                </n-button>
                <n-button type="primary">
                    <template #icon>
                        <n-icon><CloudUploadOutline /></n-icon>
                    </template>
                    上传数据
                </n-button>
            </div>
        </div>

        <!-- 正在分析区域 -->
        <div class="section">
            <div class="section-title">
                <n-icon size="20" style="margin-right: 8px; color: #409eff">
                    <StatsChartOutline />
                </n-icon>
                正在分析
            </div>
            <div class="file-list">
                <div class="file-item" v-for="item in analyzingList" :key="item.id">
                    <div class="file-info">
                        <span class="file-name">{{ item.name }}</span>
                        <n-button quaternary size="small" style="margin-left: 8px">
                            <n-icon><CreateOutline /></n-icon>
                        </n-button>
                    </div>
                    <span class="file-date">{{ item.date }}</span>
                    <div class="file-actions">
                        <n-button size="small" type="tertiary">继续分析</n-button>
                        <n-button quaternary size="small">
                            <n-icon><CopyOutline /></n-icon>
                        </n-button>
                        <n-button quaternary size="small">
                            <n-icon><DownloadOutline /></n-icon>
                        </n-button>
                        <n-button quaternary size="small">
                            <n-icon><DocumentTextOutline /></n-icon>
                        </n-button>
                        <n-button quaternary size="small">
                            <n-icon><TrashOutline /></n-icon>
                        </n-button>
                        <n-button quaternary size="small">
                            <n-icon><ShareOutline /></n-icon>
                        </n-button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 全部文档区域 -->
        <div class="section">
            <div class="section-header">
                <div class="section-title">
                    <n-icon size="20" style="margin-right: 8px; color: #409eff">
                        <FolderOutline />
                    </n-icon>
                    全部文档
                </div>
                <n-input
                    v-model:value="searchKeyword"
                    placeholder="请输入进行搜索"
                    style="width: 280px"
                    :clearable="true"
                >
                    <template #prefix>
                        <n-icon><SearchOutline /></n-icon>
                    </template>
                </n-input>
            </div>
            <div class="file-list">
                <div class="file-item" v-for="item in filteredFileList" :key="item.id">
                    <div class="file-info">
                        <span class="file-name">{{ item.name }}</span>
                        <n-button quaternary size="small" style="margin-left: 8px">
                            <n-icon><CreateOutline /></n-icon>
                        </n-button>
                    </div>
                    <span class="file-date">{{ item.date }}</span>
                    <div class="file-actions">
                        <n-button size="small" type="tertiary">
                            {{ item.actionText }}
                        </n-button>
                        <n-button quaternary size="small">
                            <n-icon><CopyOutline /></n-icon>
                        </n-button>
                        <n-button quaternary size="small">
                            <n-icon><DownloadOutline /></n-icon>
                        </n-button>
                        <n-button quaternary size="small">
                            <n-icon><DocumentTextOutline /></n-icon>
                        </n-button>
                        <n-button quaternary size="small">
                            <n-icon><TrashOutline /></n-icon>
                        </n-button>
                        <n-button quaternary size="small">
                            <n-icon><ShareOutline /></n-icon>
                        </n-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import {
    ArrowBackOutline,
    DocumentTextOutline,
    CloudUploadOutline,
    StatsChartOutline,
    FolderOutline,
    SearchOutline,
    CreateOutline,
    CopyOutline,
    DownloadOutline,
    TrashOutline,
    ShareOutline,
} from '@vicons/ionicons5';

const router = useRouter();

// 返回上一页
const goBack = () => {
    router.back();
};

// 搜索关键词
const searchKeyword = ref('');

// 正在分析列表数据
const analyzingList = ref([
    {
        id: 1,
        name: '计算机类四班学生信息大全',
        date: '2026-04-09',
        actionText: '继续分析',
    },
]);

// 全部文档列表数据
const allFileList = ref([
    {
        id: 1,
        name: '计算机类四班学生信息大全',
        date: '2026-04-09',
        actionText: '开始分析',
    },
]);

// 过滤后的文件列表（搜索功能）
const filteredFileList = computed(() => {
    if (!searchKeyword.value) return allFileList.value;
    return allFileList.value.filter((item) => item.name.includes(searchKeyword.value));
});
</script>

<style scoped>
/* 页面全局样式 */
.data-page {
    width: 100%;
    min-height: 100vh;
    padding: 20px 120px;
    background-color: #ffffff;
    box-sizing: border-box;
    font-family:
        -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* 顶部返回按钮 */
.top-back {
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid #e5e7eb;
}

/* 页面头部 */
.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
}

.page-title {
    font-size: 20px;
    font-weight: 600;
    color: #303133;
    margin: 0;
}

.header-actions {
    display: flex;
    align-items: center;
}

/* 通用区域样式 */
.section {
    margin-bottom: 40px;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
}

.section-title {
    font-size: 18px;
    font-weight: 600;
    color: #303133;
    display: flex;
    align-items: center;
}

/* 文件列表 */
.file-list {
    border-top: 1px solid #e5e7eb;
}

.file-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0;
    border-bottom: 1px solid #f0f0f0;
}

.file-info {
    display: flex;
    align-items: center;
    flex: 1;
}

.file-name {
    font-size: 15px;
    color: #303133;
    font-weight: 500;
}

.file-date {
    font-size: 14px;
    color: #909399;
    flex: 0 0 100px;
    text-align: center;
}

.file-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 0 0 360px;
    justify-content: flex-end;
}
</style>
