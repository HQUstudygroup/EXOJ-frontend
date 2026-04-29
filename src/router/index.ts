import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        name: 'root',
        path: '/',
        redirect: '/welcome',
    },
    {
        path: '/',
        component: () => import('@/layout/DefaultLayout.vue'),
        children: [
            {
                name: 'index',
                path: 'index',
                component: () => import('@/views/IndexView.vue'),
            },
            {
                name: 'analyze-page',
                path: 'analyze-page',
                component: () => import('@/views/AnalizeView.vue'),
            },
            {
                name: 'merge-files',
                path: 'merge-files',
                component: () => import('@/views/MergeFilesView.vue'),
            },
            {
                name: 'format-files',
                path: 'format-files',
                component: () => import('@/views/formatStandardizationView.vue'),
            },
            {
                name: 'convert-files',
                path: 'convert-files',
                component: () => import('@/views/ConvertFileView.vue'),
            },
        ],
    },
    {
        name: 'welcome',
        path: '/welcome',
        component: () => import('@/views/WelcomeView.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFoundView.vue'),
    },
];

// 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
