import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import { deptData } from '@/mock/portalData'

export function useDeptChart(chartRef: any) {
  let chart: echarts.ECharts | null = null

  const initChart = () => {
    if (!chartRef.value) return

    chart = echarts.init(chartRef.value)
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
