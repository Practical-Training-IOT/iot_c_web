<template>
  <div class="dashboard-view">
    <!-- 頂部欄 -->
    <div class="top-bar">
      <span class="title">首頁</span>
      <el-button circle size="small" class="setting-btn"><el-icon><i-ep-setting /></el-icon></el-button>
    </div>

    <!-- 統計卡片區塊 -->
    <div class="stat-grid">
      <StatCardComponent
        title="产品数"
        :main="`已发布:${stats.productPublished}个`"
        :sub="`未发布:${stats.productUnpublished}个`"
      >
        <template #icon><el-icon><i-ep-box /></el-icon></template>
      </StatCardComponent>
      <StatCardComponent
        title="设备数"
        :main="`在线:${stats.deviceOnline}个`"
        :sub="`离线:${stats.deviceOffline}个`"
      >
        <template #icon><el-icon><i-ep-cpu /></el-icon></template>
      </StatCardComponent>
      <StatCardComponent
        title="告警数"
        :main="`${stats.alarmCount}个`"
      >
        <template #icon><el-icon><i-ep-warning /></el-icon></template>
      </StatCardComponent>
      <StatCardComponent
        title="驱动数"
        :main="`运行:${stats.driverRunning}个`"
        :sub="`停止:${stats.driverStopped}个`"
      >
        <template #icon><el-icon><i-ep-switch /></el-icon></template>
      </StatCardComponent>
    </div>

    <div class="section">
      <div class="section-title">设备消息数</div>
      <div ref="lineChartRef" class="chart-box"></div>
    </div>

    <!-- 告警統計 -->
    <div class="section">
      <div class="section-title">告警统计</div>
      <div class="alarm-stats-row">
        <span>紧急: {{ alarmStats.urgent }}</span>
        <span>重要: {{ alarmStats.important }}</span>
        <span>次要: {{ alarmStats.minor }}</span>
        <span>提示: {{ alarmStats.info }}</span>
      </div>
      <div ref="pieChartRef" class="chart-box" style="height:120px;"></div>
    </div>

    <!-- 底部導航欄 -->
    <BottomNavComponent :navs="navs" @nav-click="onNavClick" />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import StatCardComponent from '@/components/StatCardComponent.vue'
import BottomNavComponent from '@/components/BottomNavComponent.vue'
import * as echarts from 'echarts'
import { useRouter } from 'vue-router'

// 統計數據（預留接口）
const stats = ref({
  productPublished: 60,
  productUnpublished: 112,
  deviceOnline: 12,
  deviceOffline: 77,
  alarmCount: 0,
  driverRunning: 2,
  driverStopped: 2
})

const lineChartRef = ref(null)
const lineChartData = ref({
  x: ['01-10', '01-11', '01-12', '01-13', '01-14', '01-15'],
  y: [1, 0, 0, 0, 0, 0]
})

// 告警統計（預留接口）
const alarmStats = ref({
  urgent: 0,
  important: 0,
  minor: 0,
  info: 0
})
const pieChartRef = ref(null)

// 底部導航
const navs = ref([
  { name: 'home', text: '首页', icon: 'i-ep-home', active: true },
  { name: 'device', text: '设备', icon: 'i-ep-cpu', active: false },
  { name: 'alarm', text: '告警', icon: 'i-ep-bell', active: false },
  { name: 'scene', text: '场景', icon: 'i-ep-sunny', active: false },
  { name: 'ai', text: 'AI', icon: 'i-ep-chat-dot-round', active: false },
  { name: 'mine', text: '我的', icon: 'i-ep-user', active: false }
])
const router = useRouter()
const onNavClick = (item) => {
  navs.value.forEach(n => n.active = n.name === item.name)
  if (item.name === 'home') router.push('/')
  if (item.name === 'device') router.push('/device')
  if (item.name === 'alarm') router.push('/alarm')
  if (item.name === 'scene') router.push('/scene')
  if (item.name === 'ai') router.push('/ai')
  if (item.name === 'mine') router.push('/mine')
}

// 初始化圖表
const initCharts = () => {
  // 折線圖
  if (lineChartRef.value) {
    const chart = echarts.init(lineChartRef.value)
    chart.setOption({
      xAxis: { type: 'category', data: lineChartData.value.x },
      yAxis: { type: 'value', min: 0, max: 1 },
      series: [{ data: lineChartData.value.y, type: 'line', smooth: true }],
      grid: { left: 30, right: 10, top: 20, bottom: 20 },
      tooltip: { trigger: 'axis' }
    })
  }
  // 半圓餅圖
  if (pieChartRef.value) {
    const chart = echarts.init(pieChartRef.value)
    chart.setOption({
      series: [{
        type: 'pie',
        radius: ['60%', '90%'],
        center: ['50%', '100%'],
        startAngle: 180,
        label: { show: false },
        data: [
          { value: alarmStats.value.urgent, name: '紧急' },
          { value: alarmStats.value.important, name: '重要' },
          { value: alarmStats.value.minor, name: '次要' },
          { value: alarmStats.value.info, name: '提示' },
          { value: 0, itemStyle: { color: 'none' }, tooltip: { show: false } } // 補全半圓
        ]
      }]
    })
  }
}

onMounted(() => {
  window.scrollTo(0, 0)
  navs.value.forEach(n => n.active = n.name === 'home')
  nextTick(() => {
    initCharts()
  })
  // TODO: 請求接口獲取數據
})
</script>

<style lang="scss" scoped>
.dashboard-view {
  padding-bottom: 60px;
  background: var(--background-light);
  min-height: 100vh;
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
  .stat-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin: 16px 12px 0 12px;
  }
  .section {
    background: #fff;
    margin: 16px 12px 0 12px;
    border-radius: 8px;
    padding: 12px 8px 8px 8px;
    .section-title {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 8px;
    }
    .chart-box {
      width: 100%;
      height: 180px;
    }
    .alarm-stats-row {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      margin-bottom: 8px;
      color: var(--text-regular);
    }
  }
}
</style> 