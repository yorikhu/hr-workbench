import type { RouteRecordRaw } from 'vue-router'

// 绩效人才路由
export const performanceRoutes: RouteRecordRaw[] = [
  {
    path: '/performance',
    name: 'performance',
    component: () => import('@/views/performance/PerformanceView.vue'),
    meta: { title: '绩效人才', layout: 'main' },
  },
]
