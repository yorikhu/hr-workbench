<script setup lang="ts">
import { useRouter } from 'vue-router'
import WelcomeBanner from './components/WelcomeBanner.vue'
import QuickReport from './components/QuickReport.vue'
import KPICard from './components/KPICard.vue'
import TrendChart from './components/TrendChart.vue'
import DeptChart from './components/DeptChart.vue'
import TodoList from './components/TodoList.vue'
import ServiceGrid from './components/ServiceGrid.vue'
import ChangeRecordsTable from './components/ChangeRecordsTable.vue'

const router = useRouter()

const handleQuickAction = (route: string) => {
  router.push(route)
}

const handleServiceClick = (route: string) => {
  router.push(route)
}

const handleTodoClick = () => {
  // TODO: Handle todo click
}
</script>

<template>
  <div class="portal-home">
    <!-- 欢迎横幅 + 快捷报表 -->
    <section class="hero-section">
      <WelcomeBanner @quick-action="handleQuickAction" />
      <QuickReport />
    </section>

    <!-- KPI 指标卡 -->
    <section class="kpi-section">
      <KPICard type="activeEmployees" />
      <KPICard type="newHires" />
      <KPICard type="attendanceRate" />
      <KPICard type="avgSalary" />
    </section>

    <!-- 数据图表区 -->
    <section class="chart-section">
      <TrendChart />
      <DeptChart />
    </section>

    <!-- 待办 + 常用服务 -->
    <section class="bottom-section">
      <TodoList @todo-click="handleTodoClick" />
      <ServiceGrid @service-click="handleServiceClick" />
    </section>

    <!-- 异动记录表 -->
    <ChangeRecordsTable />
  </div>
</template>

<style scoped lang="scss">
.portal-home {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hero-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}

.kpi-section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.chart-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}

.bottom-section {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 24px;
  align-items: stretch;
}
</style>
