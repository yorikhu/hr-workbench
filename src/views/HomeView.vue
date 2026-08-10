<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  ArrowRightBold,
  Calendar,
  Clock,
  Wallet,
  Select,
  Sunny,
  Aim,
  Reading,
  Document,
  ChatDotRound,
  DataLine,
} from '@element-plus/icons-vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import {
  kpiData,
  userInfo,
  trendChartData,
  deptData,
  todoItems,
  serviceItems,
  changeRecords,
  recruitmentProgress,
  quickActions,
} from '@/mock/portalData'
import AppIcon from '@/components/icons/AppIcon.vue'
import AppCard from '@/components/Card.vue'
import AppTable from '@/components/Table.vue'

const iconMap: any = {
  Calendar,
  Clock,
  Wallet,
  Select,
  Sunny,
  Aim,
  Reading,
  Document,
  ChatDotRound,
  DataLine,
}

const router = useRouter()
const trendChartRef = ref<HTMLElement>()
const deptChartRef = ref<HTMLElement>()
let trendChart: echarts.ECharts | null = null
let deptChart: echarts.ECharts | null = null

const handleQuickAction = (route: string) => {
  router.push(route)
}

const handleServiceClick = (route: string) => {
  router.push(route)
}

const handleTodoClick = () => {
  // TODO: Handle todo click
}

// 初始化趋势图表
const initTrendChart = () => {
  if (!trendChartRef.value) return

  trendChart = echarts.init(trendChartRef.value)
  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: trendChartData.labels,
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: '#e5e7eb',
        },
      },
      axisLabel: {
        color: '#6b7280',
        fontSize: 11,
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          color: '#f3f4f6',
        },
      },
      axisLabel: {
        color: '#6b7280',
        fontSize: 11,
      },
    },
    series: [
      {
        name: '在职',
        type: 'line',
        smooth: true,
        data: trendChartData.active,
        itemStyle: {
          color: '#3b82f6',
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
            { offset: 1, color: 'rgba(59, 130, 246, 0.05)' },
          ]),
        },
      },
      {
        name: '入职',
        type: 'line',
        smooth: true,
        data: trendChartData.hires,
        itemStyle: {
          color: '#10b981',
        },
        lineStyle: {
          type: 'dashed',
        },
      },
    ],
  }
  trendChart.setOption(option)
}

// 初始化部门图表
const initDeptChart = () => {
  if (!deptChartRef.value) return

  deptChart = echarts.init(deptChartRef.value)
  const option: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} 人 ({d}%)',
    },
    series: [
      {
        type: 'pie',
        radius: ['60%', '80%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        data: deptData.map((item) => ({
          name: item.name,
          value: item.value,
          itemStyle: {
            color: item.color,
          },
        })),
      },
    ],
  }
  deptChart.setOption(option)
}

onMounted(() => {
  initTrendChart()
  initDeptChart()

  const handleResize = () => {
    trendChart?.resize()
    deptChart?.resize()
  }
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  trendChart?.dispose()
  deptChart?.dispose()
})
</script>

