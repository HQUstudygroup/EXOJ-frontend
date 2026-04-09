<template>
    <!-- 最外层页面容器 -->
    <div class="upload-page">
        <div class="top-bar">
            <n-button quaternary @click="goBack">
                <template #icon>
                    <n-icon>
                        <ArrowBackOutline />
                    </n-icon>
                </template>
                ⇦ 返回
            </n-button>
            <n-button type="primary" style="margin-left: auto" @click="goToMain"
                >进入数易办公</n-button
            >
        </div>
        <!-- 步骤进度条 -->
        <div class="steps-bar">
            <div class="step active">
                <span class="step-num">1</span>
                <span class="step-text">上传文件</span>
            </div>
            <div class="step-line"></div>
            <div class="step">
                <span class="step-num">2</span>
                <span class="step-text">数据预览</span>
            </div>
        </div>

        <!-- 主体内容区：上传框 + 说明 -->
        <div class="content-wrapper">
            <!-- 左侧：上传文件框 -->
            <div class="upload-box">
                <n-upload
                    multiple
                    directory-dnd
                    action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                    :max="5"
                >
                    <n-upload-dragger>
                        <div style="margin-bottom: 12px">
                            <n-icon size="48" :depth="3">
                                <ArchiveIcon />
                            </n-icon>
                        </div>
                        <n-text style="font-size: 16px; font-weight: 500">
                            点击或者拖动文件到该区域来上传
                        </n-text>
                        <n-p depth="3" style="margin: 8px 0 0 0; font-size: 14px; color: #909399">
                            支持Word、Excel、Pdf文件
                        </n-p>
                    </n-upload-dragger>
                </n-upload>
            </div>

            <!-- 右侧：导入说明 -->
            <div class="info-box">
                <h3 class="info-title">导入说明:</h3>
                <ul class="info-list">
                    <li>支持xls、xlsx、doc、docx、pdf等格式</li>
                    <li>文件在10M内，最高5万行，1024列</li>
                    <li>支持批量上传，最多同时上传5个文件</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5';
</script>

<style scoped>
/* 页面全局样式 */
.upload-page {
    width: 100%;
    min-height: 100vh;
    padding: 20px 120px;
    background-color: #ffffff;
    box-sizing: border-box;
}

/* 步骤进度条 */
.steps-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 60px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.05);
}

.step {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #909399;
}

.step.active {
    color: #409eff;
}

.step-num {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #409eff;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
}

.step:not(.active) .step-num {
    background: #c0c4cc;
}

.step-line {
    width: 200px;
    height: 2px;
    background: #dcdfe6;
    margin: 0 16px;
}

.step-text {
    font-size: 16px;
    font-weight: 500;
}

/* 主体内容区：左右分栏 */
.content-wrapper {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
}

/* 左侧上传框 */
.upload-box {
    flex: 1;
    max-width: 50%;
}

/* 美化上传拖拽区域 */
:deep(.n-upload-dragger) {
    padding: 90px 100px;
    border-radius: 12px;
    background: #f5f7fa;
    border: 1px dashed #dcdfe6;
    text-align: center;
}

/* 右侧说明区 */
.info-box {
    flex: 1;
    padding: 20px;
}

.info-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 16px;
    color: #303133;
}

.info-list {
    list-style: disc;
    padding-left: 20px;
    font-size: 14px;
    line-height: 1.8;
    color: #606266;
}

/* 表格示例区 */
.table-example {
    margin-top: 20px;
}

.example-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 16px;
    color: #303133;
    display: flex;
    align-items: center;
}

/* 表格样式适配 */
:deep(.n-data-table) {
    border-radius: 8px;
}

.top-bar {
    display: flex;
    width: 100%;
}
</style>
