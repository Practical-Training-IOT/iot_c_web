<template>
  <router-view />
  <BottomNavComponent v-if="showTabbar" :navs="navs" @nav-click="onNavClick" />
</template>

<script setup>
import { useThemeStore } from './stores/theme'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BottomNavComponent from '@/components/BottomNavComponent.vue'
import * as Icons from '@element-plus/icons-vue'

const themeStore = useThemeStore()
const route = useRoute()
const router = useRouter()

onMounted(() => {
  themeStore.initTheme()
})

// 全局底部導航
const navs = ref([
  { name: 'home', text: '首页', icon: Icons.EpHome, active: false },
  { name: 'device', text: '设备', icon: Icons.EpCpu, active: false },
  { name: 'alarm', text: '告警', icon: Icons.EpBell, active: false },
  { name: 'scene', text: '场景', icon: Icons.EpSunny, active: false },
  { name: 'mine', text: '我的', icon: Icons.User, active: false }
])
const showTabbar = ref(true)

const updateTabbar = () => {
  // 根據路由顯示/隱藏 tabbar
  const tabbarPages = ['/', '/device', '/alarm', '/scene', '/mine']
  showTabbar.value = tabbarPages.includes(route.path)
  // 根據路由高亮
  navs.value.forEach(n => n.active = (n.name === getTabNameByPath(route.path)))
}
const getTabNameByPath = (path) => {
  if (path === '/') return 'home'
  if (path.startsWith('/device')) return 'device'
  if (path.startsWith('/alarm')) return 'alarm'
  if (path.startsWith('/scene')) return 'scene'
  if (path.startsWith('/mine')) return 'mine'
  return ''
}
const onNavClick = (item) => {
  if (item.name === 'home') router.push('/')
  if (item.name === 'device') router.push('/device')
  if (item.name === 'alarm') router.push('/alarm')
  if (item.name === 'scene') router.push('/scene')
  if (item.name === 'mine') router.push('/mine')
}

watch(route, updateTabbar, { immediate: true })
</script>

<style lang="scss">
#app {
  width: 100%;
}
</style>
