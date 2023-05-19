<template>
  <div>
    <router-view v-slot="{ Component, route }">
      <component
        :is="Component"
        :key="route.path"
        v-if="isRouterShow"
      ></component>
    </router-view>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'

const isRouterShow = ref(true)
// 刷新页面
const refreshCurrentPage = val => (isRouterShow.value = val)
provide('refresh', refreshCurrentPage)
</script>
