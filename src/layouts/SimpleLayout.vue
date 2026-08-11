<script setup lang="ts">
// SimpleLayout - 简洁布局，用于登录、404等页面
</script>

<template>
  <div class="simple-layout">
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
