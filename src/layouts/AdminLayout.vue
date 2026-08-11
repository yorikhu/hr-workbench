<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Lock, Fold, Expand, Bell, ArrowLeft } from '@element-plus/icons-vue'
import AppIcon from '@/components/icons/AppIcon.vue'
import { userInfo } from '@/mock/portalData'

const router = useRouter()
const route = useRoute()
const isCollapse = ref(false)

// 系统管理菜单
const menuItems = ref([
  {
    index: '/admin/users/list',
    title: '用户列表',
    icon: 'UserFilled',
  },
  {
    index: '/admin/users/roles',
    title: '角色权限',
    icon: 'Lock',
  },
  {
    index: '/admin/system/config',
    title: '系统配置',
    icon: 'Tools',
  },
  {
    index: '/admin/system/logs',
    title: '操作日志',
    icon: 'Document',
  },
])

const handleMenuClick = (index: string) => {
  if (index !== route.path) {
    router.push(index)
  }
}

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

const handleBackToPortal = () => {
  router.push('/')
}
</script>

<template>
  <div class="admin-layout">
    <!-- 侧边栏 -->
    <aside :class="['sidebar', { collapsed: isCollapse }]">
      <div class="sidebar-content">
        <div class="logo-section">
          <div class="logo-content" v-if="!isCollapse">
            <AppIcon name="Lock" />
            <span>系统管理后台</span>
          </div>
          <div class="logo-icon" v-else>
            <AppIcon name="Lock" />
          </div>
        </div>
        <nav class="menu-nav">
          <button
            v-for="item in menuItems"
            :key="item.index"
            :class="['menu-item', { active: route.path === item.index }]"
            @click="handleMenuClick(item.index)"
          >
            <AppIcon :name="item.icon as any" />
            <span v-if="!isCollapse">{{ item.title }}</span>
          </button>
        </nav>
      </div>
    </aside>

    <!-- 主体内容 -->
    <div class="main-wrapper">
      <!-- 顶部导航栏 -->
      <header class="header">
        <div class="header-content">
          <div class="header-left">
            <button class="collapse-btn" @click="toggleCollapse">
              <el-icon><Fold v-if="!isCollapse" /><Expand v-else /></el-icon>
            </button>
            <el-tooltip content="返回门户" placement="bottom">
              <button class="back-btn" @click="handleBackToPortal">
                <el-icon><ArrowLeft /></el-icon>
              </button>
            </el-tooltip>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/admin' }">管理首页</el-breadcrumb-item>
              <el-breadcrumb-item v-if="$route.meta.title">
                {{ $route.meta.title }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="header-right">
            <div class="icon-btn-wrapper">
              <el-button class="icon-btn" circle>
                <el-icon><Bell /></el-icon>
              </el-button>
              <span class="badge-dot"></span>
            </div>
            <div class="user-info">
              <div class="avatar">{{ userInfo.avatar }}</div>
              <div class="user-detail">
                <p class="name">{{ userInfo.name }}</p>
                <p class="role">系统管理员</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- 主内容区 -->
      <main class="main-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.admin-layout {
  min-height: 100vh;
  display: flex;
  background: #f5f7fa;
}

.sidebar {
  width: 200px;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
  transition: width 0.3s;
  z-index: 100;

  &.collapsed {
    width: 64px;
  }

  .sidebar-content {
    padding: 16px 12px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .logo-section {
    margin-bottom: 16px;
    padding: 0 12px;

    .logo-content {
      height: 36px;
      display: flex;
      align-items: center;
      gap: 8px;
      color: #e6a23c;
      font-weight: 600;
      font-size: 16px;

      :deep(.el-icon) {
        font-size: 20px;
      }
    }

    .logo-icon {
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #e6a23c;

      :deep(.el-icon) {
        font-size: 20px;
      }
    }
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
    border-radius: 10px;
    border: none;
    background: transparent;
    color: rgba(255, 255, 255, 0.6);
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
    text-align: left;
    white-space: nowrap;

    &:hover {
      background: rgba(230, 162, 60, 0.15);
      color: rgba(255, 255, 255, 0.9);
    }

    &.active {
      background: linear-gradient(135deg, #e6a23c, #f5c67a);
      color: #1a1a2e;
      font-weight: 500;
    }

    :deep(.el-icon) {
      font-size: 18px;
      flex-shrink: 0;
    }
  }
}

.main-wrapper {
  flex: 1;
  margin-left: 200px;
  transition: margin-left 0.3s;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .sidebar.collapsed + & {
    margin-left: 64px;
  }
}

.header {
  position: sticky;
  top: 0;
  z-index: 50;
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
    gap: 12px;

    .collapse-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      border: none;
      background: transparent;
      color: #6b7280;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: #f3f4f6;
        color: #374151;
      }

      .el-icon {
        font-size: 18px;
      }
    }

    .back-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      border: none;
      background: transparent;
      color: #6b7280;
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

    :deep(.el-breadcrumb) {
      .el-breadcrumb__inner {
        color: #6b7280;
        font-size: 13px;

        &:hover {
          color: #e6a23c;
        }
      }

      .el-breadcrumb__item:last-child .el-breadcrumb__inner {
        color: #374151;
        font-weight: 500;
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
        background: linear-gradient(135deg, #e6a23c, #f5c67a);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #1a1a2e;
        font-size: 13px;
        font-weight: 600;
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

.main-content {
  flex: 1;
  padding: 24px;
  background: #f5f7fa;
  overflow-y: auto;
}
</style>
