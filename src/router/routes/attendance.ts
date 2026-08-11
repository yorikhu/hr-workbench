import type { RouteRecordRaw } from 'vue-router'

// 考勤管理路由
export const attendanceRoutes: RouteRecordRaw[] = [
  {
    path: '/attendance',
    name: 'attendance',
    component: () => import('@/views/attendance/AttendanceView.vue'),
    meta: { title: '考勤管理', layout: 'main' },
  },
]
