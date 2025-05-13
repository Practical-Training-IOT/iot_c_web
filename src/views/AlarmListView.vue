<template>
  <div class="alarm-list-view">
    <!-- 頂部欄 -->
    <div class="top-bar">
      <span class="title">告警规则列表</span>
      <el-button circle size="small" class="setting-btn"><el-icon><i-ep-more /></el-icon></el-button>
    </div>

    <!-- 标签切换 -->
    <el-tabs v-model="tab" class="tabs-bar">
      <el-tab-pane label="全部" name="all" />
      <el-tab-pane label="已启动" name="enabled" />
      <el-tab-pane label="已停止" name="disabled" />
    </el-tabs>

    <!-- 搜索框 -->
    <el-input v-model="search" placeholder="请输入搜索" class="search-bar" clearable prefix-icon="el-icon-search" />

    <!-- 告警卡片列表 -->
    <div class="alarm-list" @click="gotoDetail(alarm.id)">
      <AlarmCardComponent
        v-for="alarm in filteredAlarms"
        :key="alarm.id"
        :alarm="alarm"
        @toggle="onToggle(alarm, $event)"
        @click="onAlarmClick(alarm)"
      />
    </div>

    <!-- 底部導航欄 -->
    <BottomNavComponent :navs="navs" @nav-click="onNavClick"/>
    <AIFloatingButton />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AlarmCardComponent from '@/components/AlarmCardComponent.vue'
import BottomNavComponent from '@/components/BottomNavComponent.vue'
import AIFloatingButton from '@/components/AIFloatingButton.vue'
// eslint-disable-next-line no-undef
defineProps({
  alarm: Object
});
const gotoDetail = (id) => {
  router.push({ name: 'AlarmDetailView', params: { id: id }})
}
const router = useRouter()
const tab = ref('all')
const search = ref('')
const alarms = ref([]) // 初始化为空数组

// 底部导航
const navs = ref([
  { name: 'home', text: '首页', icon: 'i-ep-home', active: false },
  { name: 'device', text: '设备', icon: 'i-ep-cpu', active: false },
  { name: 'alarm', text: '告警', icon: 'i-ep-bell', active: true },
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

// 定义获取告警数据的方法
async function fetchAlarms() {
  try {
    const response = await fetch('http://localhost:8888/api/alarmList');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    alarms.value = data.list; // 假设后端返回的数据结构如上所述
  } catch (error) {
    console.error('Failed to fetch alarms:', error);
  }
}

// 合并所有的初始化操作到一个onMounted钩子中
onMounted(() => {
  window.scrollTo(0, 0)
  navs.value.forEach(n => n.active = n.name === 'alarm')
  fetchAlarms(); // 在组件挂载时调用fetchAlarms方法
})

const onToggle = (alarm, val) => {
  alarm.enabled = val
  // TODO: 调用接口更新状态
}

const onAlarmClick = (alarm) => {
  router.push(`/alarm/${alarm.id}`)
}

// 过滤告警规则
const filteredAlarms = computed(() => {
  let list = alarms.value
  if (tab.value === 'enabled') list = list.filter(a => a.enabled)
  if (tab.value === 'disabled') list = list.filter(a => !a.enabled)
  if (search.value) list = list.filter(a => a.title.includes(search.value))
  return list
})
</script>
<style lang="scss" scoped>
.alarm-list-view {
  min-height: 100vh;
  width: 100%;
  background: var(--background-light);
  padding-bottom: 60px; // 為底部導航欄留出空間
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
    width: calc(100% - 24px); // 修正搜索框寬度
  }
  .alarm-list {
    margin: 16px 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}
</style> 