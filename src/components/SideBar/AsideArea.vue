<template>
    <n-menu
        v-model:value="menuStore.activeKey"
        :options="asideOptions"
        @update:value="menuStore.openFormulaInfoModal"
    />
</template>

<script setup lang="ts">
import { asideOptions } from './asideOptions';
import { useMenuStore } from '@/stores/menu';

const menuStore = useMenuStore();
</script>

<style scoped></style>
