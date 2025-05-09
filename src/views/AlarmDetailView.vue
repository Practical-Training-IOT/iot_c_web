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
        <div v-for="(cond, idx) in alarm.triggers" :key="idx" class="collapse-row">
          <span class="label">条件{{ idx + 1 }}</span>
          <span class="value">{{ cond }}</span>
        </div>
      </el-collapse-item>
      <el-collapse-item title="通知方式" name="notify">
        <div v-for="(notify, idx) in alarm.notifies" :key="idx" class="collapse-row">
          <span class="label">通知{{ idx + 1 }}</span>
          <span class="value">{{ notify }}</span>
        </div>
      </el-collapse-item>
      <el-collapse-item title="静默时间" name="silence">
        <div class="collapse-row">
          <span class="label">时间</span>
          <span class="value">{{ alarm.silence }}</span>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import * as Icons from '@element-plus/icons-vue'

const { ElIcon } = Icons
const router = useRouter()
const goBack = () => router.back()

const activeNames = ref(['trigger', 'notify', 'silence'])

// 告警詳情數據（預留接口）
const alarm = ref({
  name: 'test113454',
  type: '设备告警',
  status: '禁用',
  level: '紧急',
  time: '2025-03-04 08:26:51',
  desc: '222',
  triggers: [
    '设备数据触发: 产品: mk | 设备: testmk | 功能: 湿度 | 触发条件: 最大值(15分钟周期)=45'
  ],
  notifies: ['告警中心'],
  silence: '0分钟'
})
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