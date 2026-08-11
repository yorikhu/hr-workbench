import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import { trendChartData } from '@/mock/portalData'

export function useTrendChart(chartRef: any) {
  let chart: echarts.ECharts | null = null

  const initChart = () => {
    if (!chartRef.value) return

    chart = echarts.init(chartRef.value)
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
    chart.setOption(option)
  }

  const handleResize = () => {
    chart?.resize()
  }

  onMounted(() => {
    initChart()
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    chart?.dispose()
    window.removeEventListener('resize', handleResize)
  })

  return { chart }
}
