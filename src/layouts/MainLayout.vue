<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'
import AppIcon from '@/components/icons/AppIcon.vue'
import { getCurrentSystemInfo } from '@/mock/mainMenuData'
import { userInfo } from '@/mock/portalData'

const router = useRouter()
const route = useRoute()

// 获取当前系统信息
const currentSystem = computed(() => getCurrentSystemInfo(route.path))

// 菜单项
const menuItems = computed(() => currentSystem.value?.menuItems || [])

// 返回门户
const handleBackToPortal = () => {
  router.push('/')
}

// 菜单点击
const handleMenuClick = (index: string) => {
  if (index !== route.path) {
    router.push(index)
  }
}
</script>

<template>
  <div class="system-layout">
    <!-- 顶部导航栏 -->
    <header class="header">
      <div class="header-content">
        <div class="header-left">
          <el-tooltip content="返回门户" placement="bottom">
            <button class="back-btn" @click="handleBackToPortal">
              <el-icon><ArrowLeft /></el-icon>
            </button>
          </el-tooltip>
          <div v-if="currentSystem" class="system-info">
            <div class="icon-badge" :class="currentSystem.color">
              <AppIcon :name="currentSystem.icon" />
            </div>
            <h1>{{ currentSystem.name }}</h1>
          </div>
        </div>
        <div class="header-right">
          <div class="user-info">
            <div class="avatar">{{ userInfo.avatar }}</div>
            <div class="user-detail">
              <p class="name">{{ userInfo.name }}</p>
              <p class="role">{{ userInfo.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="layout-body">
      <!-- 左侧菜单 -->
      <aside class="sidebar">
        <div class="sidebar-content">
          <nav class="menu-nav">
            <button
              v-for="item in menuItems"
              :key="item.index"
              :class="['menu-item', { active: route.path === item.index }]"
              @click="handleMenuClick(item.index)"
            >
              <AppIcon :name="item.icon" />
              <span>{{ item.title }}</span>
            </button>
          </nav>
        </div>
      </aside>

      <!-- 主内容区 -->
      <main class="main-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.system-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f7fa;
}

.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 0px 10px #dbdbdb;

  .header-content {
    padding: 0 24px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 16px;

    .back-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 12px;
      border-radius: 8px;
      border: none;
      background: transparent;
      color: #6b7280;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: #f3f4f6;
        color: #374151;
      }

      .el-icon {
        font-size: 16px;
      }
    }

    .system-info {
      display: flex;
      align-items: center;
      gap: 12px;

      .icon-badge {
        width: 36px;
        height: 36px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;

        &.from-blue-500.to-blue-600 {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
        }
        &.from-sky-500.to-cyan-500 {
          background: linear-gradient(135deg, #0ea5e9, #06b6d4);
        }
        &.from-pink-500.to-rose-500 {
          background: linear-gradient(135deg, #ec4899, #f43f5e);
        }
        &.from-indigo-500.to-violet-500 {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
        }
        &.from-emerald-500.to-teal-500 {
          background: linear-gradient(135deg, #10b981, #14b8a6);
        }
        &.from-amber-500.to-orange-500 {
          background: linear-gradient(135deg, #f59e0b, #f97316);
        }
        &.from-purple-500.to-fuchsia-500 {
          background: linear-gradient(135deg, #a855f7, #d946ef);
        }
        &.from-red-500.to-orange-500 {
          background: linear-gradient(135deg, #ef4444, #f97316);
        }
        &.from-blue-500.to-indigo-500 {
          background: linear-gradient(135deg, #3b82f6, #6366f1);
        }

        :deep(.el-icon) {
          color: #fff;
        }
      }

      h1 {
        font-size: 18px;
        font-weight: 600;
        color: #1f2937;
        margin: 0;
        line-height: 1.2;
      }
    }
  }

  .header-right {
    .user-info {
      display: flex;
      align-items: center;
      gap: 10px;

      .avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: linear-gradient(135deg, #3b82f6, #6366f1);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 13px;
        font-weight: 500;
      }

      .user-detail {
        .name {
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          margin: 0;
          line-height: 1.2;
        }

        .role {
          font-size: 12px;
          color: #9ca3af;
          margin: 0;
          margin-top: 2px;
        }
      }
    }
  }
}

.layout-body {
  flex: 1;
  width: 100%;
  padding: 24px;
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 24px;
}

.sidebar {
  position: sticky;
  top: 88px;
  height: fit-content;
  max-height: calc(100vh - 112px);
  overflow-y: auto;

  .sidebar-content {
    background: #fff;
    border-radius: 16px;
    border: 1px solid #e5e7eb;
    padding: 16px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  .menu-nav {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .menu-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    border-radius: 12px;
    border: none;
    background: transparent;
    color: #6b7280;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
    text-align: left;

    &:hover {
      background: #f3f4f6;
      color: #374151;
    }

    &.active {
      background: #eff6ff;
      color: #3b82f6;
      font-weight: 500;

      :deep(.el-icon) {
        color: #3b82f6;
      }
    }

    :deep(.el-icon) {
      font-size: 18px;
      color: #6b7280;
    }
  }
}

.main-content {
  min-width: 0;
}
</style>
