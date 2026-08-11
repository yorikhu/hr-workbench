<script setup lang="ts">
import { ArrowRightBold } from '@element-plus/icons-vue'
import { kpiData } from '@/mock/portalData'
import AppCard from '@/components/AppCard.vue'
</script>

<template>
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
</template>

<style scoped lang="scss">
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
</style>
