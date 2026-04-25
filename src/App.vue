<template>
    <n-message-provider>
        <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
            <router-view />
        </n-config-provider>
    </n-message-provider>
</template>

<script setup lang="ts">
import { zhCN, dateZhCN } from 'naive-ui';
</script>
