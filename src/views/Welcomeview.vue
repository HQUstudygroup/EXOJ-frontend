<template>
    <div class="w-full max-w-full overflow-x-hidden bg-[#f5f7fa]">
        <!-- 欢迎主页 -->
        <section class="w-full min-h-screen flex items-center justify-center p-5 relative">
            <div
                class="absolute w-[400px] h-[400px] top-[-100px] left-[-100px] rounded-full bg-gradient-to-br from-[#3b82f633] to-[#818cf833] blur-[80px] z-0"
            ></div>
            <div
                class="absolute w-[350px] h-[350px] bottom-[-80px] right-[-80px] rounded-full bg-gradient-to-br from-[#3b82f633] to-[#818cf833] blur-[80px] z-0"
            ></div>

            <div
                class="w-full max-w-[720px] bg-white p-10 rounded-3xl shadow-lg relative z-10 transition-all hover:-translate-y-2 hover:shadow-xl"
            >
                <h1
                    class="text-[40px] font-bold bg-gradient-to-r from-[#1e293b] to-[#3b82f6] bg-clip-text text-transparent mb-3 animate-[float_3s_ease-in-out_infinite] text-center"
                >
                    欢迎使用 数易办公
                </h1>
                <p
                    class="text-[19px] font-medium bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] bg-clip-text text-transparent mb-7 animate-[fadeIn_1s_ease_forwards] animation-delay-300 text-center"
                >
                    —— 让文件处理更简单 ——
                </p>

                <div
                    class="text-[15px] text-[#555] leading-relaxed mb-8 text-center px-2.5 animate-[fadeIn_1s_ease_forwards] animation-delay-500"
                >
                    数易办公是一款轻量化在线办公工具，专注于提升文件处理效率。
                    无需安装软件，打开网页即可使用，让每个人都能轻松完成数据处理与文档工作。
                </div>

                <div
                    class="flex flex-wrap justify-center gap-3 mb-10 animate-[fadeIn_1s_ease_forwards] animation-delay-700"
                >
                    <div
                        class="bg-gradient-to-r from-[#eef4ff] to-[#dbeafe] text-[#3b82f6] py-2 px-4 rounded-full text-sm transition-all hover:bg-gradient-to-r hover:from-[#dbeafe] hover:to-[#bfdbfe] hover:-translate-y-0.5 hover:shadow-md"
                    >
                        ✅ Excel 在线编辑
                    </div>
                    <div
                        class="bg-gradient-to-r from-[#eef4ff] to-[#dbeafe] text-[#3b82f6] py-2 px-4 rounded-full text-sm transition-all hover:bg-gradient-to-r hover:from-[#dbeafe] hover:to-[#bfdbfe] hover:-translate-y-0.5 hover:shadow-md"
                    >
                        ✅ 文件格式转换
                    </div>
                    <div
                        class="bg-gradient-to-r from-[#eef4ff] to-[#dbeafe] text-[#3b82f6] py-2 px-4 rounded-full text-sm transition-all hover:bg-gradient-to-r hover:from-[#dbeafe] hover:to-[#bfdbfe] hover:-translate-y-0.5 hover:shadow-md"
                    >
                        ✅ 多文件合并
                    </div>
                    <div
                        class="bg-gradient-to-r from-[#eef4ff] to-[#dbeafe] text-[#3b82f6] py-2 px-4 rounded-full text-sm transition-all hover:bg-gradient-to-r hover:from-[#dbeafe] hover:to-[#bfdbfe] hover:-translate-y-0.5 hover:shadow-md"
                    >
                        ✅ 格式标准化处理
                    </div>
                    <div
                        class="bg-gradient-to-r from-[#eef4ff] to-[#dbeafe] text-[#3b82f6] py-2 px-4 rounded-full text-sm transition-all hover:bg-gradient-to-r hover:from-[#dbeafe] hover:to-[#bfdbfe] hover:-translate-y-0.5 hover:shadow-md"
                    >
                        ✅ AI 智能数据分析
                    </div>
                </div>

                <div class="flex justify-center mb-4">
                    <n-button
                        type="primary"
                        size="large"
                        @click="goToHome"
                        class="w-[190px] h-[48px] rounded-full text-base bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] border-none animate-[fadeIn_1s_ease_forwards,pulse_2s_infinite] animation-delay-900 hover:scale-105 hover:shadow-lg"
                    >
                        立即进入
                    </n-button>
                </div>

                <div
                    class="mt-4 text-xs text-[#999] animate-[scrollGuide_2s_infinite_ease-in-out] text-center"
                >
                    ↓ 向下滑动，了解更多功能 ↓
                </div>
            </div>
        </section>

        <!-- 第二屏：核心功能 -->
        <section class="py-20 px-5 bg-white">
            <h2 class="text-[28px] font-bold text-[#222] text-center mb-2.5">核心功能</h2>
            <p class="text-base text-[#666] text-center mb-10">一站式解决办公文件处理难题</p>

            <div
                class="w-full max-w-[900px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <div
                    class="bg-[#f9fafb] p-7 rounded-xl text-center transition-all hover:-translate-y-1.5 hover:shadow-lg"
                    v-for="(item, idx) in featureList"
                    :key="idx"
                >
                    <div class="text-[36px] mb-4">{{ item.icon }}</div>
                    <h3 class="text-lg text-[#222] mb-2">{{ item.title }}</h3>
                    <p class="text-sm text-[#666] leading-relaxed">{{ item.desc }}</p>
                </div>
            </div>
        </section>

        <!-- 第三屏：使用流程 -->
        <section class="py-20 px-5 bg-[#f8fafc]">
            <h2 class="text-[28px] font-bold text-[#222] text-center mb-2.5">三步开始使用</h2>
            <p class="text-base text-[#666] text-center mb-10">简单快捷，无需学习成本</p>

            <div class="w-full max-w-[800px] mx-auto flex justify-around flex-wrap gap-7">
                <div
                    class="flex-1 min-w-[180px] text-center"
                    v-for="(step, idx) in processList"
                    :key="idx"
                >
                    <div
                        class="w-[50px] h-[50px] bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4"
                    >
                        {{ idx + 1 }}
                    </div>
                    <h4 class="text-lg text-[#222] mb-1.5">{{ step.title }}</h4>
                    <p class="text-sm text-[#666]">{{ step.desc }}</p>
                </div>
            </div>
        </section>

        <!-- 第四屏：产品优势 -->
        <section class="py-20 px-5 pb-[100px] bg-white text-center">
            <h2 class="text-[28px] font-bold text-[#222] text-center mb-2.5">为什么选择数易办公</h2>

            <div class="w-full max-w-[700px] mx-auto mb-12">
                <div
                    class="flex items-center justify-center gap-2.5 text-base text-[#333] mb-3.5"
                    v-for="(adv, idx) in advList"
                    :key="idx"
                >
                    <div class="text-[#10b981] font-bold text-lg">✔</div>
                    <span>{{ adv }}</span>
                </div>
            </div>

            <div>
                <n-button
                    type="primary"
                    size="large"
                    @click="goToHome"
                    class="w-[200px] h-[50px] rounded-full text-base bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] border-none"
                >
                    立即开始使用
                </n-button>
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const goToHome = () => {
    router.push('/index'); // 跳转到你的主页
};

