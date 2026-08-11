import type { RouteRecordRaw } from 'vue-router'

// 异动管理路由
export const transfersRoutes: RouteRecordRaw[] = [
  {
    path: '/transfers',
    name: 'transfers',
    component: () => import('@/views/transfers/TransfersView.vue'),
    meta: { title: '异动管理', layout: 'main' },
  },
]
