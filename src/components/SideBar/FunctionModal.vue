<template>
    <n-modal
        v-model:show="showModal"
        style="width: 400px"
        preset="card"
        draggable
        title="Excel 函数说明"
        :show-mask="false"
    >
        <div style="background: #e6f7e9; padding: 16px; min-height: 180px">
            <div>函数：{{ name }}</div>
            <div style="margin: 10px 0">说明：{{ desc }}</div>
            <div>示例：{{ example }}</div>
        </div>
    </n-modal>
</template>

<script setup>
import { ref } from 'vue';

const showModal = ref(false);
const name = ref('');
const desc = ref('');
const example = ref('');

const openModal = (data) => {
    showModal.value = true;
    name.value = data.name;
    desc.value = data.desc;
    example.value = data.example;
};

defineExpose({ openModal });
</script>