const featureList = [
    {
        icon: '📊',
        title: 'Excel 在线编辑',
        desc: '无需安装 Office/WPS，浏览器直接编辑、保存、导出表格',
    },
    {
        icon: '🔄',
        title: '多格式互转',
        desc: '支持 Excel、PDF、Word、图片、CSV 等几十种格式一键转换',
    },
    { icon: '🧩', title: '多文件合并', desc: '批量上传、自动合并、智能去重、一键导出' },
    { icon: '🧹', title: '格式标准化', desc: '统一文件格式、清理乱码、修复损坏文件、自动排版' },
    { icon: '🤖', title: 'AI 智能分析', desc: '自动识别数据、生成图表、提取关键信息' },
    { icon: '☁️', title: '云端存储', desc: '文件自动保存，多设备同步，随时随地继续处理' },
];

const processList = [
    { title: '打开网页', desc: '无需下载安装，浏览器直接访问' },
    { title: '上传文件', desc: '拖拽或点击上传，支持批量文件' },
    { title: '一键处理', desc: '选择功能，自动处理，立即下载' },
];

const advList = [
    '完全免费使用，无广告无捆绑',
    '文件不上云，本地处理更安全',
    '处理速度快，大文件也轻松',
    '界面简洁，操作零学习成本',
    '支持所有现代浏览器',
    '持续更新，功能越来越强大',
];
</script>
