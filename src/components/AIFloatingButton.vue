<template>
  <div class="ai-floating-button" @click="handleClick">
    <el-tooltip
      content="AI 助手"
      placement="left"
      :show-after="500"
    >
      <div class="button-content">
        <el-icon><i-ep-chat-dot-round /></el-icon>
      </div>
    </el-tooltip>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleClick = () => {
  router.push('/ai')
}
</script>

<style lang="scss" scoped>
.ai-floating-button {
  position: fixed;
  right: 20px;
  bottom: 80px;
  z-index: 1000;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  .button-content {
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

    .el-icon {
      font-size: 24px;
      color: #fff;
    }
  }
}
</style> 