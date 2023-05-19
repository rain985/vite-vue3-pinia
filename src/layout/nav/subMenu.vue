<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <a-sub-menu
      v-if="subItem.children && subItem.children.length > 0"
      :key="subItem.path"
    >
      <template #icon>
        <component :is="subItem.meta.icon"></component>
      </template>
      <template #title>{{ subItem.meta.title }}</template>
      <subMenu :menu-list="subItem.children" />
    </a-sub-menu>
    <template v-else>
      <a-menu-item :key="subItem.path" @click="handkeClickMenu(subItem)">
        <template #icon>
          <component :is="subItem.meta.icon"></component>
        </template>
        <span>{{ subItem.meta.title }}</span>
      </a-menu-item>
    </template>
  </template>
</template>
<script setup name="nva">
import { useRouter } from 'vue-router'
const props = defineProps({
  menuList: {
    type: Array,
    default: () => []
  }
})

const router = useRouter()

// 菜单点击事件
const handkeClickMenu = subItem => {
  if (subItem.meta.isLink) return window.open(subItem.meta.isLink, '_blank')
  router.push(subItem.path)
}
</script>
