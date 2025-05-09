<template>
  <div class="login-view">
    <!-- Header Section -->
    <div class="header">
      <h1>物联网</h1>
      <p>登录</p>
    </div>

    <!-- Placeholder for Image -->
    <div class="image-placeholder">
      <!-- 在这里插入你的图片 -->
       <img :src="loginImg" alt="Description">
    </div>

    <!-- Login Form -->
    <el-form :model="form" @submit.prevent="onLogin" class="login-form">
      <el-form-item>
        <el-input v-model="form.username" placeholder="请输入用户名" class="custom-input" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.password" type="password" placeholder="请输入密码" class="custom-input" />
      </el-form-item>

      <!-- 登录按钮单独一行 -->
      <el-form-item>
        <el-button type="primary" @click="onLogin" class="custom-button">登录</el-button>
      </el-form-item>

      <!-- 注册按钮单独一行 -->
      <el-form-item>
        <el-button type="primary" @click="goRegister" class="custom-button">注册</el-button>
      </el-form-item>
    </el-form>

    <!-- 固定在页面最底部的服务条款和条件 -->
    <p class="terms-fixed">登录表示您已接受<a href="#">服务条款和条件</a></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/auth'
import { setToken } from '@/utils/auth'
import loginImg from '@/assets/login.svg'

const router = useRouter()
const form = ref({ username: '', password: '' })

const onLogin = async () => {
  const res = await login(form.value)
  if (res && res.token) {
    setToken(res.token)
    await router.push('/')
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
  position: relative; /* 确保子元素可以相对于它定位 */
}

.header {
  text-align: center;
  margin-bottom: 20px; /* 增加与下方内容的距离 */
}

.header h1 {
  font-size: 36px;
  margin-bottom: 10px;
}

.header p {
  font-size: 18px;
}

/* 新增的图片占位符样式 */
.image-placeholder {
  width: 100%;
  max-width: 320px; /* 根据实际需求调整宽度 */
  height: 150px; /* 根据实际需求调整高度 */
  margin-bottom: 20px; /* 增加与下方内容的距离 */
}

.image-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保证图片不变形 */
}

.login-form {
  width: 320px;
  padding: 32px 24px;
  background: transparent;
  border-radius: 16px;
  box-shadow: none;
  text-align: left;
  z-index: 1; /* 确保表单在固定条之上 */
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

/* 固定在页面最底部的服务条款和条件 */
.terms-fixed {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #1a1a1a;
  text-align: center;
  padding: 10px 0;
  color: #aaa;
  font-size: 14px;
  z-index: 2; /* 确保它在其他内容之上 */
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