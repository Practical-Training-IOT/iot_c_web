<template>
  <div class="ai-view">
    <!-- 功能選擇對話框 -->
    <el-dialog
      v-model="showFeatureSelect"
      title="选择功能"
      width="300px"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="feature-select">
        <el-button type="primary" @click="handleFeatureSelect('ai')" class="feature-btn">
          <el-icon><i-ep-chat-dot-round /></el-icon>
          AI 助手
        </el-button>
        <el-button type="primary" @click="handleFeatureSelect('map')" class="feature-btn">
          <el-icon><i-ep-map /></el-icon>
          地图
        </el-button>
      </div>
    </el-dialog>

    <!-- AI 功能 -->
    <div v-if="selectedFeature === 'ai'">
      <div class="area">
        <div class="container">
          <h2 data-splitting class="headline headline--float">AI助手</h2>
        </div>
        <ul class="circles">
          <li v-for="n in 10" :key="n"></li>
        </ul>
      </div>

      <div class="content-wrapper">
        <div class="top-bar">
          <el-button circle size="small" class="back-btn" @click="router.back()">
            <el-icon><i-ep-back /></el-icon>
          </el-button>
          <span class="title">AI 助手</span>
          <div class="right-buttons">
            <el-button circle size="small" class="history-btn" @click="toggleHistory">
              <el-icon><i-ep-time /></el-icon>
            </el-button>
            <el-button circle size="small" class="new-chat-btn" @click="startNewChat">
              <el-icon><i-ep-plus /></el-icon>
            </el-button>
            <el-button circle size="small" class="setting-btn">
              <el-icon><i-ep-setting /></el-icon>
            </el-button>
          </div>
        </div>

        <div class="history-sidebar" :class="{ 'show': showHistory }">
          <div class="history-header">
            <h3>历史记录</h3>
            <el-button type="text" @click="toggleHistory">
              <el-icon><i-ep-close /></el-icon>
            </el-button>
          </div>
          <div class="history-content">
            <div v-for="(history, index) in chatHistory" :key="index" 
                 class="history-item" @click="loadHistory(history)">
              <div class="history-title">{{ history.title }}</div>
              <div class="history-time">{{ history.created_at }}</div>
            </div>
          </div>
          <div class="history-footer">
            <el-button type="primary" class="new-chat-btn" @click="startNewChat">
              <el-icon><i-ep-plus /></el-icon>
              新聊天
            </el-button>
          </div>
        </div>

        <div class="chat-container" ref="chatContainer">
          <div v-for="(message, index) in messages" :key="index"
               :class="['message', message.type === 'user' ? 'user-message' : 'ai-message']">
            <div class="avatar">
              <el-icon v-if="message.type === 'user'"><User /></el-icon>
              <img v-else :src="getAIAvatar(message.model)" alt="AI Avatar" class="ai-avatar" />
            </div>
            <div class="message-content">
              <div v-if="message.thinking" class="thinking-process" v-html="message.thinking"></div>
              <div v-html="formatMessage(message.content)"></div>
            </div>
          </div>
          <div v-if="isLoading" class="loading">
            <el-icon class="is-loading"><i-ep-loading /></el-icon>
          </div>
        </div>

        <div class="input-area">
          <div class="model-selector">
            <el-button type="primary" @click="handleButton1">DEEPSEEK</el-button>
            <el-button type="primary" @click="handleButton2">通义千问</el-button>
          </div>
          <el-input
            v-model="inputMessage"
            placeholder="请输入您的问题..."
            :disabled="isLoading"
            @keyup.enter="sendMessage"
          >
            <template #append>
              <el-button :loading="isLoading" @click="sendMessage">
                <el-icon><i-ep-position /></el-icon>
              </el-button>
            </template>
          </el-input>
          <span class="gray-centered">董博开发</span>
        </div>
      </div>
    </div>

    <!-- 地圖功能 -->
    <MapView v-else-if="selectedFeature === 'map'" @back="selectedFeature = ''" />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User } from '@element-plus/icons-vue'
import deepseek from '@/assets/deepseek.svg'
import qwen from '@/assets/qwen.svg'
import Splitting from 'splitting'
import {aiChange, aiChat, getAiHistory, getAiOneHistory} from "@/api/ai";
import MapView from '@/components/MapView.vue'

