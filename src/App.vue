<template>
  <router-view />
  <BottomNavComponent v-if="showTabbar" :navs="navs" @nav-click="onNavClick" />
</template>

<script setup>
import { useThemeStore } from './stores/theme'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BottomNavComponent from '@/components/BottomNavComponent.vue'

const themeStore = useThemeStore()
const route = useRoute()
const router = useRouter()

onMounted(() => {
  themeStore.initTheme()
})

// 全局底部導航
const navs = ref([
  { name: 'home', text: '首页', icon: 'i-ep-home', active: false },
  { name: 'device', text: '设备', icon: 'i-ep-cpu', active: false },
  { name: 'alarm', text: '告警', icon: 'i-ep-bell', active: false },
  { name: 'scene', text: '场景', icon: 'i-ep-sunny', active: false },
  { name: 'mine', text: '我的', icon: 'i-ep-user', active: false }
])
const showTabbar = ref(true)

const updateTabbar = () => {
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
  if (path.startsWith('/ai')) return 'ai'
  if (path.startsWith('/mine')) return 'mine'
  return ''
}
const onNavClick = (item) => {
  if (item.name === 'home') router.push('/')
  if (item.name === 'device') router.push('/device')
  if (item.name === 'alarm') router.push('/alarm')
  if (item.name === 'scene') router.push('/scene')
  if (item.name === 'ai') router.push('/ai')
  if (item.name === 'mine') router.push('/mine')
}

watch(route, updateTabbar, { immediate: true })
</script>

<style lang="scss">
#app {
  width: 100%;
}
</style>
