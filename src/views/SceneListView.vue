<template>
  <div class="scene-list-view">
    <!-- 頂部欄 -->
    <div class="top-bar">
      <span class="title">场景列表</span>
      <el-button circle size="small" class="setting-btn"><el-icon><i-ep-more /></el-icon></el-button>
    </div>

    <!-- 标签切换 -->
    <el-tabs v-model="tab" class="tabs-bar">
      <el-tab-pane label="全部" name="all" />
      <el-tab-pane label="已启动" name="enabled" />
      <el-tab-pane label="已停止" name="disabled" />
    </el-tabs>

    <!-- 搜索框 -->
    <el-input v-model="search" placeholder="请输入搜索" class="search-bar" clearable prefix-icon="el-icon-search" />

    <!-- 场景卡片列表 -->
    <div class="scene-list">
      <SceneCardComponent
        v-for="scene in filteredScenes"
        :key="scene.id"
        :scene="scene"
        @toggle="onToggle(scene, $event)"
        @execute="onExecute(scene)"
        @click="onSceneClick(scene)"
      />
    </div>

    <!-- 底部導航欄 -->
    <BottomNavComponent :navs="navs" @nav-click="onNavClick"/>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SceneCardComponent from '@/components/SceneCardComponent.vue'
import BottomNavComponent from '@/components/BottomNavComponent.vue'
import * as Icons from '@element-plus/icons-vue'

const { ElIcon, EpHome, EpCpu, EpBell, EpSunny, EpUser } = Icons
const router = useRouter()

// 标签切换
const tab = ref('all')
const search = ref('')

// 底部導航
const navs = ref([
  { name: 'home', text: '首页', icon: EpHome, active: false },
  { name: 'device', text: '设备', icon: EpCpu, active: false },
  { name: 'alarm', text: '告警', icon: EpBell, active: false },
  { name: 'scene', text: '场景', icon: EpSunny, active: true },
  { name: 'mine', text: '我的', icon: EpUser, active: false }
])

const onNavClick = (item) => {
  navs.value.forEach(n => n.active = n.name === item.name)
  if (item.name === 'home') router.push('/')
  if (item.name === 'device') router.push('/device')
  if (item.name === 'alarm') router.push('/alarm')
  if (item.name === 'scene') router.push('/scene')
  if (item.name === 'mine') router.push('/mine')
}

// 场景列表（预留接口）
const scenes = ref([
  { id: 1, title: '场景', enabled: false, desc: '123123', time: '2024年12月06日 10:55:42' },
  { id: 2, title: 'aaaewew', enabled: false, desc: '34345', time: '2024年12月05日 16:43:11' },
  { id: 3, title: '诺德总部大楼项目', enabled: false, desc: '-', time: '2024年11月28日 11:27:04' },
  { id: 4, title: 'a20240510', enabled: true, desc: '-', time: '2024年11月28日 11:27:04' }
])

// 过滤场景
const filteredScenes = computed(() => {
  let list = scenes.value
  if (tab.value === 'enabled') list = list.filter(a => a.enabled)
  if (tab.value === 'disabled') list = list.filter(a => !a.enabled)
  if (search.value) list = list.filter(a => a.title.includes(search.value))
  return list
})

const onToggle = (scene, val) => {
  scene.enabled = val
  // TODO: 调用接口更新状态
}
const onExecute = (scene) => {
  // TODO: 调用接口执行场景
  alert(`执行场景：${scene.title}`)
}

const onSceneClick = (scene) => {
  router.push(`/scene/${scene.id}`)
}

onMounted(() => {
  window.scrollTo(0, 0)
  navs.value.forEach(n => n.active = n.name === 'scene')
})
</script>

<style lang="scss" scoped>
.scene-list-view {
  min-height: 100vh;
  width: 100%;
  background: var(--background-light);
  padding-bottom: 80px; // 增加底部預留空間
  position: relative; // 添加相對定位
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
    .setting-btn {
      position: absolute;
      right: 16px;
      top: 8px;
      background: #f5f5f5;
      border: none;
    }
  }
  .tabs-bar {
    margin: 0;
    background: #fff;
    .el-tabs__nav {
      width: 100%;
      display: flex;
      justify-content: space-around;
    }
  }
  .search-bar {
    margin: 8px 12px;
    background: #fff;
    border-radius: 8px;
    width: calc(100% - 24px);
  }
  .scene-list {
    margin: 16px 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-bottom: 20px; // 添加內容底部間距
  }
}
</style> 