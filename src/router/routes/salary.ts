import type { RouteRecordRaw } from 'vue-router'

// 薪酬核算路由
export const salaryRoutes: RouteRecordRaw[] = [
  {
    path: '/salary',
    name: 'salary',
    component: () => import('@/views/salary/SalaryView.vue'),
    meta: { title: '薪酬核算', layout: 'main' },
  },
]
