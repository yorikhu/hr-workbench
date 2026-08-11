import type { RouteRecordRaw } from 'vue-router'

// 员工管理路由
export const employeesRoutes: RouteRecordRaw[] = [
  {
    path: '/employees',
    redirect: '/employees/list',
    meta: { layout: 'main' },
  },
  {
    path: '/employees/list',
    name: 'employees-list',
    component: () => import('@/views/employees/EmployeeListView.vue'),
    meta: { title: '员工列表', layout: 'main' },
  },
  {
    path: '/employees/departments',
    name: 'employees-departments',
    component: () => import('@/views/employees/DepartmentsView.vue'),
    meta: { title: '部门管理', layout: 'main' },
  },
  {
    path: '/employees/positions',
    name: 'employees-positions',
    component: () => import('@/views/employees/PositionsView.vue'),
    meta: { title: '职位管理', layout: 'main' },
  },
]
