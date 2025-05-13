<template>
  <div class="device-list-view">
    <!-- 頂部欄 -->
    <div class="top-bar">
      <span class="title">设备列表</span>
      <el-button circle size="small" class="setting-btn"><el-icon><i-ep-more /></el-icon></el-button>
    </div>

    <!-- 標籤切換 -->
    <el-tabs v-model="tab" class="tabs-bar">
      <el-tab-pane label="全部" name="all" />
      <el-tab-pane label="收藏" name="fav" />
    </el-tabs>

    <!-- 搜索框 -->
    <el-input v-model="search" placeholder="请输入搜索" class="search-bar" clearable prefix-icon="el-icon-search" />

    <div class="main-content">
      <!-- 左側分類 -->
      <div class="category-list">
        <div
          v-for="cat in categories"
          :key="cat"
          :class="['cat-item', {active: cat === currentCategory}]"
          @click="currentCategory = cat"
        >
          {{ cat }}
        </div>
      </div>
      <!-- 右側設備卡片列表 -->
      <div class="device-list">
        <DeviceCardComponent
          v-for="dev in filteredDevices"
          :key="dev.id"
          :device="dev"
          @device-click="onDeviceClick"
        />
      </div>
    </div>

    <!-- 底部導航欄 -->
    <BottomNavComponent :navs="navs" @nav-click="onNavClick"/>
    <AIFloatingButton />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BottomNavComponent from '@/components/BottomNavComponent.vue'
import DeviceCardComponent from '@/components/DeviceCardComponent.vue'
import AIFloatingButton from '@/components/AIFloatingButton.vue'

const router = useRouter()

// 標籤切換
const tab = ref('all')
const search = ref('')

// 分類（預留接口）
const categories = ref([
  '全部', '烟感传感器', '海康门禁', '智能车机', '龙头', '变频器', '升降桌', '摄像头', '语音助手'
])
const currentCategory = ref('全部')

// 設備列表（預留接口）
const devices = ref([
  { id: 1, name: '门禁', status: '离线', type: '直连设备', lastOnline: '-' },
  { id: 2, name: '温度监控-001', status: '在线', type: '直连设备', lastOnline: '2025年01月15日 22:21:38' },
  { id: 3, name: '测试产品Bee', status: '未激活', type: '直连设备', lastOnline: '-' },
  { id: 4, name: '温湿度计', status: '离线', type: '直连设备', lastOnline: '2024年12月11日 11:25:31' }
])

// 過濾設備
const filteredDevices = computed(() => {
  let list = devices.value
  if (currentCategory.value !== '全部') {
    list = list.filter(d => d.type === currentCategory.value || d.name.includes(currentCategory.value))
  }
  if (search.value) {
    list = list.filter(d => d.name.includes(search.value))
  }
  return list
})

// 底部導航
const navs = ref([
  { name: 'home', text: '首页', icon: 'i-ep-home', active: false },
  { name: 'device', text: '设备', icon: 'i-ep-cpu', active: true },
  { name: 'alarm', text: '告警', icon: 'i-ep-bell', active: false },
  { name: 'scene', text: '场景', icon: 'i-ep-sunny', active: false },
  { name: 'mine', text: '我的', icon: 'i-ep-user', active: false }
])
const onNavClick = (item) => {
  navs.value.forEach(n => n.active = n.name === item.name)
  if (item.name === 'home') router.push('/')
  if (item.name === 'device') router.push('/device')
  if (item.name === 'alarm') router.push('/alarm')
  if (item.name === 'scene') router.push('/scene')
  if (item.name === 'mine') router.push('/mine')
}
const onDeviceClick = (dev) => {
  router.push(`/device/${dev.id}`)
}

onMounted(() => {
  window.scrollTo(0, 0)
  navs.value.forEach(n => n.active = n.name === 'device')
})
</script>

<style lang="scss" scoped>
.device-list-view {
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
  .tabs-bar {
    margin: 0;
    background: #fff;
    .el-tabs__nav {
      width: 100%;
      display: flex;
      justify-content: space-around;
    }
  }
  .search-bar {
    margin: 8px 12px;
    background: #fff;
    border-radius: 8px;
    width: calc(100% - 24px);
  }
  .main-content {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin: 8px 12px;
    width: calc(100% - 24px);
    padding-bottom: 20px; // 添加內容底部間距
    .category-list {
      width: 90px;
      background: #fff;
      border-radius: 8px;
      padding: 8px 0;
      .cat-item {
        padding: 8px 0 8px 12px;
        font-size: 15px;
        color: var(--text-regular);
        cursor: pointer;
        border-left: 3px solid transparent;
        &.active {
          color: var(--primary-color);
          font-weight: bold;
          border-left: 3px solid var(--primary-color);
          background: #f5f7fa;
        }
      }
    }
    .device-list {
      flex: 1;
      margin-left: 12px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  }
}
</style> 