<template>
  <div class="portal-home">
    <!-- 欢迎横幅 + 快捷报表 -->
    <section class="hero-section">
      <div class="welcome-banner">
        <div class="banner-content">
          <h2>上午好，{{ userInfo.name }} 👋</h2>
          <p>
            今天是 {{ userInfo.today }}，共
            {{ userInfo.todoCount }} 条待办，需要今日处理完成。
          </p>
          <div class="quick-actions">
            <el-button
              v-for="action in quickActions"
              :key="action.name"
              class="action-btn"
              @click="handleQuickAction(action.route)"
            >
              {{ action.icon }} {{ action.name }}
            </el-button>
          </div>
        </div>
      </div>

      <!-- 快捷报表卡片 -->
      <AppCard class="report-card">
        <template #header>
          <div class="report-header">
            <p class="report-title">快捷报表</p>
            <span class="report-tag">实时</span>
          </div>
        </template>
        <div class="report-content">
          <div class="report-item">
            <div class="report-info">
              <span class="report-label">今日出勤</span>
              <span class="report-value">{{ kpiData.attendanceRate }}%</span>
            </div>
            <div class="progress-bar">
              <div
                class="progress-fill blue"
                :style="{ width: kpiData.attendanceRate + '%' }"
              ></div>
            </div>
          </div>
          <div class="report-item">
            <div class="report-info">
              <span class="report-label">本月离职率</span>
              <span class="report-value">{{ kpiData.turnoverRate }}%</span>
            </div>
            <div class="progress-bar">
              <div
                class="progress-fill green"
                :style="{ width: kpiData.turnoverRate * 10 + '%' }"
              ></div>
            </div>
          </div>
        </div>
        <el-button link class="view-all-btn">
          查看全部报表
          <el-icon class="el-icon--right"><ArrowRightBold /></el-icon>
        </el-button>
      </AppCard>
    </section>

    <!-- KPI 指标卡 -->
    <section class="kpi-section">
      <AppCard
        v-for="item in [
          'activeEmployees',
          'newHires',
          'attendanceRate',
          'avgSalary',
        ]"
        :key="item"
        class="kpi-card"
      >
        <div class="kpi-header">
          <p class="kpi-label">
            {{
              {
                activeEmployees: '在职员工',
                newHires: '本月入职',
                attendanceRate: '考勤出勤率',
                avgSalary: '人均月薪酬',
              }[item]
            }}
          </p>
          <span
            class="kpi-icon"
            :class="{
              blue: item === 'activeEmployees',
              green: item === 'newHires',
              amber: item === 'attendanceRate',
              purple: item === 'avgSalary',
            }"
          >
            <AppIcon
              :name="
                {
                  activeEmployees: 'User',
                  newHires: 'Check',
                  attendanceRate: 'Calendar',
                  avgSalary: 'Coin',
                }[item] as any
              "
            />
          </span>
        </div>
        <p class="kpi-value">
          {{
            {
              activeEmployees: kpiData.activeEmployees.toLocaleString(),
              newHires: kpiData.newHires,
              attendanceRate: kpiData.attendanceRate + '%',
              avgSalary: '¥' + kpiData.avgSalary.toLocaleString(),
            }[item]
          }}
        </p>
        <p class="kpi-desc">
          {{
            {
              activeEmployees: `▲ 比上月 +${kpiData.lastMonthChange} 人`,
              newHires: `▲ 招聘达成率 ${kpiData.hireRate}%`,
              attendanceRate: '本月',
              avgSalary: '上月实发',
            }[item]
          }}
        </p>
      </AppCard>
    </section>

    <!-- 数据图表区 -->
    <section class="chart-section">
      <AppCard class="chart-card large">
        <template #header>
          <div class="chart-header">
            <div>
              <h3>员工人数趋势</h3>
              <p>近 12 个月在职人数变化</p>
            </div>
            <div class="chart-legend">
              <span class="legend-item blue">在职</span>
              <span class="legend-item green">入职</span>
            </div>
          </div>
        </template>
        <div ref="trendChartRef" class="chart-container"></div>
      </AppCard>

      <AppCard class="chart-card">
        <template #header>
          <div class="chart-header">
            <h3>部门人数占比</h3>
            <p>当前员工分布</p>
          </div>
        </template>
        <div ref="deptChartRef" class="chart-container small"></div>
        <div class="dept-legend">
          <div v-for="dept in deptData" :key="dept.name" class="dept-item">
            <span class="dept-color" :style="{ background: dept.color }"></span>
            <span class="dept-name">{{ dept.name }}</span>
            <span class="dept-value">{{ dept.value }} 人</span>
          </div>
        </div>
      </AppCard>
    </section>

    <!-- 待办 + 常用服务 -->
    <section class="bottom-section">
      <AppCard class="todo-card">
        <template #header>
          <div class="card-header">
            <h3>待办事项</h3>
            <span class="todo-count">今日 {{ todoItems.length }} 条</span>
          </div>
        </template>
        <div class="todo-list">
          <div
            v-for="todo in todoItems.slice(0, 3)"
            :key="todo.id"
            class="todo-item"
            :class="'todo-' + todo.type"
          >
            <span class="todo-dot"></span>
            <div class="todo-content">
              <p class="todo-title">{{ todo.title }}</p>
              <p class="todo-desc">{{ todo.desc }}</p>
            </div>
            <el-button link class="todo-btn" @click="handleTodoClick"
              >处理</el-button
            >
          </div>
        </div>
        <el-button link class="view-all-btn">
          查看全部
          <el-icon class="el-icon--right"><ArrowRightBold /></el-icon>
        </el-button>
      </AppCard>

      <!-- 常用服务 -->
      <AppCard class="service-card">
        <template #header>
          <h3>常用服务</h3>
        </template>
        <div class="service-grid">
          <button
            v-for="service in serviceItems"
            :key="service.name"
            class="service-item"
            @click="handleServiceClick(service.route)"
          >
            <span class="service-icon" :class="service.color">
              <el-icon :size="16">
                <component :is="iconMap[service.icon]" />
              </el-icon>
            </span>
            <div class="service-info">
              <span class="service-name">{{ service.name }}</span>
              <span class="service-desc">{{ service.desc }}</span>
            </div>
          </button>
        </div>
        <el-divider class="flex-divider" />
        <div class="progress-info">
          <div class="progress-text">
            <p>本月招聘进度</p>
            <p>
              录用 {{ recruitmentProgress.current }} 人 / 目标
              {{ recruitmentProgress.target }} 人
            </p>
          </div>
          <span class="progress-value">{{ recruitmentProgress.rate }}%</span>
        </div>
        <div class="progress-bar large">
          <div
            class="progress-fill gradient"
            :style="{ width: recruitmentProgress.rate + '%' }"
          ></div>
        </div>
      </AppCard>
    </section>

    <!-- 异动记录表 -->
    <AppCard>
      <template #header>
        <div class="table-header">
          <div>
            <h3>近期异动记录</h3>
            <p>入职、离职、调岗、转正等最新动态</p>
          </div>
          <el-button link class="view-all-btn">
            全部异动
            <el-icon class="el-icon--right"><ArrowRightBold /></el-icon>
          </el-button>
        </div>
      </template>
      <AppTable :data="changeRecords">
        <el-table-column prop="name" label="员工">
          <template #default="{ row }">
            <span class="table-name">{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="dept" label="部门" />
        <el-table-column prop="type" label="异动类型">
          <template #default="{ row }">
            <el-tag
              :type="
                {
                  入职: 'success',
                  转正: 'primary',
                  调岗: 'info',
                  离职: 'warning',
                }[row.type as '入职' | '转正' | '调岗' | '离职']
              "
              size="small"
            >
              {{ row.type }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="生效日期" />
        <el-table-column prop="status" label="审批状态">
          <template #default="{ row }">
            <span :class="{ 'status-done': row.status === '已完成' }">
              {{ row.status }}
            </span>
          </template>
        </el-table-column>
      </AppTable>
    </AppCard>
  </div>
</template>

<style scoped lang="scss">
.portal-home {
  display: flex;
  flex-direction: column;
  gap: 24px;

  // Cards with flex column layout
  .report-card,
  .todo-card,
  .service-card {
    display: flex;
    flex-direction: column;
    height: 100%;

    :deep(.el-card__body) {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
}

.hero-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}

.welcome-banner {
  background: linear-gradient(135deg, #3b82f6, #6366f1, #6366f1);
  border-radius: 16px;
  padding: 24px;
  color: #fff;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.3);

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
  }

  &::before {
    width: 160px;
    height: 160px;
    right: -24px;
    top: -24px;
  }

  &::after {
    width: 96px;
    height: 96px;
    right: -8px;
    top: 40px;
  }

  .banner-content {
    position: relative;
    z-index: 1;

    h2 {
      font-size: 24px;
      font-weight: 600;
      margin: 0 0 8px;
    }

    p {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.9);
      margin: 0 0 20px;
    }

    .quick-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .action-btn {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: #fff;
      backdrop-filter: blur(10px);

      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
}

.report-card {
  display: flex;
  flex-direction: column;

  .report-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .report-title {
      font-size: 14px;
      font-weight: 600;
      color: #374151;
      margin: 0;
    }

    .report-tag {
      font-size: 12px;
      background: #eff6ff;
      color: #3b82f6;
      padding: 2px 8px;
      border-radius: 999px;
      font-weight: 500;
    }
  }

  .report-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .report-item {
    .report-info {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .report-label {
        font-size: 13px;
        color: #6b7280;
      }

      .report-value {
        font-size: 14px;
        font-weight: 600;
        color: #1f2937;
      }
    }

    .progress-bar {
      width: 100%;
      height: 8px;
      background: #f3f4f6;
      border-radius: 4px;
      overflow: hidden;
      margin-top: 4px;

      .progress-fill {
        height: 100%;
        border-radius: 4px;
        transition: width 0.3s;

        &.blue {
          background: #3b82f6;
        }

        &.green {
          background: #10b981;
        }

        &.gradient {
          background: linear-gradient(90deg, #3b82f6, #6366f1);
        }
      }

      &.large {
        height: 10px;
      }
    }
  }

  .view-all-btn {
    margin-top: 24px;
    align-self: flex-end;
    font-size: 13px;
    color: #3b82f6;
    padding: 0;

    .el-icon {
      font-size: 12px;
    }
  }
}

.kpi-section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.kpi-card {
  background: #fff;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  transition: all 0.25s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 40px -12px rgba(59, 130, 246, 0.18);
  }

  .kpi-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .kpi-label {
    font-size: 13px;
    color: #6b7280;
    margin: 0;
  }

  .kpi-icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;

    &.blue {
      background: linear-gradient(135deg, #3b82f6, #2563eb);
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }

    &.green {
      background: linear-gradient(135deg, #10b981, #059669);
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    }

    &.amber {
      background: linear-gradient(135deg, #f59e0b, #ea580c);
      box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
    }

    &.purple {
      background: linear-gradient(135deg, #8b5cf6, #7c3aed);
      box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
    }

    :deep(.el-icon) {
      color: #fff;
      font-size: 18px;
    }
  }

  .kpi-value {
    font-size: 24px;
    font-weight: 700;
    color: #1f2937;
    margin: 12px 0 4px;
  }

  .kpi-desc {
    font-size: 12px;
    color: #10b981;
    margin: 0;
  }
}

.chart-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}

.chart-card {
  background: #fff;
  border-radius: 16px;
  border: 1px solid #e5e7eb;

  &.large {
    min-height: 280px;
  }

  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    h3 {
      font-size: 16px;
      font-weight: 600;
      color: #1f2937;
      margin: 0;
    }

    p {
      font-size: 12px;
      color: #9ca3af;
      margin: 4px 0 0 0;
    }

    .chart-legend {
      display: flex;
      gap: 8px;

      .legend-item {
        font-size: 12px;
        padding: 4px 8px;
        border-radius: 6px;
        font-weight: 500;

        &.blue {
          background: #eff6ff;
          color: #3b82f6;
        }

        &.green {
          background: #ecfdf5;
          color: #10b981;
        }
      }
    }
  }

  .chart-container {
    width: 100%;
    height: 200px;

    &.small {
      height: 150px;
    }
  }

  .dept-legend {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .dept-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;

      .dept-color {
        width: 10px;
        height: 10px;
        border-radius: 2px;
        flex-shrink: 0;
      }

      .dept-name {
        color: #374151;
        flex: 1;
      }

      .dept-value {
        color: #6b7280;
      }
    }
  }
}

.bottom-section {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 24px;
  align-items: stretch;
}

.todo-card,
.service-card {
  display: flex;
  flex-direction: column;
}

.todo-card {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      font-size: 16px;
      font-weight: 600;
      color: #1f2937;
      margin: 0;
    }

    .todo-count {
      font-size: 12px;
      color: #9ca3af;
    }
  }

  .todo-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .todo-item {
    display: flex;
    gap: 12px;
    padding: 12px;
    border-radius: 12px;
    border: 1px solid transparent;

    &.todo-warning {
      background: #fffbeb;
      border-color: #fde68a;
    }

    &.todo-info {
      background: #eff6ff;
      border-color: #bfdbfe;
    }

    &.todo-primary {
      background: #eef2ff;
      border-color: #c7d2fe;
    }

    .todo-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-top: 6px;
      flex-shrink: 0;
      background: #cbd5e1;
    }

    &.todo-warning .todo-dot {
      background: #f59e0b;
    }

    &.todo-info .todo-dot {
      background: #3b82f6;
    }

    &.todo-primary .todo-dot {
      background: #6366f1;
    }

    .todo-content {
      flex: 1;
      min-width: 0;

      .todo-title {
        font-size: 14px;
        font-weight: 500;
        color: #1f2937;
        margin: 0;
      }

      .todo-desc {
        font-size: 12px;
        color: #6b7280;
        margin: 4px 0 0;
      }
    }

    .todo-btn {
      font-size: 12px;
      color: #3b82f6;
      flex-shrink: 0;
    }
  }

  .view-all-btn {
    margin-top: 24px;
    align-self: flex-end;
    font-size: 13px;
    color: #3b82f6;
    padding: 0;

    .el-icon {
      font-size: 12px;
    }
  }
}

