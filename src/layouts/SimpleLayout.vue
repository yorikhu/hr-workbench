<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { House, Document, User } from '@element-plus/icons-vue'
</script>

<template>
  <div class="simple-layout">
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-brand">
          <h1>HR Workbench</h1>
        </div>
        <div class="nav-menu">
          <RouterLink to="/" class="nav-link">
            <el-icon><House /></el-icon>
            <span>首页</span>
          </RouterLink>
          <RouterLink to="/about" class="nav-link">
            <el-icon><Document /></el-icon>
            <span>关于</span>
          </RouterLink>
          <RouterLink to="/login" class="nav-link">
            <el-icon><User /></el-icon>
            <span>登录</span>
          </RouterLink>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <RouterView />
    </main>

    <footer class="footer">
      <p>&copy; 2024 HR Workbench. All rights reserved.</p>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.simple-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .navbar {
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;

    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .nav-brand {
        h1 {
          font-size: 24px;
          font-weight: 600;
          color: #1890ff;
          margin: 0;
        }
      }

      .nav-menu {
        display: flex;
        gap: 32px;

        .nav-link {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #666;
          text-decoration: none;
          font-size: 15px;
          transition: color 0.3s;

          &:hover,
          &.router-link-active {
            color: #1890ff;
          }

          .el-icon {
            font-size: 18px;
          }
        }
      }
    }
  }

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .footer {
    background: #001529;
    color: rgba(255, 255, 255, 0.65);
    text-align: center;
    padding: 24px;
    margin-top: auto;

    p {
      margin: 0;
      font-size: 14px;
    }
  }
}
</style>
