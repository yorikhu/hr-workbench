<script setup lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import SimpleLayout from '@/layouts/SimpleLayout.vue'
import PortalLayout from '@/layouts/PortalLayout.vue'

const route = useRoute()
const router = useRouter()
const isReady = ref(false)

// 等待路由准备完毕
router.isReady().then(() => {
  isReady.value = true
})

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
  <component v-if="isReady" :is="layout" />
  <div v-else class="layout-loading"></div>
</template>

<style>
.layout-loading {
  display: none;
}
</style>

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
