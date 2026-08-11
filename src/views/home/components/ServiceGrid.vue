<script setup lang="ts">
import {
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
import { serviceItems, recruitmentProgress } from '@/mock/portalData'
import AppCard from '@/components/AppCard.vue'

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

const emit = defineEmits<{
  serviceClick: [route: string]
}>()

const handleServiceClick = (route: string) => {
  emit('serviceClick', route)
}
</script>

<template>
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
</template>

<style scoped lang="scss">
.service-card {
  display: flex;
  flex-direction: column;

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

  .progress-bar {
    width: 100%;
    height: 8px;
    background: #f3f4f6;
    border-radius: 4px;
    overflow: hidden;
    margin-top: 8px;

    .progress-fill {
      height: 100%;
      border-radius: 4px;
      transition: width 0.3s;

      &.gradient {
        background: linear-gradient(90deg, #3b82f6, #6366f1);
      }
    }

    &.large {
      height: 10px;
    }
  }
}
</style>
