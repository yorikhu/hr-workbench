// KPI 指标数据
export const kpiData = {
  activeEmployees: 1284,
  newHires: 36,
  attendanceRate: 96.2,
  avgSalary: 8246,
  lastMonthChange: 23,
  hireRate: 82,
  turnoverRate: 1.8,
}

// 用户信息
export const userInfo = {
  name: '张华',
  avatar: '张',
  role: 'HR 管理员',
  today: '2026年8月10日 · 周日',
  todoCount: 3,
}

// 图表数据 - 员工人数趋势
export const trendChartData = {
  labels: ['9月', '10月', '11月', '12月', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
  active: [1150, 1180, 1210, 1190, 1235, 1250, 1270, 1260, 1280, 1275, 1290, 1284],
  hires: [18, 22, 26, 14, 30, 24, 28, 18, 32, 20, 26, 36],
}

// 部门数据
export const deptData = [
  { name: '技术研发部', value: 386, color: '#3b82f6' },
  { name: '市场运营部', value: 245, color: '#10b981' },
  { name: '销售部', value: 312, color: '#f59e0b' },
  { name: '人力资源部', value: 178, color: '#8b5cf6' },
  { name: '财务部', value: 163, color: '#ec4899' },
]

// 待办事项
export const todoItems = [
  {
    id: 1,
    title: '审批 5 月薪酬发放单',
    desc: '截止今日 18:00 · 涉及 1,284 人',
    type: 'warning',
    typeLabel: '紧急',
  },
  {
    id: 2,
    title: '确认下周一面试安排',
    desc: '3 位候选人时间待确认',
    type: 'info',
    typeLabel: '待确认',
  },
  {
    id: 3,
    title: '新员工入职资料上传',
    desc: '本月 5 人待提交',
    type: 'primary',
    typeLabel: '处理中',
  },
]

// 常用服务
export const serviceItems = [
  { name: '请假', icon: 'Calendar', route: '/leave', color: 'from-blue-500 to-blue-600' },
  { name: '考勤', icon: 'Clock', route: '/attendance', color: 'from-amber-500 to-orange-500' },
  { name: '工资条', icon: 'Wallet', route: '/salary', color: 'from-emerald-500 to-teal-500' },
  { name: '审批', icon: 'Select', route: '/approval', color: 'from-indigo-500 to-violet-500' },
  { name: '年假', icon: 'Sunny', route: '/annual', color: 'from-cyan-500 to-sky-500' },
  { name: '目标', icon: 'Aim', route: '/target', color: 'from-pink-500 to-rose-500' },
]

// 异动记录
export const changeRecords = [
  { id: 1, name: '李芳', dept: '技术研发部', type: '入职', date: '2026-08-03', status: '已完成' },
  { id: 2, name: '王强', dept: '市场运营部', type: '转正', date: '2026-08-01', status: '已完成' },
  { id: 3, name: '赵磊', dept: '财务部', type: '调岗', date: '2026-07-28', status: '已完成' },
  { id: 4, name: '孙悦', dept: '人力资源部', type: '离职', date: '2026-07-25', status: '审批中' },
]

// 侧边栏模块配置
export const portalModules = [
  { name: '人事管理', icon: 'User', route: '/employees', color: 'from-blue-500 to-blue-600' },
  { name: '异动管理', icon: 'Sort', route: '/transfers', color: 'from-sky-500 to-cyan-500' },
  { name: '福利管理', icon: 'Present', route: '/benefits', color: 'from-pink-500 to-rose-500' },
  { name: '薪酬核算', icon: 'Coin', route: '/salary', color: 'from-indigo-500 to-violet-500' },
  { name: '招聘管理', icon: 'ChatDotRound', route: '/recruitment', color: 'from-emerald-500 to-teal-500' },
  { name: '考勤管理', icon: 'Clock', route: '/attendance', color: 'from-amber-500 to-orange-500' },
  { name: '绩效人才', icon: 'Trophy', route: '/performance', color: 'from-purple-500 to-fuchsia-500' },
  { name: '培训发展', icon: 'Reading', route: '/training', color: 'from-red-500 to-orange-500' },
]

// 招聘进度
export const recruitmentProgress = {
  current: 22,
  target: 30,
  rate: 73,
}

// 快捷操作按钮
export const quickActions = [
  { name: '本月招聘计划', icon: '📅', route: '/recruitment' },
  { name: '薪酬核算', icon: '💰', route: '/salary' },
  { name: '考勤日报', icon: '📊', route: '/attendance' },
]
