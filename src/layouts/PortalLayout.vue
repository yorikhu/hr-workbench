<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Bell, Setting, Search, ArrowRight } from '@element-plus/icons-vue'
import { portalModules, userInfo } from '@/mock/portalData'
import AppIcon from '@/components/icons/AppIcon.vue'

const router = useRouter()
const route = useRoute()

const activeModule = computed(() => route.path)

const handleModuleClick = (moduleRoute: string) => {
  if (moduleRoute !== route.path) {
    router.push(moduleRoute)
  }
}
</script>

<template>
  <div class="portal-layout">
    <!-- 顶部导航栏 -->
    <header class="header">
      <div class="header-content">
        <div class="header-left">
          <div class="logo">
            <div class="logo-badge">HR</div>
            <div class="logo-text">
              <h1>HR 工作台</h1>
              <p>人力资源管理中心</p>
            </div>
          </div>
        </div>
        <div class="header-center">
          <el-input
            placeholder="搜索员工、职位、单据"
            class="search-input"
            :prefix-icon="Search"
          />
        </div>
        <div class="header-right">
          <div class="icon-btn-wrapper">
            <el-button class="icon-btn" circle>
              <el-icon><Bell /></el-icon>
            </el-button>
            <span class="badge-dot"></span>
          </div>
          <el-button class="icon-btn" circle>
            <el-icon><Setting /></el-icon>
          </el-button>
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
      <!-- 左侧边栏 -->
      <aside class="sidebar">
        <div class="sidebar-content">
          <p class="sidebar-title">功能模块</p>
          <nav class="module-nav">
            <button
              v-for="module in portalModules"
              :key="module.route"
              :class="[
                'module-item',
                { active: activeModule === module.route },
              ]"
              @click="handleModuleClick(module.route)"
            >
              <span class="icon-badge" :class="module.color">
                <AppIcon :name="module.icon as any" />
              </span>
              <span>{{ module.name }}</span>
            </button>
          </nav>
          <div class="sidebar-footer">
            <div class="update-time">
              <span>数据更新于</span>
              <span>2026-08-10</span>
            </div>
          </div>
        </div>
      </aside>

      <!-- 主内容区 -->
      <main class="main-content">
        <RouterView />
      </main>
    </div>

    <!-- 页脚 -->
    <footer class="footer">
      <span>© 2026 HR 工作台门户 · 人力资源管理中心</span>
      <span>系统版本 v2.4.0</span>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.portal-layout {
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
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.05);

  .header-content {
    padding: 0 24px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .header-left {
    .logo {
      display: flex;
      align-items: center;
      gap: 12px;

      .logo-badge {
        width: 36px;
        height: 36px;
        border-radius: 10px;
        background: linear-gradient(135deg, #3b82f6, #2563eb);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-weight: 600;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
      }

      .logo-text {
        h1 {
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
          line-height: 1.2;
        }

        p {
          font-size: 12px;
          color: #9ca3af;
          margin: 0;
          margin-top: 2px;
        }
      }
    }
  }

  .header-center {
    flex: 1;
    margin: 0 32px;
    display: none;

    @media (min-width: 768px) {
      display: block;
    }

    .search-input {
      :deep(.el-input__wrapper) {
        background: #f3f4f6;
        border-color: transparent;
        box-shadow: none;
        border-radius: 8px;

        &:hover,
        &.is-focus {
          background: #fff;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
        }
      }
    }
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 12px;

    .icon-btn-wrapper {
      position: relative;
      display: inline-block;
    }

    .icon-btn {
      border: none;
      background: transparent;
      color: #4b5563;
      font-weight: 600;
      font-size: 16px;

      &:hover {
        background: #f3f4f6;
        color: #1f2937;
      }

      .el-icon {
        font-size: 16px;
      }
    }

    .badge-dot {
      position: absolute;
      top: 6px;
      right: 6px;
      width: 6px;
      height: 6px;
      background: #ef4444;
      border-radius: 50%;
      pointer-events: none;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 10px;
      padding-left: 12px;
      border-left: 1px solid #e5e7eb;

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
        display: none;

        @media (min-width: 640px) {
          display: block;
        }

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

  .sidebar-title {
    font-size: 12px;
    font-weight: 600;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0 0 12px 12px;
  }

  .module-nav {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .module-item {
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
    }

    &.active {
      background: #eff6ff;
      color: #3b82f6;
      font-weight: 500;
    }

    .icon-badge {
      width: 34px;
      height: 34px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

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

      :deep(.el-icon) {
        color: #fff;
      }
    }
  }

  .sidebar-footer {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #f3f4f6;

    .update-time {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      padding: 8px;
      border-radius: 12px;
      background: #f9fafb;

      span {
        font-size: 12px;
        color: #6b7280;

        &:last-child {
          font-weight: 500;
          color: #374151;
        }
      }
    }
  }
}

.main-content {
  min-width: 0;
}

.footer {
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.05);
  background: #fff;
  padding: 16px 24px;
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: #9ca3af;
}
</style>
