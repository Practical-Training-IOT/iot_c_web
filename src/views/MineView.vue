<template>
  <div class="mine-view">
    <!-- 頂部欄 -->
    <div class="top-bar">
      <span class="title">我的</span>
      <el-button circle size="small" class="setting-btn"><el-icon><i-ep-more /></el-icon></el-button>
    </div>

    <!-- 用戶信息卡片 -->
    <div class="user-card">
      <img class="avatar" src="https://img.yzcdn.cn/vant/cat.jpeg" alt="avatar" />
      <div class="user-info">
        <div class="user-name">admin</div>
      </div>
    </div>

    <el-card class="info-card">
      <div class="info-row">
        <span class="label">部门</span>
        <span class="value">研发部门</span>
      </div>
      <div class="info-row">
        <span class="label">邮箱</span>
        <span class="value">1287707811@qq.com</span>
      </div>
      <div class="info-row">
        <span class="label">电话</span>
        <span class="value">17318065663</span>
      </div>
    </el-card>

    <a
        href="http://117.27.231.112:83"
        target="_blank"
        rel="noopener noreferrer"
        class="shiny-button about-button"
    >
      关于
    </a>

    <!-- 底部導航欄 -->
    <BottomNavComponent :navs="navs" @nav-click="onNavClick"/>
    <el-button type="danger" @click="onLogout" style="width:100%;margin-top:24px;">退出登錄</el-button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BottomNavComponent from '@/components/BottomNavComponent.vue'
import * as Icons from '@element-plus/icons-vue'
import { removeToken } from '@/utils/auth'

const { ElIcon, EpHome, EpCpu, EpBell, EpSunny, EpUser } = Icons
const router = useRouter()

// 底部導航
const navs = ref([
  { name: 'home', text: '首页', icon: EpHome, active: false },
  { name: 'device', text: '设备', icon: EpCpu, active: false },
  { name: 'alarm', text: '告警', icon: EpBell, active: false },
  { name: 'scene', text: '场景', icon: EpSunny, active: false },
  { name: 'mine', text: '我的', icon: EpUser, active: true }
])

const onNavClick = (item) => {
  navs.value.forEach(n => n.active = n.name === item.name)
  if (item.name === 'home') router.push('/')
  if (item.name === 'device') router.push('/device')
  if (item.name === 'alarm') router.push('/alarm')
  if (item.name === 'scene') router.push('/scene')
  if (item.name === 'mine') router.push('/mine')
}

const onLogout = () => {
  removeToken()
  router.push('/login')
}

onMounted(() => {
  window.scrollTo(0, 0)
  navs.value.forEach(n => n.active = n.name === 'mine')
})
</script>

<style lang="scss" scoped>
.mine-view {
  min-height: 100vh;
  width: 100%;
  background: var(--background-light);
  padding-bottom: 80px; // 增加底部預留空間
  position: relative; // 添加相對定位
  .top-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    position: relative;
    .title {
      font-size: 18px;
      font-weight: bold;
    }
    .setting-btn {
      position: absolute;
      right: 16px;
      top: 8px;
      background: #f5f5f5;
      border: none;
    }
  }
  .user-card {
    background: #232e43;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 0 24px 0;
    border-bottom-left-radius: 32px;
    border-bottom-right-radius: 32px;
    .avatar {
      width: 96px;
      height: 96px;
      border-radius: 50%;
      border: 4px solid #fff;
      background: #fff;
      margin-bottom: 12px;
    }
    .user-info {
      .user-name {
        color: #fff;
        font-size: 28px;
        font-weight: bold;
        text-align: center;
      }
    }
  }
  .info-card {
    margin: 24px 16px;
    border-radius: 18px;
    padding-bottom: 20px; // 添加內容底部間距
    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;
      font-size: 16px;
      border-bottom: 1px solid #f0f0f0;
      &:last-child {
        border-bottom: none;
      }
      .label {
        color: #333;
      }
      .value {
        color: #999;
      }
    }
  }
  .shiny-button {
    width: fit-content;
    position: relative;
    margin: 2rem auto; // 居中显示
    padding: 1rem 9rem; // 增加左右padding使按钮变长
    color: rgb(207, 248, 255);
    border: 3px solid transparent;
    border-radius: 60px;
    background-color: #1e3a8a; // 更换为蓝色背景
    background-image:
        linear-gradient(to bottom right, #1d4ed8, #3b82f6), // 更新渐变颜色为蓝色系
        linear-gradient(125deg, rgba(255,255,255,0) 45%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 53%);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    background-size: 100%, 200%;
    background-position: 0px, -250px;
    animation: 4s border-glint linear infinite;
    animation-delay: 1s;
    box-shadow: rgba(0,0,0,0.6) 8px 8px 8px;
    text-shadow: 0px 0px 4px rgba(255,255,255,0.1);
    transition: box-shadow 0.25s, text-shadow 0.25s;
    overflow: hidden;
    display: block;
    text-align: center;
    text-decoration: none;
    font-family: "Roboto", sans-serif;
    font-size: 16px;
  }

  .shiny-button:hover {
    background-image:
        linear-gradient(to bottom right, #1d4ed8, #3b82f6), // 同样更新hover状态下的渐变颜色
        linear-gradient(125deg, rgba(255,255,255,0) 45%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 53%);
    color: rgb(250, 250, 255);
    box-shadow: rgba(0,0,0,0.7) 5px 5px 5px;
    text-shadow: 0px 0px 3px rgba(255,255,255,0.7);
  }

  .shiny-button::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -120%;
    width: 200%;
    height: 200%;
    background-image: linear-gradient(125deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 52%);
    animation: 4s glint linear infinite;
    animation-delay: -3s;
  }

  @keyframes glint {
    0% { left: -120%; }
    8% { left: 50%; }
    100% { left: 50%; }
  }

  @keyframes border-glint {
    0% { background-position: 0px, -250px; }
    25% { background-position: 0px, -200px; }
    75% { background-position: 0px, 50px; }
    100% { background-position: 0px, 50px; }
  }
}
</style> 