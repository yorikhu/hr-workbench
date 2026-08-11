<script setup lang="ts">
import { ArrowRightBold } from '@element-plus/icons-vue'
import { changeRecords } from '@/mock/portalData'
import AppCard from '@/components/AppCard.vue'
import AppTable from '@/components/AppTable.vue'
</script>

<template>
  <AppCard>
    <template #header>
      <div class="table-header">
        <div>
          <h3>近期异动记录</h3>
          <p>入职、离职、调岗、转正等最新动态</p>
        </div>
        <el-button link class="view-all-btn">
          全部异动
          <el-icon class="el-icon--right"><ArrowRightBold /></el-icon>
        </el-button>
      </div>
    </template>
    <AppTable :data="changeRecords">
      <el-table-column prop="name" label="员工">
        <template #default="{ row }">
          <span class="table-name">{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="dept" label="部门" />
      <el-table-column prop="type" label="异动类型">
        <template #default="{ row }">
          <el-tag
            :type="
              {
                入职: 'success',
                转正: 'primary',
                调岗: 'info',
                离职: 'warning',
              }[row.type as '入职' | '转正' | '调岗' | '离职']
            "
            size="small"
          >
            {{ row.type }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="生效日期" />
      <el-table-column prop="status" label="审批状态">
        <template #default="{ row }">
          <span :class="{ 'status-done': row.status === '已完成' }">
            {{ row.status }}
          </span>
        </template>
      </el-table-column>
    </AppTable>
  </AppCard>
</template>

<style scoped lang="scss">
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: #1f2937;
    margin: 0;
  }

  p {
    font-size: 12px;
    color: #9ca3af;
    margin: 4px 0 0 0;
  }

  .view-all-btn {
    font-size: 13px;
    color: #3b82f6;
    padding: 0;

    .el-icon {
      font-size: 12px;
    }
  }
}

.table-name {
  font-weight: 500;
  color: #374151;
}

.status-done {
  color: #6b7280;
}
</style>
