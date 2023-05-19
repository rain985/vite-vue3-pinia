<template>
  <div class="not-container flex-center">
    <img src="@/assets/img/403.png" class="not-img" alt="403" />
    <div class="not-detail">
      <h2>403</h2>
      <h4>抱歉，您无权访问该页面~🙅‍♂️🙅‍♀️</h4>
      <a-button type="primary" @click="router.push(HOME_URL)"
        >返回首页</a-button
      >
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { HOME_URL } from '@/config/config'

const router = useRouter()
</script>

<style>
@import url('./index.less');
</style>
