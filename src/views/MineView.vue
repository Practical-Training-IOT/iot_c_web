<template>
  <div class="mine-view">
    <!-- 頂部欄 -->
    <div class="top-bar">
      <span class="title">我的</span>
      <el-button circle size="small" class="setting-btn"><el-icon><i-ep-more /></el-icon></el-button>
    </div>

    <!-- 用戶信息卡片 -->
    <div class="user-card">
      <!-- 👇 替换为动态头像并添加点击上传 -->
      <div class="avatar-container" @click="triggerFileInput">
        <img v-if="formData.avatar" :src="formData.avatar" alt="avatar" class="avatar" />
        <img v-else src="https://img.yzcdn.cn/vant/cat.jpeg" alt="default avatar" class="avatar" />

        <!-- 隐藏的文件输入 -->
        <input
            type="file"
            accept="image/*"
            @change="handleAvatarChange"
            ref="fileInput"
            class="hidden-file-input"
        />
      </div>

      <div class="user-info">
        <div class="user-name">{{ formData.username }}</div>
      </div>
    </div>

    <el-card class="info-card">
      <div class="info-row">
        <span class="label">部门</span>
        <span class="value">{{ formData.department }}</span>
      </div>
      <div class="info-row">
        <span class="label">邮箱</span>
        <span class="value">{{ formData.email }}</span>
      </div>
      <div class="info-row">
        <span class="label">电话</span>
        <span class="value">{{ formData.phone }}</span>
      </div>
    </el-card>

    <!-- 编辑用户资料按钮 -->
    <a rel="noopener noreferrer" class="shiny-button about-button" @click="openEditDialog">
      编辑用户资料
    </a>

    <a href="http://117.27.231.112:83" target="_blank" rel="noopener noreferrer" class="shiny-button about-button">
      关于
    </a>

    <!-- 底部導航欄 -->
    <BottomNavComponent :navs="navs" @nav-click="onNavClick" />
    <el-button type="danger" @click="onLogout" style="width:100%;margin-top:24px;">退出登录</el-button>

    <!-- 弹窗表单 -->
    <el-dialog v-model="editDialogVisible" title="编辑用户资料" width="90%" :close-on-click-modal="false">
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" />
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="formData.department" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model.number="formData.phone" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editForm">取消</el-button>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BottomNavComponent from '@/components/BottomNavComponent.vue'
import * as Icons from '@element-plus/icons-vue'
import { removeToken } from '@/utils/auth'
import { getUserInfo, updateUserInfo, uploadAvatar } from '@/api/user' // 假设你有 uploadAvatar 接口
import { ElMessage } from 'element-plus'

const { ElIcon, EpHome, EpCpu, EpBell, EpSunny, EpUser } = Icons
const router = useRouter()

// 表单数据
const formData = ref({
  username: '',
  department: '',
  email: '',
  phone: '',
  avatar: ''
})

// 控制弹窗
const editDialogVisible = ref(false)

// 文件上传 input 引用
const fileInput = ref(null)

// 表单验证规则
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  department: [{ required: true, message: '请输入部门', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
  ],
  phone: [
    { required: true, message: '请输入电话号码', trigger: 'blur' },
    { type: 'number', message: '必须为数字值', trigger: 'blur' }
  ]
}

// 底部导航
const navs = ref([
  { name: 'home', text: '首页', icon: EpHome, active: false },
  { name: 'device', text: '设备', icon: EpCpu, active: false },
  { name: 'alarm', text: '告警', icon: EpBell, active: false },
  { name: 'scene', text: '场景', icon: EpSunny, active: false },
  { name: 'mine', text: '我的', icon: EpUser, active: true }
])

const onNavClick = (item) => {
  navs.value.forEach(n => (n.active = n.name === item.name))
  if (item.name === 'home') router.push('/')
  if (item.name === 'device') router.push('/device')
  if (item.name === 'alarm') router.push('/alarm')
  if (item.name === 'scene') router.push('/scene')
  if (item.name === 'mine') router.push('/mine')
}

const onLogout = () => {
  removeToken()
  router.push('/login')
}

onMounted(() => {
  window.scrollTo(0, 0)
  navs.value.forEach(n => (n.active = n.name === 'mine'))
  getTableData()
})

// 获取用户信息
const getTableData = async () => {
  const res = await getUserInfo()
  if (res.code === 200) {
    formData.value = {
      username: res.data.username,
      department: res.data.department,
      email: res.data.email,
      phone: res.data.phone,
      avatar: res.data.avatar || ''
    }
  } else if (res.code === 401) {
    ElMessage.error('登录失效请重新登录')
    await router.push('/login')
  } else if (res.code === 400) {
    ElMessage.error('信息获取失败')
  } else {
    ElMessage.error('未知错误，请联系管理员')
  }
}

