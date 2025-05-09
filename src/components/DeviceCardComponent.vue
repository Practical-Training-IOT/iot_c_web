<template>
  <el-card class="device-card" @click="handleClick">
    <div class="device-title-row">
      <span class="device-title">{{ props.device.name }}</span>
      <el-tag :type="statusType(props.device.status)" size="small">{{ props.device.status }}</el-tag>
    </div>
    <div class="device-info">设备类型：{{ props.device.type }}</div>
    <div class="device-info">最近在线时间：{{ props.device.lastOnline }}</div>
  </el-card>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
const props = defineProps({ device: Object })
const emit = defineEmits(['device-click'])
const handleClick = () => {
  emit('device-click', props.device)
}
const statusType = (status) => {
  if (status === '在线') return 'success'
  if (status === '离线') return 'info'
  if (status === '未激活') return 'primary'
  return 'default'
}
</script>

<style lang="scss" scoped>
.device-card {
  border-radius: 10px;
  .device-title-row {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    .device-title {
      font-size: 17px;
      font-weight: bold;
      margin-right: 10px;
    }
  }
  .device-info {
    font-size: 13px;
    color: var(--text-regular);
    margin-bottom: 2px;
  }
}
</style> 