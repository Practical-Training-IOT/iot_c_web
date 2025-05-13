<template>
  <div class="alarm-detail-view">
    <!-- 頂部欄 -->
    <div class="top-bar">
      <el-button class="back-btn" size="small" @click="goBack">
        <el-icon><i-ep-arrow-left /></el-icon>返回
      </el-button>
      <span class="title">告警规则详情</span>
      <el-button circle size="small" class="setting-btn"><el-icon><i-ep-more /></el-icon></el-button>
    </div>

    <!-- 基本信息 -->
    <el-descriptions border :column="1" class="base-info">
      <el-descriptions-item label="名称">{{ alarm.name }}</el-descriptions-item>
      <el-descriptions-item label="告警类型">{{ alarm.type }}</el-descriptions-item>
      <el-descriptions-item label="状态">{{ alarm.status }}</el-descriptions-item>
      <el-descriptions-item label="告警级别">{{ alarm.level }}</el-descriptions-item>
      <el-descriptions-item label="创建时间">{{ alarm.time }}</el-descriptions-item>
      <el-descriptions-item label="规则描述">{{ alarm.desc }}</el-descriptions-item>
    </el-descriptions>

    <!-- 折疊面板 -->
    <el-collapse class="collapse-block" v-model="activeNames">
      <el-collapse-item title="触发条件" name="trigger">
        <div class="collapse-row">
          <span class="value">{{ alarm.triggers }}</span>
        </div>
      </el-collapse-item>
      <el-collapse-item title="通知方式" name="notify">
        <div class="collapse-row">
          <span class="value">{{ alarm.notifies }}</span>
        </div>
      </el-collapse-item>
      <el-collapse-item title="静默时间" name="silence">
        <div class="collapse-row">
          <span class="value">{{ alarm.silence }}</span>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const route = useRoute()

// 返回按钮
const goBack = () => router.back()

// 折叠面板状态
const activeNames = ref(['trigger', 'notify', 'silence'])

// 告警详情数据（初始为空）
const alarm = ref({
  name: '',
  type: '',
  status: '',
  level: '',
  time: '',
  desc: '',
  triggers: [],
  notifies: [],
  silence: ''
})

// 获取当前路由中的 id
const alarmId = ref(route.params.id || '') // 使用ref包装alarmId

onMounted(() => {
  if (!alarmId.value) {
    alert('缺少告警 ID')
    return
  }
  fetchAlarmDetail()
})

const fetchAlarmDetail = async () => {
  try {
    const response = await axios.get(`http://localhost:8888/api/alarmDetail`, {
      params: { id: alarmId.value } // 直接使用alarmId.value
    })
    alarm.value = response.data // 确保后端返回的数据结构与alarm匹配
  } catch (error) {
    console.error('Failed to fetch alarm detail:', error)
  }
}
</script>
<style lang="scss" scoped>
.alarm-detail-view {
  min-height: 100vh;
  width: 100%;
  background: var(--background-light);
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
    .back-btn {
      position: absolute;
      left: 8px;
      top: 8px;
      z-index: 10;
      color: #232e43;
      background: #fff;
      border-radius: 16px;
      font-size: 14px;
      font-weight: 400;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      padding: 0 6px;
      min-width: 0;
      height: 32px;
      line-height: 32px;
      display: flex;
      align-items: center;
    }
    .setting-btn {
      position: absolute;
      right: 16px;
      top: 8px;
      background: #f5f5f5;
      border: none;
    }
  }
  .base-info {
    margin: 24px 12px 0 12px;
    background: #fff;
    border-radius: 12px;
    padding: 0 0 8px 0;
  }
  .collapse-block {
    margin: 24px 12px 0 12px;
    background: #fff;
    border-radius: 12px;
    .collapse-row {
      display: flex;
      align-items: flex-start;
      padding: 8px 0;
      font-size: 15px;
      border-bottom: 1px solid #f0f0f0;
      &:last-child {
        border-bottom: none;
      }
      .label {
        color: #333;
        min-width: 60px;
        font-weight: 500;
      }
      .value {
        color: #666;
        margin-left: 8px;
        word-break: break-all;
      }
    }
  }
}
</style>