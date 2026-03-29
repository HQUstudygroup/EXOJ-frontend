module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    parser: 'vue-eslint-parser', // 用于解析 .vue 文件
    parserOptions: {
        parser: '@typescript-eslint/parser', // 用于解析 TS
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    extends: [
        'eslint:recommended', // ESLint 推荐规则
        'plugin:vue/vue3-recommended', // Vue 3 推荐规则
        'plugin:@typescript-eslint/recommended', // TS 推荐规则
        'plugin:prettier/recommended', // Prettier 集成，确保 ESLint 不会和 Prettier 冲突
    ],
    plugins: ['vue', '@typescript-eslint', 'prettier'],
    rules: {
        // 控制台警告/调试器
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        // Prettier 格式化错误显示为 ESLint 错误
        'prettier/prettier': 'error',
        // 其他常用规则，可根据需要开启/关闭
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        'vue/multi-word-component-names': 'off', // 允许单词命名组件
    },
};
