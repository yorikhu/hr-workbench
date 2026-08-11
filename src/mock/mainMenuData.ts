import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export interface MenuItem {
  index: string
  title: string
  icon: keyof typeof ElementPlusIconsVue
  children?: MenuItem[]
}

export interface SystemInfo {
  name: string
  icon: keyof typeof ElementPlusIconsVue
  color: string
  route: string
  menuItems: MenuItem[]
}

// 各系统的菜单配置
export const systemMenus: Record<string, SystemInfo> = {
  '/employees': {
    name: '人事管理',
    icon: 'User',
    color: 'from-blue-500 to-blue-600',
    route: '/employees',
    menuItems: [
      { index: '/employees/list', title: '员工列表', icon: 'List' },
      { index: '/employees/departments', title: '部门管理', icon: 'OfficeBuilding' },
      { index: '/employees/positions', title: '职位管理', icon: 'Stamp' },
    ],
  },
  '/transfers': {
    name: '异动管理',
    icon: 'Sort',
    color: 'from-sky-500 to-cyan-500',
    route: '/transfers',
    menuItems: [
      { index: '/transfers', title: '异动列表', icon: 'List' },
      { index: '/transfers/pending', title: '待审批', icon: 'Clock' },
      { index: '/transfers/history', title: '历史记录', icon: 'Document' },
    ],
  },
  '/benefits': {
    name: '福利管理',
    icon: 'Present',
    color: 'from-pink-500 to-rose-500',
    route: '/benefits',
    menuItems: [
      { index: '/benefits', title: '福利发放', icon: 'Present' },
      { index: '/benefits/settings', title: '福利设置', icon: 'Setting' },
      { index: '/benefits/history', title: '发放记录', icon: 'Document' },
    ],
  },
  '/salary': {
    name: '薪酬核算',
    icon: 'Coin',
    color: 'from-indigo-500 to-violet-500',
    route: '/salary',
    menuItems: [
      { index: '/salary', title: '薪酬核算', icon: 'Coin' },
      { index: '/salary/history', title: '历史工资', icon: 'Clock' },
      { index: '/salary/settings', title: '薪酬设置', icon: 'Setting' },
    ],
  },
  '/recruitment': {
    name: '招聘管理',
    icon: 'ChatDotRound',
    color: 'from-emerald-500 to-teal-500',
    route: '/recruitment',
    menuItems: [
      { index: '/recruitment', title: '招聘需求', icon: 'Document' },
      { index: '/recruitment/candidates', title: '候选人', icon: 'User' },
      { index: '/recruitment/interview', title: '面试安排', icon: 'Calendar' },
    ],
  },
  '/attendance': {
    name: '考勤管理',
    icon: 'Clock',
    color: 'from-amber-500 to-orange-500',
    route: '/attendance',
    menuItems: [
      { index: '/attendance', title: '考勤记录', icon: 'Clock' },
      { index: '/attendance/overtime', title: '加班管理', icon: 'Timer' },
      { index: '/attendance/leave', title: '请假管理', icon: 'Calendar' },
    ],
  },
  '/performance': {
    name: '绩效人才',
    icon: 'Trophy',
    color: 'from-purple-500 to-fuchsia-500',
    route: '/performance',
    menuItems: [
      { index: '/performance', title: '绩效考核', icon: 'Trophy' },
      { index: '/performance/goals', title: '目标管理', icon: 'Aim' },
      { index: '/performance/talent', title: '人才盘点', icon: 'User' },
    ],
  },
  '/training': {
    name: '培训发展',
    icon: 'Reading',
    color: 'from-red-500 to-orange-500',
    route: '/training',
    menuItems: [
      { index: '/training', title: '培训课程', icon: 'Reading' },
      { index: '/training/plans', title: '培训计划', icon: 'Calendar' },
      { index: '/training/records', title: '培训记录', icon: 'Document' },
    ],
  },
  '/dashboard': {
    name: '控制台',
    icon: 'Location',
    color: 'from-blue-500 to-indigo-500',
    route: '/dashboard',
    menuItems: [
      { index: '/dashboard/overview', title: '概览', icon: 'DataLine' },
      { index: '/dashboard/analytics', title: '数据分析', icon: 'TrendCharts' },
    ],
  },
}

// 获取当前系统的信息
export function getCurrentSystemInfo(routePath: string): SystemInfo | null {
  // 精确匹配
  if (systemMenus[routePath]) {
    return systemMenus[routePath]
  }
  // 模糊匹配（如 /employees/list 匹配 /employees）
  const pathParts = routePath.split('/')
  if (pathParts.length >= 2) {
    const basePath = `/${pathParts[1]}`
    return systemMenus[basePath] || null
  }
  return null
}
