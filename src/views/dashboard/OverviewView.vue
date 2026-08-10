<script setup lang="ts">
import { ref } from 'vue'
import { TrendCharts, User, Document, DataLine } from '@element-plus/icons-vue'

// 模拟数据
const stats = ref([
  {
    title: '员工总数',
    value: 1248,
    icon: User,
    color: '#409eff',
    trend: '+12%',
  },
  {
    title: '部门数量',
    value: 24,
    icon: TrendCharts,
    color: '#67c23a',
    trend: '+3%',
  },
  {
    title: '文档数量',
    value: 356,
    icon: Document,
    color: '#e6a23c',
    trend: '+8%',
  },
  {
    title: '本月考勤',
    value: '98.5%',
    icon: DataLine,
    color: '#f56c6c',
    trend: '+2%',
  },
])

const activities = ref([
  { time: '2024-01-15 09:30', content: '张三提交了请假申请', type: 'primary' },
  {
    time: '2024-01-15 10:15',
    content: '新员工李四入职手续完成',
    type: 'success',
  },
  { time: '2024-01-15 11:00', content: '技术部门周报已提交', type: 'info' },
  {
    time: '2024-01-15 14:20',
    content: '王五的考勤异常已处理',
    type: 'warning',
  },
])
</script>

<template>
  <div class="overview-container">
    <!-- 统计卡片 -->
    <el-row :gutter="20" class="stats-row">
      <el-col v-for="stat in stats" :key="stat.title" :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <div class="stat-icon" :style="{ background: stat.color }">
              <el-icon :size="24" color="#fff">
                <component :is="stat.icon" />
              </el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-title">{{ stat.title }}</div>
              <div class="stat-trend" :style="{ color: stat.color }">
                {{ stat.trend }} 较上月
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 内容区域 -->
    <el-row :gutter="20" class="content-row">
      <el-col :span="16">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>快捷操作</span>
            </div>
          </template>
          <div class="quick-actions">
            <el-button type="primary" :icon="User">添加员工</el-button>
            <el-button type="success" :icon="Document">上传文档</el-button>
            <el-button type="warning" :icon="TrendCharts">查看报表</el-button>
            <el-button type="info" :icon="DataLine">导出数据</el-button>
          </div>
        </el-card>

        <el-card style="margin-top: 20px">
          <template #header>
            <span>待办事项</span>
          </template>
          <el-empty description="暂无待办事项" />
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card>
          <template #header>
            <span>最近动态</span>
          </template>
          <el-timeline>
            <el-timeline-item
              v-for="activity in activities"
              :key="activity.time"
              :timestamp="activity.time"
              :type="activity.type"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.overview-container {
  .stats-row {
    margin-bottom: 20px;

    .stat-card {
      :deep(.el-card__body) {
        padding: 20px;
      }

      .stat-content {
        display: flex;
        align-items: center;
        gap: 16px;

        .stat-icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-info {
          flex: 1;

          .stat-value {
            font-size: 24px;
            font-weight: 600;
            color: #333;
            margin-bottom: 4px;
          }

          .stat-title {
            font-size: 14px;
            color: #666;
            margin-bottom: 4px;
          }

          .stat-trend {
            font-size: 12px;
          }
        }
      }
    }
  }

  .content-row {
    .quick-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
  }
}
</style>
