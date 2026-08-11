import type { RouteRecordRaw } from 'vue-router'

// 培训发展路由
export const trainingRoutes: RouteRecordRaw[] = [
  {
    path: '/training',
    name: 'training',
    component: () => import('@/views/training/TrainingView.vue'),
    meta: { title: '培训发展', layout: 'main' },
  },
]
