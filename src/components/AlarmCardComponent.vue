<template>
  <el-card class="alarm-card">
    <div class="alarm-title-row">
      <span class="alarm-title" @click.stop="$emit('click')">{{ props.alarm.title }}</span>
      <el-switch :model-value="props.alarm.enabled" @change="handleToggle" size="large" />
    </div>
    <div class="alarm-info">告警类型：{{ props.alarm.type }}</div>
    <div class="alarm-info">
      告警级别：
      <el-tag :type="levelType(props.alarm.level)" size="small">{{ props.alarm.level }}</el-tag>
    </div>
    <div class="alarm-info">告警规则描述：{{ props.alarm.desc }}</div>
    <div class="alarm-info">创建时间：{{ props.alarm.time }}</div>
  </el-card>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
const props = defineProps({ alarm: Object })
const emit = defineEmits(['click', 'toggle'])
const levelType = (level) => {
  if (level === '紧急') return 'danger'
  if (level === '重要') return 'primary'
  if (level === '次要') return 'info'
  if (level === '提示') return 'success'
  return 'default'
}
const handleToggle = (val, e) => {
  if (e && e.stopPropagation) e.stopPropagation()
  emit('toggle', val)
}
</script>

<style lang="scss" scoped>
.alarm-card {
  border-radius: 10px;
  .alarm-title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
    .alarm-title {
      font-size: 17px;
      font-weight: bold;
      margin-right: 10px;
      cursor: pointer;
      color: #1a2347;
      text-decoration: underline;
    }
  }
  .alarm-info {
    font-size: 13px;
    color: var(--text-regular);
    margin-bottom: 2px;
  }
}
</style> 