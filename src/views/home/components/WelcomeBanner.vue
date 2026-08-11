<script setup lang="ts">
import { userInfo, quickActions } from '@/mock/portalData'

const emit = defineEmits<{
  quickAction: [route: string]
}>()

const handleQuickAction = (route: string) => {
  emit('quickAction', route)
}
</script>

<template>
  <div class="welcome-banner">
    <div class="banner-content">
      <h2>上午好，{{ userInfo.name }} 👋</h2>
      <p>
        今天是 {{ userInfo.today }}，共
        {{ userInfo.todoCount }} 条待办，需要今日处理完成。
      </p>
      <div class="quick-actions">
        <button
          v-for="action in quickActions"
          :key="action.name"
          class="action-btn"
          @click="handleQuickAction(action.route)"
        >
          {{ action.icon }} {{ action.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 13px;
      transition: background 0.2s;

      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
}
</style>
