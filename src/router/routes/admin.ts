import type { RouteRecordRaw } from 'vue-router'

// 管理后台路由
export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin',
    redirect: '/admin/users/list',
    meta: { layout: 'admin', requiresAuth: true },
  },
  {
    path: '/admin/users/list',
    name: 'admin-users-list',
    component: () => import('@/views/admin/UsersListView.vue'),
    meta: { title: '用户列表', layout: 'admin', requiresAuth: true },
  },
  {
    path: '/admin/users/roles',
    name: 'admin-users-roles',
    component: () => import('@/views/admin/RolesView.vue'),
    meta: { title: '角色权限', layout: 'admin', requiresAuth: true },
  },
  {
    path: '/admin/system/config',
    name: 'admin-system-config',
    component: () => import('@/views/admin/SystemConfigView.vue'),
    meta: { title: '系统配置', layout: 'admin', requiresAuth: true },
  },
  {
    path: '/admin/system/logs',
    name: 'admin-system-logs',
    component: () => import('@/views/admin/SystemLogsView.vue'),
    meta: { title: '操作日志', layout: 'admin', requiresAuth: true },
  },
]
