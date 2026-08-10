<template>
  <div class="policies-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>政策制度</span>
          <el-button type="primary">上传文档</el-button>
        </div>
      </template>
      <el-empty description="暂无政策文档" />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.policies-container {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
