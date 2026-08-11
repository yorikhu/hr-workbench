<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  header?: string
  shadow?: 'always' | 'hover' | 'never'
  bodyStyle?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  shadow: 'never',
})

const cardClass = computed(
  () => `app-card ${props.shadow ? 'is-' + props.shadow : ''}`,
)
</script>

<template>
  <el-card :class="cardClass" :shadow="shadow" :body-style="bodyStyle">
    <template v-if="$slots.header || header" #header>
      <slot name="header">
        <h3>{{ header }}</h3>
      </slot>
    </template>
    <slot></slot>
  </el-card>
</template>

<style scoped lang="scss">
.app-card {
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  box-shadow: none;
  background: #fff;

  :deep(.el-card__header) {
    padding: 16px 24px;
    border-bottom: 1px solid #f3f4f6;
  }

  :deep(.el-card__body) {
    padding: 16px 24px;
  }
}
</style>
