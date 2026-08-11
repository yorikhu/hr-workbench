import type { RouteRecordRaw } from 'vue-router'

// 福利管理路由
export const benefitsRoutes: RouteRecordRaw[] = [
  {
    path: '/benefits',
    name: 'benefits',
    component: () => import('@/views/benefits/BenefitsView.vue'),
    meta: { title: '福利管理', layout: 'main' },
  },
]
