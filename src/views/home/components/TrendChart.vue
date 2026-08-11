<script setup lang="ts">
import { ref } from 'vue'
import AppCard from '@/components/AppCard.vue'
import { useTrendChart } from '../composables/useTrendChart'

const chartRef = ref<HTMLElement>()
useTrendChart(chartRef)
</script>

<template>
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
    <div ref="chartRef" class="chart-container"></div>
  </AppCard>
</template>

<style scoped lang="scss">
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
  }
}
</style>
