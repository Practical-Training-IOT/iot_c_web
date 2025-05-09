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
    <div class="alarm-list">
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AlarmCardComponent from '@/components/AlarmCardComponent.vue'
import BottomNavComponent from '@/components/BottomNavComponent.vue'
import * as Icons from '@element-plus/icons-vue'

const { ElIcon,EpHome, EpCpu, EpBell, EpSunny, EpUser } = Icons
const router = useRouter()

// 标签切换
const tab = ref('all')
const search = ref('')

// 底部導航
const navs = ref([
  { name: 'home', text: '首页', icon: EpHome, active: false },
  { name: 'device', text: '设备', icon: EpCpu, active: false },
  { name: 'alarm', text: '告警', icon: EpBell, active: true },
  { name: 'scene', text: '场景', icon: EpSunny, active: false },
  { name: 'mine', text: '我的', icon: EpUser, active: false }
])

const onNavClick = (item) => {
  navs.value.forEach(n => n.active = n.name === item.name)
  if (item.name === 'home') router.push('/')
  if (item.name === 'device') router.push('/device')
  if (item.name === 'alarm') router.push('/alarm')
  if (item.name === 'scene') router.push('/scene')
  if (item.name === 'mine') router.push('/mine')
}

// 告警规则列表（预留接口）
const alarms = ref([
  { id: 1, title: '平均温度大于50度', enabled: false, type: '设备告警', level: '重要', desc: '-', time: '2025年01月16日 08:38:14' },
  { id: 2, title: '电压表电流告警', enabled: false, type: '设备告警', level: '紧急', desc: '-', time: '2025年01月15日 08:41:17' },
  { id: 3, title: '告警测试', enabled: false, type: '设备告警', level: '紧急', desc: 'uuuu', time: '2024年12月11日 20:26:38' },
  { id: 4, title: '测试错误时', enabled: true, type: '设备告警', level: '重要', desc: '-', time: '2024年12月11日 20:26:38' }
])

// 过滤告警
const filteredAlarms = computed(() => {
  let list = alarms.value
  if (tab.value === 'enabled') list = list.filter(a => a.enabled)
  if (tab.value === 'disabled') list = list.filter(a => !a.enabled)
  if (search.value) list = list.filter(a => a.title.includes(search.value))
  return list
})

const onToggle = (alarm, val) => {
  alarm.enabled = val
  // TODO: 调用接口更新状态
}

const onAlarmClick = (alarm) => {
  router.push(`/alarm/${alarm.id}`)
}

onMounted(() => {
  window.scrollTo(0, 0)
  navs.value.forEach(n => n.active = n.name === 'alarm')
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