// 打开编辑弹窗
const openEditDialog = () => {
  editDialogVisible.value = true
}

// 提交表单
const formRef = ref(null)
const submitForm = () => {
  formRef.value.validate(async valid => {
    if (valid) {
      try {
        const res = await updateUserInfo(formData.value)
        if (res.code === 200) {
          ElMessage.success('保存成功')
          editDialogVisible.value = false
        } else {
          ElMessage.error('保存失败')
        }
      } catch (err) {
        ElMessage.error('网络异常')
      }
    } else {
      return false
    }
  })
}

// 取消编辑
const editForm = () => {
  editDialogVisible.value = false
}

// 点击头像触发文件选择框
const triggerFileInput = () => {
  fileInput.value.click()
}

// 处理头像上传
const handleAvatarChange = async event => {
  const file = event.target.files[0]
  if (!file) return

  const isValidType = ['image/jpeg', 'image/png'].includes(file.type)
  const isValidSize = file.size / 1024 / 1024 < 2

  if (!isValidType) {
    ElMessage.error('只能上传 JPG/PNG 格式的图片！')
    return
  }

  if (!isValidSize) {
    ElMessage.error('图片大小不能超过 2MB！')
    return
  }

  const formDataUpload = new FormData()
  formDataUpload.append('avatar', file)

  try {
    const res = await uploadAvatar(formDataUpload)
    if (res.code === 200) {
      formData.value.avatar = res.data.url // 假设返回的是图片 URL
      ElMessage.success('头像上传成功')
    } else {
      ElMessage.error('头像上传失败')
    }
  } catch (err) {
    ElMessage.error('上传出错，请重试')
  } finally {
    fileInput.value.value = null // 清空 input，以便下次选择相同文件
  }
}
</script>

<style lang="scss" scoped>
.hidden-file-input {
  display: none;
}

.avatar-container {
  position: relative;
  cursor: pointer;

  &:hover::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 16px;
    font-weight: bold;
  }
}

.avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  border: 4px solid #fff;
  background: #fff;
  margin-bottom: 12px;
}

.mine-view {
  min-height: 100vh;
  width: 100%;
  background: var(--background-light);
  padding-bottom: 80px;
  position: relative;
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
  .user-card {
    background: #232e43;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 0 24px 0;
    border-bottom-left-radius: 32px;
    border-bottom-right-radius: 32px;
    .user-info {
      .user-name {
        color: #fff;
        font-size: 28px;
        font-weight: bold;
        text-align: center;
      }
    }
  }
  .info-card {
    margin: 24px 16px;
    border-radius: 18px;
    padding-bottom: 20px;
    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;
      font-size: 16px;
      border-bottom: 1px solid #f0f0f0;
      &:last-child {
        border-bottom: none;
      }
      .label {
        color: #333;
      }
      .value {
        color: #999;
      }
    }
  }
  .shiny-button {
    width: fit-content;
    position: relative;
    margin: 2rem auto;
    padding: 1rem 9rem;
    color: rgb(207, 248, 255);
    border: 3px solid transparent;
    border-radius: 60px;
    background-color: #1e3a8a;
    background-image:
        linear-gradient(to bottom right, #1d4ed8, #3b82f6),
        linear-gradient(125deg, rgba(255,255,255,0) 45%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 53%);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    background-size: 100%, 200%;
    background-position: 0px, -250px;
    animation: 4s border-glint linear infinite;
    animation-delay: 1s;
    box-shadow: rgba(0,0,0,0.6) 8px 8px 8px;
    text-shadow: 0px 0px 4px rgba(255,255,255,0.1);
    transition: box-shadow 0.25s, text-shadow 0.25s;
    overflow: hidden;
    display: block;
    text-align: center;
    text-decoration: none;
    font-family: "Roboto", sans-serif;
    font-size: 16px;
  }

  .shiny-button:hover {
    background-image:
        linear-gradient(to bottom right, #1d4ed8, #3b82f6),
        linear-gradient(125deg, rgba(255,255,255,0) 45%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 53%);
    color: rgb(250, 250, 255);
    box-shadow: rgba(0,0,0,0.7) 5px 5px 5px;
    text-shadow: 0px 0px 3px rgba(255,255,255,0.7);
  }

  .shiny-button::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -120%;
    width: 200%;
    height: 200%;
    background-image: linear-gradient(125deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 52%);
    animation: 4s glint linear infinite;
    animation-delay: -3s;
  }

  @keyframes glint {
    0% { left: -120%; }
    8% { left: 50%; }
    100% { left: 50%; }
  }

  @keyframes border-glint {
    0% { background-position: 0px, -250px; }
    25% { background-position: 0px, -200px; }
    75% { background-position: 0px, 50px; }
    100% { background-position: 0px, 50px; }
  }
}
</style>