<template>
  <div class="not-container flex-center">
    <img src="@/assets/images/500.png" class="not-img" alt="500" />
    <div class="not-detail">
      <h2>500</h2>
      <h4>抱歉，您的网络不见了~🤦‍♂️🤦‍♀️</h4>
      <a-button type="primary" @click="router.push(HOME_URL)"
        >返回首页</a-button
      >
    </div>
  </div>
</template>

<script setup name="500">
import { useRouter } from 'vue-router'
import { HOME_URL } from '@/config/config'
const router = useRouter()
</script>

<style scoped lang="less">
@import './index.less';
</style>
