<template>
    <n-modal
        v-model:show="showModal"
        style="width: 400px"
        preset="card"
        draggable
        :title="modalTitle"
        :show-mask="false"
    >
        <!-- 固定最大高度 + 垂直滚动 -->
        <div style="max-height: 220px; overflow-y: auto">
            <div style="background: #e6f7e9; padding: 16px; min-height: 180px">
                <div>函数：{{ name }}</div>
                <div style="margin: 10px 0">说明：{{ desc }}</div>
                <div style="margin: 10px 0">语法：{{ example }}</div>
                <div style="margin: 10px 0">参数1：xxx</div>
                <div style="margin: 10px 0">参数2：xxx</div>
                <div style="margin: 10px 0">参数3：xxx</div>
            </div>
        </div>
    </n-modal>
</template>

<script setup>
import { ref, computed } from 'vue';

const showModal = ref(false);
const name = ref('');
const desc = ref('');
const example = ref('');

const modalTitle = computed(() => {
    if (!name.value) return 'Excel 函数说明';
    return `${name.value} 函数说明`;
});

const openModal = (data) => {
    showModal.value = true;
    name.value = data.name;
    desc.value = data.desc;
    example.value = data.example;
};

defineExpose({ openModal });
</script>
