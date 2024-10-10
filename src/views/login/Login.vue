<template>
    <el-dialog
      v-model="dialogVisible"
      title="Login"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="form" label-width="120px">
        <el-form-item label="Username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="form.password" type="password" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">Cancel</el-button>
          <el-button type="primary" @click="handleLogin">Login</el-button>
        </span>
      </template>
    </el-dialog>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { ElMessage } from 'element-plus'
  import { invoke } from '@tauri-apps/api/core';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const dialogVisible = ref(true);
  const form = reactive({
    username: '',
    password: ''
  });
  
  const emit = defineEmits(['close']);
  
  const handleClose = () => {
    dialogVisible.value = false;
    emit('close');
  };
  
  async function handleLogin() {
    try {
      const result = await invoke('login', { username: form.username, password: form.password });
      if (result === true) {
        ElMessage.success('Login successful');
        handleClose();
        router.push('/greet');
      } else {
        ElMessage.error('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      ElMessage.error('An error occurred during login');
    }
  }
  </script>
  
  <style scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
  </style>