import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './styles/index.scss'

const app = createApp(App)

// 修复后的图标注册方式
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  // 将图标名称转换为 i-ep-xxx 短横线格式
  const iconName = `i-ep-${key.replace('IEp', '').toLowerCase()}`
  app.component(iconName, component)
}

// 单独注册 More 图标（可选，循环已包含）
app.component('i-ep-more', ElementPlusIconsVue.More)

app.use(ElementPlus)
app.use(createPinia())
app.use(router)
app.mount('#app')
