<template>
  <div class="login-view">
    <div class="header">
      <h1>物联网</h1>
      <p>登录</p>
    </div>

    <div class="image-placeholder">
       <img :src="loginImg" alt="Description">
    </div>

    <el-form :model="form" @submit.prevent="onLogin" class="login-form">
      <el-form-item>
        <el-input v-model="form.username" placeholder="请输入用户名" class="custom-input" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.password" type="password" placeholder="请输入密码" class="custom-input" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onLogin" class="custom-button">登录</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="goRegister" class="custom-button">注册</el-button>
      </el-form-item>
    </el-form>

    <p class="terms-fixed">登录表示您已接受<a href="#">服务条款和条件</a></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/auth'
import { setToken } from '@/utils/auth'
import loginImg from '@/assets/login.svg'
import {ElMessage} from "element-plus";

const router = useRouter()
const form = ref({ username: '', password: '' })

const onLogin = async () => {
  const res = await login(form.value)

  if (res.code === 200) {
    ElMessage.success('登录成功')
    setToken(res.data)
    await router.push('/')
  } else if (res.code === 400) {
    ElMessage.error('登录失败，请检查用户名或密码')
  } else {
    ElMessage.error('发生未知错误')
  }
}
const goRegister = () => router.push('/register')
</script>

<style scoped>
.login-view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #1a1a1a;
  color: white;
  position: relative;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.header h1 {
  font-size: 36px;
  margin-bottom: 10px;
}

.header p {
  font-size: 18px;
}

.image-placeholder {
  width: 100%;
  max-width: 320px;
  height: 150px;
  margin-bottom: 20px;
}

.image-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.login-form {
  width: 320px;
  padding: 32px 24px;
  background: transparent;
  border-radius: 16px;
  box-shadow: none;
  text-align: left;
  z-index: 1;
}

/* 自定义输入框样式 */
.custom-input ::v-deep .el-input__wrapper {
  background-color: transparent !important;
  box-shadow: none !important;
  border: none !important;
  border-bottom: 1px solid #444 !important;
  padding: 0 !important;
}

.custom-input ::v-deep .el-input__inner {
  color: white !important;
  font-size: 18px;
  background-color: transparent !important;
  padding: 10px 0 !important;
}

.custom-input ::v-deep .el-input__inner::placeholder {
  color: #aaa !important;
}

.custom-input ::v-deep .el-input__wrapper:focus-visible {
  border-bottom-color: #ff6b6b !important;
  outline: none !important;
}

.custom-button {
  width: 100%;
  background: linear-gradient(90deg, #ff6b6b, #ee0979);
  border: none;
  border-radius: 30px;
  padding: 15px;
  font-size: 18px;
  color: white;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.custom-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.custom-button:active {
  transform: translateY(1px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.terms-fixed {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #1a1a1a;
  text-align: center;
  padding: 10px 0;
  color: #aaa;
  font-size: 14px;
  z-index: 2;
}

.terms-fixed a {
  color: #ff6b6b;
  text-decoration: none;
}

/*.terms-link {
  margin-top: 16px;
  text-align: center;
  font-size: 13px;
  color: #888;
  a {
    color: var(--el-color-primary);
    cursor: pointer;
    text-decoration: underline;
    margin-left: 4px;
  }
}*/
</style>