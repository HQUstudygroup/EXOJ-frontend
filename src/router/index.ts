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
                name: 'extry',
                path: 'extry',
                component: () => import('@/views/formatStandardizationView.vue'),
            },
            {
                name: 'merge-files',
                path: 'merge-files',
                component: () => import('@/views/MergeFilesView.vue'),
            },
        ],
    },
    {
        name: 'welcome',
        path: '/welcome',
        component: () => import('@/views/WelcomeView.vue'),
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

router.afterEach((to, from) => {
    if (!from.name || !to.name) return;

    if (to.name === 'index') {
        window.location.reload();
    }
});

export default router;
