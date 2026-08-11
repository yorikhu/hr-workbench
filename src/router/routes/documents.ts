import type { RouteRecordRaw } from 'vue-router'

// 文档中心路由
export const documentsRoutes: RouteRecordRaw[] = [
  {
    path: '/documents',
    redirect: '/documents/policies',
    meta: { layout: 'main' },
  },
  {
    path: '/documents/policies',
    name: 'documents-policies',
    component: () => import('@/views/documents/PoliciesView.vue'),
    meta: { title: '政策制度', layout: 'main' },
  },
  {
    path: '/documents/forms',
    name: 'documents-forms',
    component: () => import('@/views/documents/FormsView.vue'),
    meta: { title: '表单下载', layout: 'main' },
  },
]
