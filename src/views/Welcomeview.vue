<template>
    <div class="welcome-page">
        <!-- 背景装饰（增加灵动感，不突兀） -->
        <div class="bg-decoration bg1"></div>
        <div class="bg-decoration bg2"></div>

        <div class="welcome-card">
            <!-- 主标题（加渐变+轻微上浮动效） -->
            <h1 class="main-title">欢迎使用 数易办公</h1>

            <!-- 副标题 / Slogan（加渐变+淡入动效） -->
            <p class="slogan">———让文件处理更简单</p>

            <!-- 功能介绍（加轻微阴影，提升层次感） -->
            <div class="desc">
                数易办公是一款轻量化在线办公工具，专注于提升文件处理效率。 平台支持 Excel
                在线编辑、多格式文件转换、智能数据筛选、一键文件合并、格式标准化等功能，
                无需安装软件，打开网页即可使用，让每个人都能轻松完成数据处理与文档工作。
            </div>

            <!-- 功能亮点（加hover动效+渐变背景，更灵动） -->
            <div class="features">
                <div class="feature-item" hover-effect>✅ Excel 在线编辑</div>
                <div class="feature-item" hover-effect>✅ 文件格式转换</div>
                <div class="feature-item" hover-effect>✅ 多文件合并</div>
                <div class="feature-item" hover-effect>✅ 格式标准化处理</div>
                <div class="feature-item" hover-effect>✅ AI 智能数据分析</div>
            </div>

            <!-- 进入按钮（加hover缩放+渐变，增强交互感） -->
            <n-button type="primary" size="large" @click="goToHome" class="start-btn">
                立即进入
            </n-button>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const goToHome = () => {
    router.push('/home'); // 跳转到你的主页
};
</script>

<style scoped>
/* 全局动画定义（灵动不浮夸） */
@keyframes float {
    0% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-8px);
    }
    100% {
        transform: translateY(0px);
    }
}
@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: translateY(10px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
    }
}

.welcome-page {
    width: 100%;
    min-height: 100vh;
    background: #f5f7fa;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    position: relative;
    overflow: hidden;
}

/* 背景装饰（淡蓝色光斑，增加灵动感，不抢主体） */
.bg-decoration {
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f633, #818cf833);
    filter: blur(80px);
    z-index: 0;
}
.bg1 {
    width: 500px;
    height: 500px;
    top: -100px;
    left: -100px;
}
.bg2 {
    width: 400px;
    height: 400px;
    bottom: -80px;
    right: -80px;
}

.welcome-card {
    max-width: 700px;
    background: #fff;
    padding: 60px 50px;
    border-radius: 20px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
    text-align: center;
    position: relative;
    z-index: 1;
    /* 卡片轻微悬浮感 */
    transform: translateY(-5px);
    transition: all 0.3s ease;
}
.welcome-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.1);
}

.main-title {
    font-size: 36px;
    font-weight: bold;
    /* 标题渐变 */
    background: linear-gradient(90deg, #252933, #3b82f6);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin: 0 0 12px 0;
    /* 轻微浮动动画 */
    animation: float 3s ease-in-out infinite;
}

.slogan {
    font-size: 18px;
    /* 标语渐变 */
    background: linear-gradient(90deg, #3b82f6, #60a5fa);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-weight: 500;
    margin-bottom: 24px;
    /* 淡入动画 */
    animation: fadeIn 1s ease forwards;
    opacity: 0;
    animation-delay: 0.3s;
}

.desc {
    font-size: 15px;
    color: #666;
    line-height: 1.7;
    margin-bottom: 32px;
    text-align: left;
    /* 轻微阴影，提升层次感，不死板 */
    text-shadow: 0 0 1px rgba(0, 0, 0, 0.05);
    padding: 0 10px;
    animation: fadeIn 1s ease forwards;
    opacity: 0;
    animation-delay: 0.5s;
}

.features {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    margin-bottom: 40px;
    animation: fadeIn 1s ease forwards;
    opacity: 0;
    animation-delay: 0.7s;
}

.feature-item {
    /* 按钮渐变背景，更有设计感 */
    background: linear-gradient(90deg, #eef4ff, #dbeafe);
    color: #3b82f6;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 14px;
    /* hover动效，增加灵动 */
    transition: all 0.2s ease;
    cursor: default;
}
.feature-item:hover {
    background: linear-gradient(90deg, #dbeafe, #bfdbfe);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(59, 130, 246, 0.15);
}

.start-btn {
    width: 180px;
    height: 46px;
    border-radius: 30px;
    font-size: 16px;
    /* 按钮渐变，增强设计感 */
    background: linear-gradient(90deg, #3b82f6, #60a5fa) !important;
    border: none !important;
    /* hover缩放+脉冲动效 */
    transition: all 0.2s ease;
    animation:
        fadeIn 1s ease forwards,
        pulse 2s ease-in-out infinite;
    opacity: 0;
    animation-delay: 0.9s;
}
.start-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(59, 130, 246, 0.3);
}
</style>
