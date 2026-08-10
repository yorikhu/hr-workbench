<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="placeholder-view">
    <el-empty description="此功能模块正在开发中">
      <template #image>
        <el-icon :size="100" color="#909399">
          <component :is="'Tools'" />
        </el-icon>
      </template>
      <el-button type="primary" @click="$router.push('/')">返回门户</el-button>
    </el-empty>
  </div>
</template>

<style scoped lang="scss">
.placeholder-view {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}
</style>
