import type { RouteRecordRaw } from 'vue-router'

// 控制台路由
export const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    redirect: '/dashboard/overview',
    meta: { layout: 'main' },
  },
  {
    path: '/dashboard/overview',
    name: 'dashboard-overview',
    component: () => import('@/views/dashboard/OverviewView.vue'),
    meta: { title: '控制台概览', layout: 'main' },
  },
  {
    path: '/dashboard/analytics',
    name: 'dashboard-analytics',
    component: () => import('@/views/dashboard/AnalyticsView.vue'),
    meta: { title: '数据分析', layout: 'main' },
  },
]
