<template>
  <div class="bottom-nav">
    <div v-for="item in navs" :key="item.name" class="nav-item" :class="{active: item.active}" @click="onNavClick(item)">
      <div class="icon"> <img :src="item.icon" alt=""></div>
      <div class="text">{{ item.text }}</div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue'

defineProps({
  navs: Array // [{name, text, icon, active}]
})
const emit = defineEmits(['nav-click'])
const onNavClick = (item) => {
  emit('nav-click', item)
}
</script>

<style lang="scss">
.bottom-nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 56px;
  background: #fff;
  border-top: 1px solid var(--border-color);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--text-regular);
    font-size: 12px;
    .icon {
      font-size: 22px;
      margin-bottom: 2px;
    }
    &.active {
      color: var(--primary-color);
    }
  }
}
</style>