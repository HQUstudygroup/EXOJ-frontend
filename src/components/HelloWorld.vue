<template>
    <filter-area></filter-area>
    <uni-table :content-class="'w-full h-4/5'"></uni-table>
</template>

<script setup lang="ts">
import { ModuleRegistry } from 'ag-grid-community';
import { LicenseManager, AllEnterpriseModule } from 'ag-grid-enterprise';
import UniTable from './UniTable/UniTable.vue';
import FilterArea from './FilterModal/FilterArea.vue';

ModuleRegistry.registerModules([AllEnterpriseModule]);

LicenseManager.setLicenseKey('faefb8c9-1e5a-4c3b-9d2e-1234567890ab');
</script>
