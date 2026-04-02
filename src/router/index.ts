import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        name: 'index',
        path: '/',
        redirect: '/home',
    },
    {
        path: '/',
        component: import('@/layout/DefaultLayout.vue'),
        children: [
            {
                name: 'home',
                path: 'home',
                component: import('@/view/HomeView.vue'),
            },
        ],
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: import('@/view/NotFoundView.vue'),
    },
];

// 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
