<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  Location,
  Menu,
  User,
  Setting,
  Document,
  Fold,
  Expand
} from '@element-plus/icons-vue'

const router = useRouter()
const isCollapse = ref(false)

// 主业务菜单
const menuItems = ref([
  {
    index: '/dashboard',
    title: '控制台',
    icon: Location,
    children: [
      { index: '/dashboard/overview', title: '概览' },
      { index: '/dashboard/analytics', title: '数据分析' }
    ]
  },
  {
    index: '/employees',
    title: '员工管理',
    icon: User,
    children: [
      { index: '/employees/list', title: '员工列表' },
      { index: '/employees/departments', title: '部门管理' },
      { index: '/employees/positions', title: '职位管理' }
    ]
  },
  {
    index: '/documents',
    title: '文档中心',
    icon: Document,
    children: [
      { index: '/documents/policies', title: '政策制度' },
      { index: '/documents/forms', title: '表单下载' }
    ]
  }
])

const handleMenuSelect = (index: string) => {
  router.push(index)
}

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<template>
  <el-container class="main-layout">
    <el-aside :width="isCollapse ? '64px' : '200px'" class="sidebar">
      <div class="logo-section">
        <h2 v-if="!isCollapse">HR Workbench</h2>
        <h2 v-else>HR</h2>
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
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="$route.meta.title">
              {{ $route.meta.title }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="header-right">
          <el-dropdown>
            <span class="user-dropdown">
              <el-avatar :size="32" :src="'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'" />
              <span class="username">管理员</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <el-icon><User /></el-icon>
                  个人中心
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-icon><Setting /></el-icon>
                  设置
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
.main-layout {
  height: 100vh;

  .sidebar {
    background: #001529;
    transition: width 0.3s;

    :deep(.el-menu) {
      border-right: none;
      background: #001529;
    }

    :deep(.el-menu-item),
    :deep(.el-sub-menu__title) {
      color: rgba(255, 255, 255, 0.65);

      &:hover {
        background: #1890ff !important;
        color: #fff;
      }
    }

    :deep(.el-menu-item.is-active) {
      background: #1890ff !important;
      color: #fff;
    }

    .logo-section {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
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
          color: #1890ff;
        }
      }
    }

    .header-right {
      .user-dropdown {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;

        .username {
          color: #333;
        }
      }
    }
  }

  .main-content {
    background: #f0f2f5;
    padding: 20px;
    overflow-y: auto;
  }
}
</style>