const router = useRouter()
const chatContainer = ref(null)
const inputMessage = ref('')
const isLoading = ref(false)
const showHistory = ref(false)
const chatHistory = ref([])
const aiScen = ref(0)
const showFeatureSelect = ref(false)
const selectedFeature = ref('')

// 模型頭像映射
const modelAvatars = {
  'qwen3': qwen,
  'deepseek-r1': deepseek
}

// 獲取AI頭像
const getAIAvatar = (model) => {
  return modelAvatars[model] || deepseek
}

// 聊天消息列表
const messages = ref([
  { type: 'ai', content: '您好！我是您的 AI 助手，有什么我可以帮您的吗？', model: 'deepseek-r1' }
])

// 底部導航
const navs = ref([
  { name: 'home', text: '首页', icon: 'i-ep-home', active: false },
  { name: 'device', text: '设备', icon: 'i-ep-cpu', active: false },
  { name: 'alarm', text: '告警', icon: 'i-ep-bell', active: false },
  { name: 'scene', text: '场景', icon: 'i-ep-sunny', active: false },
  { name: 'ai', text: 'AI', icon: 'i-ep-chat-dot-round', active: true },
  { name: 'mine', text: '我的', icon: 'i-ep-user', active: false }
])

/*const onNavClick = (item) => {
  navs.value.forEach(n => n.active = n.name === item.name)
  if (item.name === 'home') router.push('/')
  if (item.name === 'device') router.push('/device')
  if (item.name === 'alarm') router.push('/alarm')
  if (item.name === 'scene') router.push('/scene')
  if (item.name === 'ai') router.push('/ai')
  if (item.name === 'mine') router.push('/mine')
}*/

// 切換歷史記錄側邊欄
const toggleHistory = () => {
  showHistory.value = !showHistory.value
  if (showHistory.value) {
    getChatHistory()
  }
}

// 獲取歷史記錄
const getChatHistory = async () => {
  try {
    const response = await getAiHistory()
    chatHistory.value = response.data.list || []
  } catch (error) {
    console.error('获取历史记录失败:', error)
    ElMessage.error('获取历史记录失败')
  }
}

// 加載歷史記錄
const loadHistory = async (history) => {
  try {
    const response = await getAiOneHistory({id: history.id})
    if (response.code === 200 && response.data.chat) {
      // 重新組織消息順序
      const newMessages = []
      response.data.chat.forEach(chat => {
        // 添加用戶消息
        newMessages.push({
          type: 'user',
          content: chat.req
        })
        // 添加 AI 消息
        newMessages.push({
          type: 'ai',
          content: chat.message.replace(/<think>[\s\S]*?<\/think>/gi, '').trim(),
          thinking: (chat.message.match(/<think>([\s\S]*?)<\/think>/i) || [])[1]?.trim() || '',
          model: chat.model
        })
      })
      messages.value = newMessages
      aiScen.value = response.data.id
      showHistory.value = false
    }
  } catch (error) {
    console.error('加载历史记录失败:', error)
    ElMessage.error('加载历史记录失败')
  }
}

// 開始新聊天
const startNewChat = () => {
  aiScen.value = 0
  messages.value = [{ type: 'ai', content: '您好！我是您的 AI 助手，有什么我可以帮您的吗？', model: 'deepseek-r1' }]
  showHistory.value = false
}

// 切換模型
const handleButton1 = async () => {
  try {
    const response = await aiChange({message: 'deepseek-r1'})
    if (response.code === 200) {
      ElMessage.success('DEEPSEEK为您服务')
    }
  } catch (error) {
    ElMessage.error('切换模型失败')
  }
}

const handleButton2 = async () => {
  try {
    const response = await aiChange({message: 'qwen3'})
    if (response.code === 200) {
      ElMessage.success('通义千问为您服务')
    }
  } catch (error) {
    ElMessage.error('切换模型失败')
  }
}

