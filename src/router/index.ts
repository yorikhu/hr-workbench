import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// 导入各系统的路由
import { dashboardRoutes } from './routes/index'
import { employeesRoutes } from './routes/employees'
import { documentsRoutes } from './routes/documents'
import { transfersRoutes } from './routes/transfers'
import { benefitsRoutes } from './routes/benefits'
import { salaryRoutes } from './routes/salary'
import { recruitmentRoutes } from './routes/recruitment'
import { attendanceRoutes } from './routes/attendance'
import { performanceRoutes } from './routes/performance'
import { trainingRoutes } from './routes/training'
import { adminRoutes } from './routes/admin'

// 定义 Layout 类型
type LayoutType = 'main' | 'admin' | 'simple' | 'portal'

// 扩展 RouteMeta 类型
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    layout?: LayoutType
    requiresAuth?: boolean
  }
}

// 简单布局路由 - 登录、首页、关于等
const simpleRoutes: RouteRecordRaw[] = [
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/common/about/AboutView.vue'),
    meta: { title: '关于我们', layout: 'simple' },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/common/login/LoginView.vue'),
    meta: { title: '登录', layout: 'simple' },
  },
]

// 门户布局路由 - 主页
const portalRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'portal',
    component: () => import('@/views/home/HomeView.vue'),
    meta: { title: 'HR 工作台', layout: 'portal' },
  },
]

// 合并所有路由
const routes: RouteRecordRaw[] = [
  ...portalRoutes,
  ...simpleRoutes,
  // 主业务系统路由（使用 MainLayout）
  ...dashboardRoutes,
  ...employeesRoutes,
  ...documentsRoutes,
  ...transfersRoutes,
  ...benefitsRoutes,
  ...salaryRoutes,
  ...recruitmentRoutes,
  ...attendanceRoutes,
  ...performanceRoutes,
  ...trainingRoutes,
  // 管理后台路由
  ...adminRoutes,
  // 404 路由
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/common/not-found/NotFoundView.vue'),
    meta: { title: '页面不存在', layout: 'simple' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// 路由守卫 - 权限检查
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - HR Workbench`
  }

  // 权限检查
  if (to.meta.requiresAuth) {
    // 这里可以添加你的认证逻辑
    // const isAuthenticated = checkAuth()
    // if (!isAuthenticated) {
    //   next({ name: 'login', query: { redirect: to.fullPath } })
    //   return
    // }
  }

  next()
})

export default router
