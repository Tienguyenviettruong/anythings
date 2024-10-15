<template>
  <div>
    <h1>Thông tin hệ thống</h1>
    <pre>{{ systemInfo }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { invoke } from '@tauri-apps/api/core';

const systemInfo = ref('');

onMounted(async () => {
  try {
    systemInfo.value = await invoke('get_system_info');
  } catch (error) {
    console.error('Lỗi khi lấy thông tin hệ thống:', error);
    systemInfo.value = 'Không thể lấy thông tin hệ thống.';
  }
});
</script>