<script setup lang="ts">
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const props = withDefaults(
  defineProps<{
    name: keyof typeof ElementPlusIconsVue
    size?: number
    color?: string
  }>(),
  {
    size: 18,
    color: undefined,
  }
)
</script>

<template>
  <el-icon :size="props.size" :color="props.color">
    <component :is="ElementPlusIconsVue[props.name]" />
  </el-icon>
</template>
