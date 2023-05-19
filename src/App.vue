<template>
  <a-config-provider :locale="locale">
    <router-view></router-view>
  </a-config-provider>
</template>

<script setup>
import { ref } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { changeThemeConfig } from '@/utils/changeThemeConfig'
// 全局引入style下的样式文件
import.meta.globEager('@/style/**/*.less')

const locale = ref(zhCN)
// 设置主题色
changeThemeConfig()

// 先挂载pinia，后使用
</script>
