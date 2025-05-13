<template>
  <div class="bottom-nav">
    <div
        v-for="item in navs"
        :key="item.name"
        class="nav-item"
        :class="{ active: item.active }"
        @click="onNavClick(item)"
    >
      <!-- 修改点1：使用 Element Plus 图标组件 -->
      <div class="icon">
        <el-icon>
          <component :is="item.icon" /> <!-- 动态渲染图标组件 -->
        </el-icon>
      </div>
      <div class="text">{{ item.text }}</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  navs: { // 修改点2：定义更严格的类型
    type: Array,
    required: true,
    validator: (value) => {
      return value.every(item =>
          'name' in item &&
          'text' in item &&
          'icon' in item &&
          'active' in item
      )
    }
  }
})

const emit = defineEmits(['nav-click'])

const onNavClick = (item) => {
  emit('nav-click', item)
}
</script>

<style lang="scss" scoped>
.bottom-nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 56px;
  background: #fff;
  border-top: 1px solid var(--el-border-color);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;

  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--el-text-color-regular);
    font-size: 12px;
    cursor: pointer;
    transition: color 0.3s ease;

    .icon {
      :deep(svg) {  /* 修改点3：适配图标样式 */
        width: 22px;
        height: 22px;
        margin-bottom: 2px;
        fill: currentColor; /* 继承当前文字颜色 */
      }
    }

    &.active {
      color: var(--el-color-primary);
    }

    &:hover {
      color: var(--el-color-primary-light-3);
    }
  }
}
</style>
