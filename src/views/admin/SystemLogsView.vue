<template>
  <div class="system-logs-container">
    <el-card>
      <template #header>
        <h3>操作日志</h3>
      </template>
      <el-empty description="暂无日志记录" />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.system-logs-container {
  .el-card {
    margin-bottom: 20px;
  }
}
</style>
