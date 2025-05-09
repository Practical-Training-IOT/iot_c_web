<template>
  <div class="register-view">
    <!-- Header Section -->
    <div class="header">
      <h1>物联网</h1>
      <p>注册</p>
    </div>

    <!-- Placeholder for Image -->
    <div class="image-placeholder">
      <!-- 在这里插入你的图片 -->
       <img :src="registerImg" alt="Description">
    </div>

    <el-form :model="form" @submit.prevent="onRegister" class="register-form">
      <el-form-item>
        <el-input v-model="form.username" placeholder="请输入用户名" class="custom-input" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.password" type="password" placeholder="请输入密码" class="custom-input" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onRegister" class="custom-button">注册</el-button>
<!--        <el-button type="text" @click="goLogin" class="custom-text-button">返回登录</el-button>-->
      </el-form-item>

      <!-- 注册按钮单独一行 -->
      <el-form-item>
        <el-button type="primary" @click="goLogin" class="custom-button">返回登录</el-button>
      </el-form-item>
    </el-form>

    <!-- 固定在页面最底部的服务条款和条件（如果需要） -->
    <p class="terms-fixed">注册表示您已接受<a href="#">服务条款和条件</a></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/api/auth'
import registerImg from '@/assets/register.svg'

const router = useRouter()
const form = ref({ username: '', password: '' })

const onRegister = async () => {
  const res = await register(form.value)
  if (res && res.success) {
    await router.push('/login')
  }
}
const goLogin = () => router.push('/login')
</script>

<style scoped>
.register-view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #1a1a1a; /* 使用与登录页面相同的背景色 */
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

.register-form {
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

/* 自定义文本按钮样式 */
.custom-text-button {
  margin-left: 10px;
  color: #ff6b6b !important;
  text-decoration: none;
}

/* 如果需要固定在页面最底部的服务条款和条件 */
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
</style>