<template>
    <div
        class="n-flex n-justify-center"
        style="
            width: 100%;
            min-height: 100vh;
            padding-top: 220px;
            overflow: hidden;
            box-sizing: border-box;
        "
    >
        <n-result status="404" title="404 NotFound" description="抱歉！您访问的资源不存在">
            <template #footer>
                <n-button type="primary" @click="goHome"> 返回主页面 </n-button>
            </template>
        </n-result>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const goHome = () => {
    router.push('/home');
};
</script>
