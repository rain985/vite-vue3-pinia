<template>
  <a-breadcrumb v-show="globalStore.themeConfig.isBreadcrumb">
    <a-breadcrumb-item v-for="(item, index) in breadCrunbList" :key="index">
      <router-link :to="item.path" v-if="!item.children">
        <component
          :is="item.meta.icon"
          v-show="globalStore.themeConfig.isBreadcrumbIcon"
        ></component>
        {{ item.meta.title }}
      </router-link>
      <span class="" v-else
        ><component
          :is="item.meta.icon"
          v-show="globalStore.themeConfig.isBreadcrumbIcon"
        ></component>
        {{ item.meta.title }}</span
      >
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>
<script setup>
import { computed } from 'vue'
import { AuthStore } from '@/store/modules/auth'
import { GlobalStore } from '@/store/index'
import { useRoute } from 'vue-router'
import { HOME_URL } from '@/config/config'

const authStore = AuthStore()
const globalStore = GlobalStore()
const route = useRoute()

// 获取面包屑
const breadCrunbList = computed(() => {
  let breadCrumbData =
    authStore.breadCrunbListGet[
      route.matched[route.matched.length - 1]?.path
    ] ?? []

  // 添加首页
  if (breadCrumbData[0]?.meta.title !== route.meta.title) {
    breadCrumbData = [
      { path: HOME_URL, meta: { icon: 'HomeFilled', title: '首页' } },
      ...breadCrumbData
    ]
  }
  return breadCrumbData
})
</script>
