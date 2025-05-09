<template>
  <div class="scene-detail-view">
    <!-- 頂部欄 -->
    <div class="top-bar">
      <el-button class="back-btn" size="small" @click="goBack">
        <el-icon><i-ep-arrow-left /></el-icon>返回
      </el-button>
      <span class="title">场景详情</span>
      <el-button circle size="small" class="setting-btn"><el-icon><i-ep-more /></el-icon></el-button>
    </div>

    <!-- 基本信息 -->
    <el-descriptions border :column="1" class="base-info">
      <el-descriptions-item label="名称">{{ scene.name }}</el-descriptions-item>
      <el-descriptions-item label="状态">{{ scene.status }}</el-descriptions-item>
      <el-descriptions-item label="创建时间">{{ scene.time }}</el-descriptions-item>
      <el-descriptions-item label="描述">{{ scene.desc }}</el-descriptions-item>
    </el-descriptions>

    <!-- 折疊面板 -->
    <el-collapse class="collapse-block" v-model="activeNames">
      <el-collapse-item title="触发条件" name="trigger">
        <div v-for="(cond, idx) in scene.triggers" :key="idx" class="collapse-section">
          <div class="section-title">条件{{ idx + 1 }}</div>
          <el-descriptions :column="1" class="collapse-desc">
            <el-descriptions-item label="触发方式">{{ cond.mode }}</el-descriptions-item>
            <el-descriptions-item label="触发事件">{{ cond.event }}</el-descriptions-item>
            <el-descriptions-item label="触发周期">{{ cond.period }}</el-descriptions-item>
            <el-descriptions-item label="产品">{{ cond.product }}</el-descriptions-item>
            <el-descriptions-item label="设备">{{ cond.device }}</el-descriptions-item>
            <el-descriptions-item label="功能">{{ cond.func }}</el-descriptions-item>
            <el-descriptions-item label="判断条件">{{ cond.condition }}</el-descriptions-item>
          </el-descriptions>
        </div>
      </el-collapse-item>
      <el-collapse-item title="执行动作" name="action">
        <div v-for="(act, idx) in scene.actions" :key="idx" class="collapse-section">
          <div class="section-title">动作{{ idx + 1 }}</div>
          <el-descriptions :column="1" class="collapse-desc">
            <el-descriptions-item label="类型">{{ act.type }}</el-descriptions-item>
            <el-descriptions-item label="产品">{{ act.product }}</el-descriptions-item>
            <el-descriptions-item label="设备">{{ act.device }}</el-descriptions-item>
            <el-descriptions-item label="执行属性">{{ act.attr }}</el-descriptions-item>
            <el-descriptions-item label="执行数值">{{ act.value }}</el-descriptions-item>
          </el-descriptions>
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

const activeNames = ref(['trigger', 'action'])

// 場景詳情數據（預留接口）
const scene = ref({
  name: 'sz场景联动测试',
  status: '禁用',
  time: '2025-05-07 17:45:24',
  desc: 'sz场景联动测试',
  triggers: [
    {
      mode: '设备触发',
      event: '设备数据触发',
      period: '',
      product: '电表演示',
      device: '电表2',
      func: 'EP_2',
      condition: '> 221'
    }
  ],
  actions: [
    {
      type: '设备执行',
      product: '电表演示',
      device: '电表2',
      attr: 'Pdmd',
      value: '220'
    },
    {
      type: '设备执行',
      product: 'esp32-农业',
      device: '嗯嗯',
      attr: '764004',
      value: '66'
    }
  ]
})
</script>

<style lang="scss" scoped>
.scene-detail-view {
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
    .collapse-section {
      margin-bottom: 12px;
      .section-title {
        font-weight: bold;
        font-size: 15px;
        margin-bottom: 4px;
      }
    }
    .collapse-desc {
      background: none;
      border-radius: 0;
      margin: 0;
      padding: 0;
    }
  }
}
</style> 