<script setup lang="ts">
import AppIcon from '@/components/icons/AppIcon.vue'
import { kpiData } from '@/mock/portalData'

export type KPIType =
  'activeEmployees' | 'newHires' | 'attendanceRate' | 'avgSalary'

interface Props {
  type: KPIType
}

const props = defineProps<Props>()

const config = {
  activeEmployees: {
    label: '在职员工',
    value: 'activeEmployees',
    icon: 'User',
    colorClass: 'blue',
    desc: `▲ 比上月 +${kpiData.lastMonthChange} 人`,
    displayValue: kpiData.activeEmployees.toLocaleString(),
  },
  newHires: {
    label: '本月入职',
    value: 'newHires',
    icon: 'Check',
    colorClass: 'green',
    desc: `▲ 招聘达成率 ${kpiData.hireRate}%`,
    displayValue: kpiData.newHires.toString(),
  },
  attendanceRate: {
    label: '考勤出勤率',
    value: 'attendanceRate',
    icon: 'Calendar',
    colorClass: 'amber',
    desc: '本月',
    displayValue: kpiData.attendanceRate + '%',
  },
  avgSalary: {
    label: '人均月薪酬',
    value: 'avgSalary',
    icon: 'Coin',
    colorClass: 'purple',
    desc: '上月实发',
    displayValue: '¥' + kpiData.avgSalary.toLocaleString(),
  },
}

const currentConfig = config[props.type]
</script>

<template>
  <div class="kpi-card">
    <div class="kpi-header">
      <p class="kpi-label">{{ currentConfig.label }}</p>
      <span class="kpi-icon" :class="currentConfig.colorClass">
        <AppIcon :name="currentConfig.icon as any" />
      </span>
    </div>
    <p class="kpi-value">{{ currentConfig.displayValue }}</p>
    <p class="kpi-desc">{{ currentConfig.desc }}</p>
  </div>
</template>

<style scoped lang="scss">
.kpi-card {
  background: #fff;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  padding: 20px;
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
</style>