// 發送消息
const sendMessage = async () => {
  if (!inputMessage.value.trim()) return
  
  const userMessage = inputMessage.value
  messages.value.push({
    type: 'user',
    content: userMessage
  })
  
  inputMessage.value = ''
  isLoading.value = true
  
  try {
    const response = await aiChat({
      message: userMessage, 
      id: aiScen.value 
    })

    if (response.code === 200) {
      let botReply = response.data.message || '暂无回复'
      const thinkingMatch = botReply.match(/<think>([\s\S]*?)<\/think>/i)
      const thinkingContent = thinkingMatch ? thinkingMatch[1].trim() : ''
      botReply = botReply.replace(/<think>[\s\S]*?<\/think>/gi, '').trim()

      messages.value.push({
        type: 'ai',
        content: botReply,
        thinking: thinkingContent,
        model: response.data.model
      })

      if (response.data.id) {
        aiScen.value = response.data.id
      }
    } else {
      ElMessage.error(response.msg || '请求失败')
    }
  } catch (error) {
    console.error('请求失败:', error)
    ElMessage.error('请求失败，请稍后再试')
  } finally {
    isLoading.value = false
    await nextTick()
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

// 格式化消息
const formatMessage = (text) => {
  if (!text) return ''
  return text
    .replace(/^### (.*)$/gm, '<h3>$1</h3>')
    .replace(/^## (.*)$/gm, '<h2>$1</h2>')
    .replace(/^# (.*)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>')
}

// 添加功能選擇方法
const handleFeatureSelect = (feature) => {
  selectedFeature.value = feature
  showFeatureSelect.value = false
}

onMounted(() => {
  showFeatureSelect.value = true
  navs.value.forEach(n => n.active = n.name === 'ai')
})
Splitting({
  target: '.headline--float', // 指定要处理的类名（更精确）
})
</script>

<style lang="scss" scoped>
.ai-view {
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;

  .area {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: #4e54c8;
    background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);
    z-index: 0;
  }

  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    padding: 0;

    li {
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      background: rgba(255, 255, 255, 0.2);
      animation: animate 25s linear infinite;
      bottom: -150px;

      &:nth-child(1) {
        left: 25%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
      }

      &:nth-child(2) {
        left: 10%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 12s;
      }

      &:nth-child(3) {
        left: 70%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
      }

      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 18s;
      }

      &:nth-child(5) {
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
      }

      &:nth-child(6) {
        left: 75%;
        width: 110px;
        height: 110px;
        animation-delay: 3s;
      }

      &:nth-child(7) {
        left: 35%;
        width: 150px;
        height: 150px;
        animation-delay: 7s;
      }

      &:nth-child(8) {
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 45s;
      }

      &:nth-child(9) {
        left: 20%;
        width: 15px;
        height: 15px;
        animation-delay: 2s;
        animation-duration: 35s;
      }

      &:nth-child(10) {
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 11s;
      }
    }
  }

  @keyframes animate {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
      border-radius: 0;
    }

    100% {
      transform: translateY(-1000px) rotate(720deg);
      opacity: 0;
      border-radius: 50%;
    }
  }

  .content-wrapper {
    position: relative;
    z-index: 1;
    min-height: 100vh;
    width: 100%;
    background: transparent;
    padding-bottom: 80px;

    .top-bar {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 48px;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      .title {
        font-size: 18px;
        font-weight: bold;
      }
      .back-btn {
        position: absolute;
        left: 16px;
        top: 8px;
        background: rgba(245, 245, 245, 0.9);
        border: none;
      }
      .right-buttons {
        position: absolute;
        right: 16px;
        top: 8px;
        display: flex;
        gap: 8px;
        .new-chat-btn, .setting-btn {
          background: rgba(245, 245, 245, 0.9);
          border: none;
        }
      }
    }

    .history-sidebar {
      position: fixed;
      top: 48px;
      left: -280px;
      width: 280px;
      height: calc(100vh - 48px);
      background: #fff;
      z-index: 110;
      transition: left 0.3s ease;
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;

      &.show {
        left: 0;
      }

      .history-header {
        padding: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid var(--border-color);
        h3 {
          margin: 0;
          font-size: 16px;
        }
      }

      .history-content {
        flex: 1;
        overflow-y: auto;
        padding: 16px;

        .history-item {
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 8px;
          cursor: pointer;
          transition: background-color 0.3s;

          &:hover {
            background-color: var(--background-light);
          }

          .history-title {
            font-size: 14px;
            margin-bottom: 4px;
          }

          .history-time {
            font-size: 12px;
            color: var(--text-secondary);
          }
        }
      }

      .history-footer {
        padding: 16px;
        border-top: 1px solid var(--border-color);

        .new-chat-btn {
          width: 100%;
        }
      }
    }

    .chat-container {
      flex: 1;
      padding: 16px;
      margin-top: 48px;
      margin-bottom: 120px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 16px;

      .message {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        max-width: 80%;

        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          
          .el-icon {
            font-size: 20px;
            color: var(--text-regular);
          }

          .ai-avatar {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
          }
        }

        .message-content {
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 14px;
          line-height: 1.5;
          word-break: break-word;
        }

        &.user-message {
          align-self: flex-end;
          flex-direction: row-reverse;

          .message-content {
            background: var(--primary-color);
            color: #fff;
          }
        }

        &.ai-message {
          align-self: flex-start;

          .message-content {
            background: #fff;
            color: var(--text-primary);
          }
        }

        .thinking-process {
          font-size: 12px;
          color: var(--text-secondary);
          margin-bottom: 8px;
          padding: 8px;
          background: rgba(0, 0, 0, 0.05);
          border-radius: 4px;
        }
      }

      .loading {
        display: flex;
        justify-content: center;
        padding: 16px;
        color: var(--text-secondary);
      }
    }

    .input-area {
      padding: 16px;
      background: #fff;
      border-top: 1px solid var(--border-color);
      position: fixed;
      bottom: 0px;
      left: 0;
      right: 0;
      z-index: 100;

      .model-selector {
        display: flex;
        gap: 8px;
        margin-bottom: 8px;
      }

      :deep(.el-input-group__append) {
        padding: 0;
        .el-button {
          border: none;
          padding: 0 16px;
          height: 100%;
        }
      }
    }
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 102;
  }
}

