<script setup lang="ts">
import { ArrowRightBold } from '@element-plus/icons-vue'
import { todoItems } from '@/mock/portalData'
import AppCard from '@/components/AppCard.vue'

const emit = defineEmits<{
  todoClick: []
}>()
</script>

<template>
  <AppCard class="todo-card">
    <template #header>
      <div class="card-header">
        <h3>待办事项</h3>
        <span class="todo-count">今日 {{ todoItems.length }} 条</span>
      </div>
    </template>
    <div class="todo-list">
      <div
        v-for="todo in todoItems.slice(0, 3)"
        :key="todo.id"
        class="todo-item"
        :class="'todo-' + todo.type"
      >
        <span class="todo-dot"></span>
        <div class="todo-content">
          <p class="todo-title">{{ todo.title }}</p>
          <p class="todo-desc">{{ todo.desc }}</p>
        </div>
        <el-button link class="todo-btn" @click="emit('todoClick')"
          >处理</el-button
        >
      </div>
    </div>
    <el-button link class="view-all-btn">
      查看全部
      <el-icon class="el-icon--right"><ArrowRightBold /></el-icon>
    </el-button>
  </AppCard>
</template>

<style scoped lang="scss">
.todo-card {
  display: flex;
  flex-direction: column;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      font-size: 16px;
      font-weight: 600;
      color: #1f2937;
      margin: 0;
    }

    .todo-count {
      font-size: 12px;
      color: #9ca3af;
    }
  }

  .todo-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .todo-item {
    display: flex;
    gap: 12px;
    padding: 12px;
    border-radius: 12px;
    border: 1px solid transparent;

    &.todo-warning {
      background: #fffbeb;
      border-color: #fde68a;
    }

    &.todo-info {
      background: #eff6ff;
      border-color: #bfdbfe;
    }

    &.todo-primary {
      background: #eef2ff;
      border-color: #c7d2fe;
    }

    .todo-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-top: 6px;
      flex-shrink: 0;
      background: #cbd5e1;
    }

    &.todo-warning .todo-dot {
      background: #f59e0b;
    }

    &.todo-info .todo-dot {
      background: #3b82f6;
    }

    &.todo-primary .todo-dot {
      background: #6366f1;
    }

    .todo-content {
      flex: 1;
      min-width: 0;

      .todo-title {
        font-size: 14px;
        font-weight: 500;
        color: #1f2937;
        margin: 0;
      }

      .todo-desc {
        font-size: 12px;
        color: #6b7280;
        margin: 4px 0 0;
      }
    }

    .todo-btn {
      font-size: 12px;
      color: #3b82f6;
      flex-shrink: 0;
    }
  }

  .view-all-btn {
    margin-top: 24px;
    align-self: flex-end;
    font-size: 13px;
    color: #3b82f6;
    padding: 0;

    .el-icon {
      font-size: 12px;
    }
  }
}
</style>
