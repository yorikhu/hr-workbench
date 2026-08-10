<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import SimpleLayout from '@/layouts/SimpleLayout.vue'
import PortalLayout from '@/layouts/PortalLayout.vue'

const route = useRoute()

// 根据路由 meta 动态渲染对应的 Layout
const layout = computed(() => {
  const layoutType = route.meta.layout || 'simple'

  switch (layoutType) {
    case 'main':
      return MainLayout
    case 'admin':
      return AdminLayout
    case 'portal':
      return PortalLayout
    case 'simple':
    default:
      return SimpleLayout
  }
})
</script>

<template>
  <component :is="layout" />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial, sans-serif;
}
</style>
