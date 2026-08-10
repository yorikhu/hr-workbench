<template>
  <div class="admin-users-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>用户管理</span>
          <el-button type="primary" :icon="User">添加用户</el-button>
        </div>
      </template>
      <el-alert
        title="这是管理后台界面"
        type="warning"
        :closable="false"
        style="margin-bottom: 20px"
      />
      <el-empty description="暂无用户数据" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { User } from '@element-plus/icons-vue'
</script>

<style scoped lang="scss">
.admin-users-container {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