.service-card {
  h3 {
    font-size: 16px;
    font-weight: 600;
    color: #1f2937;
    margin: 0;
  }

  .service-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 12px;
  }

  .service-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 12px 8px;
    border-radius: 12px;
    border: none;
    background: transparent;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: #f9fafb;
      transform: translateY(-3px);
    }

    .service-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      text-align: center;
    }

    .service-icon {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;

      :deep(.el-icon) {
        color: #fff;
        font-size: 16px;
      }

      &.from-blue-500.to-blue-600 {
        background: linear-gradient(135deg, #3b82f6, #2563eb);
      }
      &.from-amber-500.to-orange-500 {
        background: linear-gradient(135deg, #f59e0b, #f97316);
      }
      &.from-emerald-500.to-teal-500 {
        background: linear-gradient(135deg, #10b981, #059669);
      }
      &.from-indigo-500.to-violet-500 {
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
      }
      &.from-cyan-500.to-sky-500 {
        background: linear-gradient(135deg, #06b6d4, #0ea5e9);
      }
      &.from-pink-500.to-rose-500 {
        background: linear-gradient(135deg, #ec4899, #f43f5e);
      }
      &.from-violet-500.to-purple-500 {
        background: linear-gradient(135deg, #8b5cf6, #a855f7);
      }
      &.from-blue-500.to-indigo-500 {
        background: linear-gradient(135deg, #3b82f6, #6366f1);
      }
      &.from-teal-500.to-emerald-500 {
        background: linear-gradient(135deg, #14b8a6, #10b981);
      }
      &.from-orange-500.to-amber-500 {
        background: linear-gradient(135deg, #f97316, #f59e0b);
      }
      &.from-sky-500.to-blue-500 {
        background: linear-gradient(135deg, #0ea5e9, #3b82f6);
      }
      &.from-rose-500.to-pink-500 {
        background: linear-gradient(135deg, #f43f5e, #ec4899);
      }
    }

    .service-name {
      font-size: 12px;
      font-weight: 500;
      color: #374151;
    }

    .service-desc {
      font-size: 10px;
      color: #9ca3af;
    }
  }

  .flex-divider {
    flex-grow: 1;
    margin: 16px 0;
    border-color: #f3f4f6;
  }

  .progress-info {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .progress-text {
      p {
        margin: 0;

        &:first-child {
          font-size: 14px;
          font-weight: 500;
          color: #374151;
        }

        &:last-child {
          font-size: 12px;
          color: #9ca3af;
          margin-top: 2px;
        }
      }
    }

    .progress-value {
      font-size: 18px;
      font-weight: 700;
      color: #3b82f6;
    }
  }
}

// Table header styles (used in template)
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: #1f2937;
    margin: 0;
  }

  p {
    font-size: 12px;
    color: #9ca3af;
    margin: 4px 0 0 0;
  }

  .view-all-btn {
    font-size: 13px;
    color: #3b82f6;
    padding: 0;

    .el-icon {
      font-size: 12px;
    }
  }
}

// Table cell styles
.table-name {
  font-weight: 500;
  color: #374151;
}

.status-done {
  color: #6b7280;
}
</style>
