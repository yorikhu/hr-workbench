<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  Lock,
  Tools,
  Monitor,
  UserFilled,
  DataLine,
  Fold,
  Expand,
  Bell,
} from '@element-plus/icons-vue'

const router = useRouter()
const isCollapse = ref(false)

// 系统管理菜单
const menuItems = ref([
  {
    index: '/admin/users',
    title: '用户管理',
    icon: UserFilled,
    children: [
      { index: '/admin/users/list', title: '用户列表' },
      { index: '/admin/users/roles', title: '角色权限' },
    ],
  },
  {
    index: '/admin/system',
    title: '系统设置',
    icon: Tools,
    children: [
      { index: '/admin/system/config', title: '系统配置' },
      { index: '/admin/system/logs', title: '操作日志' },
      { index: '/admin/system/security', title: '安全设置' },
    ],
  },
  {
    index: '/admin/monitor',
    title: '监控中心',
    icon: Monitor,
    children: [
      { index: '/admin/monitor/performance', title: '性能监控' },
      { index: '/admin/monitor/api', title: 'API 监控' },
    ],
  },
  {
    index: '/admin/data',
    title: '数据管理',
    icon: DataLine,
    children: [
      { index: '/admin/data/backup', title: '数据备份' },
      { index: '/admin/data/import', title: '数据导入' },
    ],
  },
])

const handleMenuSelect = (index: string) => {
  router.push(index)
}

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<template>
  <el-container class="admin-layout">
    <el-aside :width="isCollapse ? '64px' : '240px'" class="sidebar">
      <div class="logo-section">
        <h3 v-if="!isCollapse">系统管理后台</h3>
        <h3 v-else>Admin</h3>
      </div>
      <el-menu
        :default-active="$route.path"
        :collapse="isCollapse"
        :collapse-transition="false"
        @select="handleMenuSelect"
      >
        <template v-for="item in menuItems" :key="item.index">
          <el-sub-menu v-if="item.children" :index="item.index">
            <template #title>
              <el-icon><component :is="item.icon" /></el-icon>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item
              v-for="child in item.children"
              :key="child.index"
              :index="child.index"
            >
              {{ child.title }}
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item v-else :index="item.index">
            <el-icon><component :is="item.icon" /></el-icon>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="header">
        <div class="header-left">
          <el-icon class="collapse-icon" @click="toggleCollapse">
            <Fold v-if="!isCollapse" />
            <Expand v-else />
          </el-icon>
          <div class="admin-badge">
            <el-icon><Lock /></el-icon>
            <span>管理后台</span>
          </div>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }"
              >管理首页</el-breadcrumb-item
            >
            <el-breadcrumb-item v-if="$route.meta.title">
              {{ $route.meta.title }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="header-right">
          <el-badge :value="12" class="notification-badge">
            <el-button :icon="Bell" circle />
          </el-badge>
          <el-dropdown>
            <span class="user-dropdown">
              <el-avatar
                :size="32"
                :src="'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"
              />
              <span class="username">超级管理员</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <el-icon><UserFilled /></el-icon>
                  个人中心
                </el-dropdown-item>
                <el-dropdown-item divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <el-main class="main-content">
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.admin-layout {
  height: 100vh;

  .sidebar {
    background: #1f1f1f;
    transition: width 0.3s;

    :deep(.el-menu) {
      border-right: none;
      background: #1f1f1f;
    }

    :deep(.el-menu-item),
    :deep(.el-sub-menu__title) {
      color: rgba(255, 255, 255, 0.65);

      &:hover {
        background: #e6a23c !important;
        color: #fff;
      }
    }

    :deep(.el-menu-item.is-active) {
      background: #e6a23c !important;
      color: #fff;
    }

    .logo-section {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #e6a23c;
      font-size: 18px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    border-bottom: 1px solid #f0f0f0;
    padding: 0 20px;

    .header-left {
      display: flex;
      align-items: center;
      gap: 16px;

      .collapse-icon {
        font-size: 20px;
        cursor: pointer;
        color: #666;

        &:hover {
          color: #e6a23c;
        }
      }

      .admin-badge {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 12px;
        background: linear-gradient(135deg, #e6a23c, #f5c67a);
        color: #fff;
        border-radius: 4px;
        font-size: 13px;
        font-weight: 500;
      }
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 16px;

      .notification-badge {
        :deep(.el-badge__content) {
          background-color: #f56c6c;
        }
      }

      .user-dropdown {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;

        .username {
          color: #333;
          font-weight: 500;
        }
      }
    }
  }

  .main-content {
    background: #f5f5f5;
    padding: 24px;
    overflow-y: auto;
  }
}
</style>
