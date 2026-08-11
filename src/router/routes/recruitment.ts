import type { RouteRecordRaw } from 'vue-router'

// 招聘管理路由
export const recruitmentRoutes: RouteRecordRaw[] = [
  {
    path: '/recruitment',
    name: 'recruitment',
    component: () => import('@/views/recruitment/RecruitmentView.vue'),
    meta: { title: '招聘管理', layout: 'main' },
  },
]
