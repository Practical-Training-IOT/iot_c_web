<template>
  <el-card class="stat-card">
    <div class="icon-wrap">
      <slot name="icon"></slot>
    </div>
    <div class="stat-content">
      <div class="stat-title">{{ title }}</div>
      <div class="stat-main">{{ main }}</div>
      <div class="stat-sub" v-if="sub">{{ sub }}</div>
    </div>
  </el-card>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  title: String,
  main: String,
  sub: String
})
</script>

<style lang="scss" scoped>
.stat-card {
  display: flex;
  align-items: center;
  .icon-wrap {
    width: 48px;
    height: 48px;
    margin-right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .stat-content {
    flex: 1;
    .stat-title {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 4px;
    }
    .stat-main {
      font-size: 15px;
      color: var(--text-primary);
    }
    .stat-sub {
      font-size: 13px;
      color: var(--text-regular);
    }
  }
}
</style> 