$colors: #4e54c8;

* {
  box-sizing: border-box;
}

html, body {
  height: 100%;
}

.container {
  max-height: 100vh;
  overflow-y: scroll;
  position: relative;
  scroll-snap-type: y mandatory;
  -webkit-overflow-scrolling: touch;
}

.headline {
  align-items: center;
  background-color: var(--color);
  display: flex;
  font-family: 'Lexend Deca', sans-serif;
  font-weight: 700;
  font-size: calc(1rem + 15vmin);
  height: 100vh;
  justify-content: center;
  overflow: hidden;
  perspective: 1000px;
  scroll-snap-align: start;
  width: 100vw;

  // 设置每个 .headline 的背景颜色（这里只有一个）
  @for $i from 1 through length($colors) {
    &:nth-child(#{$i}) {
      --color: #{nth($colors, $i)};
    }
  }
}

.word,
.char {
  animation-delay: var(--del);
  animation-direction: var(--dir, normal);
  animation-duration: var(--dur);
  animation-iteration-count: var(--it, infinite);
  animation-name: var(--name);
  animation-timing-function: var(--tf);
  animation-fill-mode: var(--fill, forwards);
  display: inline-block;
  position: relative;
  transform-origin: 50% 100%;
  z-index: 1;
}

// =========================
// Headline: Float Animation
// =========================

.headline--float {
  .char {
    --name: float;
    --dur: 2200ms;
    --del: calc(var(--char-index) * -0.5s);
    --tf: ease-in-out;
    --dir: alternate;

    &:nth-child(2n) {
      --name: float-alt;
    }
  }

  @keyframes float {
    from {
      transform: translate(2%, -10%) rotate(-1deg);
    }
    to {
      transform: translate(-2%, 5%) rotate(3deg);
    }
  }

  @keyframes float-alt {
    from {
      transform: translate(0%, -5%) rotate(-1deg);
    }
    to {
      transform: translate(2%, 10%) rotate(3deg);
    }
  }
}

.container {
  max-height: 100vh;
  overflow-y: scroll;
  position: relative;
  scroll-snap-type: y mandatory;
  -webkit-overflow-scrolling: touch;
}

.gray-centered {
  font-size: 80%;
  color: gray; /* 置灰 */
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中（如果包含在一个有高度的容器内） */
}

.feature-select {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;

  .feature-btn {
    height: 48px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    .el-icon {
      font-size: 20px;
    }
  }
}
</style> 