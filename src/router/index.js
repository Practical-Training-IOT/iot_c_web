import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '@/utils/auth'

const routes = [
  {
    path: '/',
    name: 'DashboardView',
    component: () => import('../views/DashboardView.vue')
  },
  {
    path: '/device',
    name: 'DeviceListView',
    component: () => import('../views/DeviceListView.vue')
  },
  {
    path: '/device/:id',
    name: 'DeviceDetailView',
    component: () => import('../views/DeviceDetailView.vue')
  },
  {
    path: '/alarm',
    name: 'AlarmListView',
    component: () => import('../views/AlarmListView.vue')
  },
  {
    path: '/alarm/:id',
    name: 'AlarmDetailView',
    component: () => import('../views/AlarmDetailView.vue')
  },
  {
    path: '/scene',
    name: 'SceneListView',
    component: () => import('../views/SceneListView.vue')
  },
  {
    path: '/scene/:id',
    name: 'SceneDetailView',
    component: () => import('../views/SceneDetailView.vue')
  },
  {
    path: '/mine',
    name: 'MineView',
    component: () => import('../views/MineView.vue')
  },
  {
    path: '/login',
    name: 'LoginView',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'RegisterView',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/terms',
    name: 'TermsView',
    component: () => import('../views/TermsView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && to.path !== '/register' && !getToken()) {
    next('/login')
  } else {
    next()
  }
})

export default router 