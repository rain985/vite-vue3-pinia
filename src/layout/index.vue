<!--  -->
<template>
  <a-layout class="layout-container" theme="light">
    <a-layout-sider
      theme="light"
      v-model:collapsed="themeConfig.isCollapse"
      width="260"
      collapsedWidth="80"
      :trigger="null"
      collapsible
    >
      <div class="sider-logo flex-center">
        <div>
          <img src="../assets/vue.svg" />
          <span v-show="!themeConfig.isCollapse">{{
            themeConfig.isCollapse ? 'G' : 'Geeker Admin'
          }}</span>
        </div>
      </div>

      <a-menu
        v-model:selectedKeys="selectedKeys"
        v-model:open-keys="openKeys"
        mode="inline"
        theme="dark"
        @openChange="onOpenChange"
      >
        <Nav :menuList="menuList" />
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header theme="light">
        <div class="collapse-triger-sider" @click="collapsed">
          <MenuUnfoldOutlined v-if="themeConfig.isCollapse" />
          <MenuFoldOutlined v-else />
        </div>
        <Header />
      </a-layout-header>
      <a-layout-content>
        <div class="page-wrap">
          <Main />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
  <ThemeDrawer />
</template>

<script setup name="layout">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { GlobalStore } from '@/store'
import { AuthStore } from '@/store/modules/auth'
import Header from '@/layout/header/index.vue'
import Main from '@/layout/main/index.vue'
import Nav from '@/layout/nav/subMenu.vue'
import ThemeDrawer from '@/layout/themeDrawer/index.vue'

const route = useRoute()
const globalStore = GlobalStore()
const authStore = AuthStore()

// 获取当前配置
const themeConfig = computed(() => globalStore.getThemeConfig)

// 获取当前点击菜单高亮
const selectedKeys = computed(() => [
  route.meta.activeMenu ? route.meta.activeMenu : route.path
])
// 获取当前打开的菜单
const openKeys = computed(() => themeConfig.value.openKeys)
// 获取菜单数据
const menuList = computed(() => authStore.showMnuListGet ?? [])

// 获取所有带子节点一级菜单
const rootSubmenuKeys = computed(() => {
  let rootSubmenuKeys = []
  menuList.value.forEach(item => {
    if (item.children) {
      rootSubmenuKeys.push(item.path)
    }
  })
  return rootSubmenuKeys
})

// 一次打开一个菜单
const onOpenChange = openkeys => {
  const keys = JSON.parse(JSON.stringify(themeConfig.value.openKeys))
  const latestOpenKey = openkeys.find(key => !keys.includes(key))

  globalStore.setThemeConfig({
    ...themeConfig.value,
    openKeys:
      rootSubmenuKeys.value.indexOf(latestOpenKey) === -1
        ? openkeys
        : latestOpenKey
        ? [latestOpenKey]
        : []
  })
}

// 菜单折叠事件
const collapsed = () => {
  globalStore.setThemeConfig({
    ...themeConfig.value,
    isCollapse: !themeConfig.value.isCollapse
  })
}
</script>

<style scoped lang="less"></style>
