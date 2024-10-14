<template>
	<div class="page-login">
		<div class="box">
			<div class="logo">
				<img src="../../assets/logo.png" alt="Logo" />
				<div class="name">
					<span v-for="text in 'GROUND-ADMIN'" :key="text">{{ text }}</span>
				</div>
			</div>

			<p class="desc">Access management system</p>

			<div class="form">
				<el-form label-position="top" class="form" :disabled="saving">
					<el-form-item label="Username">
						<input
							v-model="form.username"
							placeholder="Please enter your username"
							maxlength="20"
							type="text"
							:readonly="readonly"
							autocomplete="off"
							@focus="readonly = false"
						/>
					</el-form-item>

					<el-form-item label="Password">
						<input
							v-model="form.password"
							type="password"
							placeholder="Please enter your password"
							maxlength="20"
							autocomplete="off"
						/>
					</el-form-item>

					<div class="op">
						<el-button type="primary" :loading="saving" @click="handleLogin"
							>Login</el-button
						>
					</div>
				</el-form>
			</div>
		</div>

		<div class="bg">
			<img src="../../assets/bg.svg" alt="Background" />
		</div>

		<a href="https://github.com/TheBlue-Team" class="copyright"> Copyright © TheBlue </a>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus'
import { invoke } from '@tauri-apps/api/core';
import { useRouter } from 'vue-router';

const router = useRouter();
const saving = ref(false);
const readonly = ref(true);

const form = reactive({
	username: localStorage.getItem('username') || '',
	password: ''
});

const handleLogin = async () => {
  if (!form.username) {
    return ElMessage.error('Tên đăng nhập không được để trống');
  }

  if (!form.password) {
    return ElMessage.error('Mật khẩu không được để trống');
  }

  saving.value = true;

  try {
    const result = await invoke('login', { username: form.username, password: form.password });
    if (result === true) {
      ElMessage.success('Đăng nhập thành công');
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', form.username);
      emit('login-success');
    } else {
      ElMessage.error('Tên đăng nhập hoặc mật khẩu không hợp lệ');
    }
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    ElMessage.error('Đã xảy ra lỗi trong quá trình đăng nhập');
  }

  saving.value = false;
};

const emit = defineEmits(['login-success', 'close']);
</script>

<style scoped>
.page-login {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 50%;
	width: 100%;
	position: relative;
	background-color: #fff;
	color: #2c3142;
}

.page-login .bg {
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	width: 100%;
	pointer-events: none;
	z-index: 0;
}

.page-login .bg img {
	height: 100%;
	width: 100%;
	object-fit: cover;
}

.page-login .copyright {
	position: absolute;
	bottom: 15px;
	left: 0;
	text-align: center;
	width: 100%;
	color: #666;
	font-size: 14px;
	z-index: 2;
}

.page-login .box {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: 40px;
	/* background-color: rgba(255, 255, 255, 0.9); */
	border-radius: 10px;
	/* box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); */
	z-index: 1;
}

.page-login .logo {
	height: 50px;
	margin-bottom: 20px;
	display: flex;
	align-items: center;
}

.page-login .logo img {
	height: 46px;
	background-color: #8d137d;
	border-radius: 50px;
	border: 3px solid #2c3142;
	margin-right: 10px;
}

.page-login .logo .name {
	display: flex;
}

.page-login .logo .name span {
	display: inline-block;
	font-size: 38px;
	font-weight: bold;
	line-height: 1;
	letter-spacing: 3px;
}

.page-login .desc {
	font-size: 15px;
	letter-spacing: 1px;
	margin-bottom: 30px;
	text-align: center;
}

.page-login .form {
	width: 100%;
}

.page-login .form :deep(.el-form) .el-form-item {
	margin-bottom: 20px;
}

.form :deep(.el-form) .el-form-item__label {
	padding-left: 5px;
}

.form :deep(.el-form) input {
	height: 45px;
	width: 100%;
	box-sizing: border-box;
	font-size: 17px;
	border: 0;
	border-radius: 6px;
	background-color: #f8f8f8;
	padding: 0 15px;
	position: relative;
}

.form :deep(.el-form) input:-webkit-autofill {
	box-shadow: 0 0 0 1000px #f8f8f8 inset;
}

.form :deep(.el-form) input::placeholder {
	font-size: 14px;
}

.op {
	display: flex;
	justify-content: center;
	margin-top: 30px;
}

.op :deep(.el-button) {
	height: 45px;
	width: 100%;
	font-size: 15px;
	border-radius: 6px;
	letter-spacing: 1px;
}

@media screen and (max-width: 1024px) {
	.box {
		width: 90%;
		max-width: 400px;
	}
}
</style>