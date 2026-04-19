import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import UnoCSS from 'unocss/vite';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import { TDesignResolver } from '@tdesign-vue-next/auto-import-resolver';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        UnoCSS(),

        AutoImport({
            imports: ['vue'],
            resolvers: [
                TDesignResolver({
                    library: 'chat',
                }),
            ],
        }),

        Components({
            resolvers: [
                NaiveUiResolver(),
                TDesignResolver({
                    library: 'chat',
                }),
            ],
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
});
