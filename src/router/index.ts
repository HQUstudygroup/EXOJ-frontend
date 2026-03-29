import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: import('@/components/HelloWorld.vue'),
    },
    {
        path: '/about',
        name: 'About',
        component: import('@/components/About.vue'),
    },
];

// 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
