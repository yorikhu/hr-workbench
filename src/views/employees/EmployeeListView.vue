<template>
  <div class="employee-list-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>员工列表</span>
          <el-button type="primary">添加员工</el-button>
        </div>
      </template>
      <el-table :data="[]" stripe>
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="department" label="部门" />
        <el-table-column prop="position" label="职位" />
        <el-table-column prop="status" label="状态" />
        <el-table-column label="操作">
          <template #default>
            <el-button type="primary" link>编辑</el-button>
            <el-button type="danger" link>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-empty description="暂无数据" :image-size="100" />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.employee-list-container {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
