<template>
  <div class="bread-crumb flex-center">
    <Breadcrumb />
  </div>
  <div class="switch-theme">
    <skin-outlined @click="openThemeConfig" />
    <a-dropdown>
      <a class="ant-dropdown-link" @click.prevent>
        Hover me
        <DownOutlined />
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <a href="javascript:;">1st menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">2nd menu item</a>
          </a-menu-item>
          <a-menu-item>
            <span @click="logout">退出登录</span>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import Breadcrumb from './components/Breadcrumb.vue'
import { useRouter } from 'vue-router'
import { GlobalStore } from '@/store'
import { AuthStore } from '@/store/modules/auth'
import { LOGIN_URL } from '@/config/config.js'

const globalStore = GlobalStore()
const authStore = AuthStore()
const router = useRouter()
const logout = () => {
  globalStore.setToken('')
  router.push(LOGIN_URL)
}
const openThemeConfig = async () => {
  await authStore.setDrawerVisible(true)
}
</script>
