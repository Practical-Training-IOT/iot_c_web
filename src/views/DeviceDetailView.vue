<template>
  <div class="device-detail-view">
    <!-- 頂部欄 -->
    <div class="top-bar">
      <el-button class="back-btn" size="large" @click="goBack">
        <el-icon><i-ep-arrow-left /></el-icon> 返回
      </el-button>
      <span class="title">设备详情</span>
      <el-button circle size="small" class="setting-btn"><el-icon><i-ep-more /></el-icon></el-button>
    </div>

    <!-- 標籤切換 -->
    <el-tabs v-model="tab" class="tabs-bar">
      <el-tab-pane label="概览" name="overview" />
      <el-tab-pane label="数据" name="data" />
      <el-tab-pane label="控制" name="control" />
      <el-tab-pane label="告警" name="alarm" />
    </el-tabs>

    <!-- 概覽卡片 -->
    <div v-if="tab === 'overview'" class="overview-card">
      <el-descriptions border :column="1">
        <el-descriptions-item label="名称">
          <span class="main-title">{{ device.name }}</span>
          <span class="sub-title">{{ device.model }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="状态">{{ device.status }}</el-descriptions-item>
        <el-descriptions-item label="所属产品">{{ device.product }}</el-descriptions-item>
        <el-descriptions-item label="关联驱动">{{ device.driver }}</el-descriptions-item>
        <el-descriptions-item label="最近在线时间">{{ device.lastOnline }}</el-descriptions-item>
        <el-descriptions-item label="位置">{{ device.location }}</el-descriptions-item>
        <el-descriptions-item label="描述">{{ device.desc }}</el-descriptions-item>
      </el-descriptions>
      <el-button class="fav-btn" type="primary" size="large">收藏</el-button>
    </div>
    <!-- 其他tab內容可根據需求擴展 -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import * as Icons from '@element-plus/icons-vue'

const { ElIcon } = Icons
const router = useRouter()
const goBack = () => router.back()

// 標籤切換
const tab = ref('overview')

// 設備詳情數據（預留接口）
const device = ref({
  name: '高标准农田土壤监测点',
  model: '(GY-JG-01#)',
  status: '在线',
  product: '土壤墒情监测站AI-SOIL-760',
  driver: '数据模拟驱动-17937347',
  lastOnline: '2025-01-04 20:19:14',
  location: '-/-',
  desc: ''
})
</script>

<style lang="scss" scoped>
.device-detail-view {
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
  .tabs-bar {
    margin: 0 0 0 0;
    background: #fff;
    .el-tabs__nav {
      width: 100%;
      display: flex;
      justify-content: flex-start;
    }
  }
  .overview-card {
    margin: 16px 12px 0 12px;
    background: #fff;
    border-radius: 12px;
    padding: 12px 8px 24px 8px;
    .main-title {
      font-weight: bold;
      font-size: 16px;
      color: #232e43;
      margin-right: 8px;
    }
    .sub-title {
      color: #bbb;
      font-size: 13px;
    }
    .fav-btn {
      width: 100%;
      margin-top: 24px;
      background: #1a2347;
      border: none;
    }
  }
}
</style> 