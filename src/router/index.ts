import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        name: 'index',
        path: '/',
        redirect: '/home',
    },
    {
        path: '/',
        component: () => import('@/layout/DefaultLayout.vue'),
        children: [
            {
                name: 'home',
                path: 'home',
                component: () => import('@/views/HomeView.vue'),
            },
            {
                name: 'about',
                path: 'about',
                component: () => import('@/components/About.vue'),
            },
            {
                name: 'extry',
                path: 'extry',
                component: () => import('@/components/HelloWorld.vue'),
            },
        ],
    },
    {
        name: 'upload',
        path: '/upload',
        component: () => import('@/views/UploadView.vue'),
    },
    {
        name: 'updata',
        path: '/updata',
        component: () => import('@/views/UpdataView.vue'),
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
