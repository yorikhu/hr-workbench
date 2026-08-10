import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

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
    component: () => import('@/views/AboutView.vue'),
    meta: { title: '关于我们', layout: 'simple' },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { title: '登录', layout: 'simple' },
  },
]

// 门户布局路由 - 主页
const portalRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'portal',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'HR 工作台', layout: 'portal' },
  },
]

// 主业务布局路由 - /dashboard、/employees、/documents
const mainRoutes: RouteRecordRaw = {
  path: '/dashboard',
  name: 'dashboard',
  component: () => import('@/layouts/MainLayout.vue'),
  meta: { layout: 'main' },
  children: [
    {
      path: 'overview',
      name: 'dashboard-overview',
      component: () => import('@/views/dashboard/OverviewView.vue'),
      meta: { title: '控制台概览' },
    },
    {
      path: 'analytics',
      name: 'dashboard-analytics',
      component: () => import('@/views/dashboard/AnalyticsView.vue'),
      meta: { title: '数据分析' },
    },
  ],
}

const employeesRoutes: RouteRecordRaw = {
  path: '/employees',
  name: 'employees',
  component: () => import('@/layouts/MainLayout.vue'),
  meta: { layout: 'main' },
  children: [
    {
      path: 'list',
      name: 'employees-list',
      component: () => import('@/views/employees/EmployeeListView.vue'),
      meta: { title: '员工列表' },
    },
    {
      path: 'departments',
      name: 'employees-departments',
      component: () => import('@/views/employees/DepartmentsView.vue'),
      meta: { title: '部门管理' },
    },
    {
      path: 'positions',
      name: 'employees-positions',
      component: () => import('@/views/employees/PositionsView.vue'),
      meta: { title: '职位管理' },
    },
  ],
}

const documentsRoutes: RouteRecordRaw = {
  path: '/documents',
  name: 'documents',
  component: () => import('@/layouts/MainLayout.vue'),
  meta: { layout: 'main' },
  children: [
    {
      path: 'policies',
      name: 'documents-policies',
      component: () => import('@/views/documents/PoliciesView.vue'),
      meta: { title: '政策制度' },
    },
    {
      path: 'forms',
      name: 'documents-forms',
      component: () => import('@/views/documents/FormsView.vue'),
      meta: { title: '表单下载' },
    },
  ],
}

// 异动管理路由
const transfersRoutes: RouteRecordRaw = {
  path: '/transfers',
  name: 'transfers',
  component: () => import('@/layouts/MainLayout.vue'),
  meta: { layout: 'main' },
  children: [
    {
      path: '',
      name: 'transfers-list',
      component: () => import('@/views/transfers/TransfersView.vue'),
      meta: { title: '异动管理' },
    },
  ],
}

// 福利管理路由
const benefitsRoutes: RouteRecordRaw = {
  path: '/benefits',
  name: 'benefits',
  component: () => import('@/layouts/MainLayout.vue'),
  meta: { layout: 'main' },
  children: [
    {
      path: '',
      name: 'benefits-list',
      component: () => import('@/views/benefits/BenefitsView.vue'),
      meta: { title: '福利管理' },
    },
  ],
}

// 薪酬核算路由
const salaryRoutes: RouteRecordRaw = {
  path: '/salary',
  name: 'salary',
  component: () => import('@/layouts/MainLayout.vue'),
  meta: { layout: 'main' },
  children: [
    {
      path: '',
      name: 'salary-list',
      component: () => import('@/views/salary/SalaryView.vue'),
      meta: { title: '薪酬核算' },
    },
  ],
}

// 招聘管理路由
const recruitmentRoutes: RouteRecordRaw = {
  path: '/recruitment',
  name: 'recruitment',
  component: () => import('@/layouts/MainLayout.vue'),
  meta: { layout: 'main' },
  children: [
    {
      path: '',
      name: 'recruitment-list',
      component: () => import('@/views/recruitment/RecruitmentView.vue'),
      meta: { title: '招聘管理' },
    },
  ],
}

// 考勤管理路由
const attendanceRoutes: RouteRecordRaw = {
  path: '/attendance',
  name: 'attendance',
  component: () => import('@/layouts/MainLayout.vue'),
  meta: { layout: 'main' },
  children: [
    {
      path: '',
      name: 'attendance-list',
      component: () => import('@/views/attendance/AttendanceView.vue'),
      meta: { title: '考勤管理' },
    },
  ],
}

// 绩效人才路由
const performanceRoutes: RouteRecordRaw = {
  path: '/performance',
  name: 'performance',
  component: () => import('@/layouts/MainLayout.vue'),
  meta: { layout: 'main' },
  children: [
    {
      path: '',
      name: 'performance-list',
      component: () => import('@/views/performance/PerformanceView.vue'),
      meta: { title: '绩效人才' },
    },
  ],
}

// 培训发展路由
const trainingRoutes: RouteRecordRaw = {
  path: '/training',
  name: 'training',
  component: () => import('@/layouts/MainLayout.vue'),
  meta: { layout: 'main' },
  children: [
    {
      path: '',
      name: 'training-list',
      component: () => import('@/views/training/TrainingView.vue'),
      meta: { title: '培训发展' },
    },
  ],
}

// 管理后台布局路由 - /admin/*
const adminRoutes: RouteRecordRaw = {
  path: '/admin',
  name: 'admin',
  component: () => import('@/layouts/AdminLayout.vue'),
  meta: { layout: 'admin', requiresAuth: true },
  children: [
    {
      path: 'users/list',
      name: 'admin-users-list',
      component: () => import('@/views/admin/UsersListView.vue'),
      meta: { title: '用户列表' },
    },
    {
      path: 'users/roles',
      name: 'admin-users-roles',
      component: () => import('@/views/admin/RolesView.vue'),
      meta: { title: '角色权限' },
    },
    {
      path: 'system/config',
      name: 'admin-system-config',
      component: () => import('@/views/admin/SystemConfigView.vue'),
      meta: { title: '系统配置' },
    },
    {
      path: 'system/logs',
      name: 'admin-system-logs',
      component: () => import('@/views/admin/SystemLogsView.vue'),
      meta: { title: '操作日志' },
    },
  ],
}

// 合并所有路由
const routes: RouteRecordRaw[] = [
  ...portalRoutes,
  ...simpleRoutes,
  mainRoutes,
  employeesRoutes,
  documentsRoutes,
  transfersRoutes,
  benefitsRoutes,
  salaryRoutes,
  recruitmentRoutes,
  attendanceRoutes,
  performanceRoutes,
  trainingRoutes,
  adminRoutes,
  // 404 路由
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
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
