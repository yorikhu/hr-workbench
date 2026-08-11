<script setup lang="ts">
import { ref } from 'vue'
import AppCard from '@/components/AppCard.vue'
import { useDeptChart } from '../composables/useDeptChart'
import { deptData } from '@/mock/portalData'

const chartRef = ref<HTMLElement>()
useDeptChart(chartRef)
</script>

<template>
  <AppCard class="chart-card">
    <template #header>
      <div class="chart-header">
        <h3>部门人数占比</h3>
        <p>当前员工分布</p>
      </div>
    </template>
    <div ref="chartRef" class="chart-container small"></div>
    <div class="dept-legend">
      <div v-for="dept in deptData" :key="dept.name" class="dept-item">
        <span class="dept-color" :style="{ background: dept.color }"></span>
        <span class="dept-name">{{ dept.name }}</span>
        <span class="dept-value">{{ dept.value }} 人</span>
      </div>
    </div>
  </AppCard>
</template>

<style scoped lang="scss">
.chart-card {
  background: #fff;
  border-radius: 16px;
  border: 1px solid #e5e7eb;

  .chart-header {
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
</style>
