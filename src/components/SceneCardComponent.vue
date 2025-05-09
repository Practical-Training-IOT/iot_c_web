<template>
  <el-card class="scene-card">
    <div class="scene-title-row">
      <span class="scene-title" @click.stop="$emit('click')">{{ props.scene.title }}</span>
      <el-switch :model-value="props.scene.enabled" @change="val => $emit('toggle', val)" size="large" />
    </div>
    <div class="scene-info">场景描述：{{ props.scene.desc }}</div>
    <div class="scene-info">创建时间：{{ props.scene.time }}</div>
    <el-button type="primary" size="small" class="exec-btn" @click="handleExecute">执行一次</el-button>
  </el-card>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
const props = defineProps({ scene: Object })
const emit = defineEmits(['click', 'toggle', 'execute'])
const handleExecute = (e) => {
  e.stopPropagation()
  emit('execute')
}
</script>

<style lang="scss" scoped>
.scene-card {
  border-radius: 10px;
  .scene-title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
    .scene-title {
      font-size: 17px;
      font-weight: bold;
      margin-right: 10px;
    }
  }
  .scene-info {
    font-size: 13px;
    color: var(--text-regular);
    margin-bottom: 2px;
  }
  .exec-btn {
    margin-top: 8px;
    background: #1a2347;
    border: none;
  }
}

.scene-title {
  cursor: pointer;
  color: #1a2347;
  text-decoration: underline;
}
</style> 