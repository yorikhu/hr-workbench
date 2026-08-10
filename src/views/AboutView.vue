<script setup lang="ts">
import { ElMessage } from 'element-plus'
</script>

<template>
  <div class="about-container">
    <el-row :gutter="24">
      <el-col :span="24">
        <el-card>
          <template #header>
            <h2>关于 HR Workbench</h2>
          </template>
          <div class="about-content">
            <p>HR Workbench 是一个现代化的人力资源管理平台，提供员工管理、部门管理、文档管理等功能。</p>
            <el-divider />
            <el-descriptions title="产品特性" :column="2" border>
              <el-descriptions-item label="用户管理">支持用户、角色、权限管理</el-descriptions-item>
              <el-descriptions-item label="员工管理">完整的员工信息管理</el-descriptions-item>
              <el-descriptions-item label="部门管理">灵活的部门组织架构</el-descriptions-item>
              <el-descriptions-item label="文档中心">政策制度、表单下载</el-descriptions-item>
            </el-descriptions>
            <el-divider />
            <div class="about-actions">
              <el-button type="primary" @click="ElMessage.success('感谢关注！')">
                了解更多
              </el-button>
              <el-button @click="ElMessage.info('请联系 support@hr-workbench.com')">
                联系我们
              </el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.about-container {
  max-width: 1000px;
  margin: 40px auto;
  padding: 0 24px;

  .about-content {
    p {
      font-size: 16px;
      color: #666;
      line-height: 1.8;
      margin-bottom: 24px;
    }

    .about-actions {
      display: flex;
      gap: 12px;
      justify-content: center;
      margin-top: 24px;
    }
  }
}
</style>
