<template>
  <a-button @click="router.push('/fff')">我是按钮</a-button>
  <h1>组件雷人</h1>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
