<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { House } from '@element-plus/icons-vue'
</script>

<template>
  <div class="simple-layout">
    <!-- 顶部导航栏 -->
    <header class="header">
      <div class="header-content">
        <div class="header-left">
          <div class="logo">
            <div class="logo-badge">HR</div>
            <div class="logo-text">
              <h1>HR 工作台</h1>
            </div>
          </div>
        </div>
        <div class="header-right">
          <RouterLink to="/" class="nav-link">
            <el-icon><House /></el-icon>
            <span>返回门户</span>
          </RouterLink>
        </div>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="main-content">
      <RouterView />
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <span>© 2026 HR 工作台 · 人力资源管理中心</span>
      <span>系统版本 v2.4.0</span>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.simple-layout {
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
      }
    }
  }

  .header-right {
    .nav-link {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border-radius: 8px;
      color: #6b7280;
      text-decoration: none;
      font-size: 14px;
      transition: all 0.2s;

      &:hover {
        background: #f3f4f6;
        color: #374151;
      }

      .el-icon {
        font-size: 16px;
      }
    }
  }
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
}

.footer {
  box-shadow: 0 0px 10px #dbdbdb;
  background: #fff;
  padding: 16px 24px;
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  font-size: 12px;
  color: #9ca3af;
}
</style>
