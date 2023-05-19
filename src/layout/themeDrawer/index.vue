<template>
  <a-drawer
    v-model:visible="authStore.drawerVisible"
    class="theme-container"
    title="布局设置"
    placement="right"
  >
    <a-divider><skin-outlined style="margin-right: 10px" />主题设置</a-divider>
    <div class="theme-item">
      <span>主题</span>
      <a-select
        ref="select"
        v-model:value="globalStore.themeConfig.primary"
        style="width: 120px"
        @change="themeChange"
      >
        <a-select-option
          v-for="item in THEME_SETTING"
          :value="item.value"
          :key="item.value"
          >{{ item.name }}</a-select-option
        >
      </a-select>
    </div>
    <div class="theme-item">
      <span>灰色模式</span>
      <a-switch v-model:checked="globalStore.themeConfig"></a-switch>
    </div>
    <div class="theme-item">
      <span>色弱模式</span>
      <a-switch v-model:checked="globalStore.themeConfig"></a-switch>
    </div>
    <a-divider
      ><setting-outlined style="margin-right: 10px" />界面设置</a-divider
    >
    <div class="theme-item" v-for="item in THEME_CONFIG" :key="item.value">
      <span>{{ item.name }}</span>
      <a-switch
        v-model:checked="globalStore.themeConfig[item.value]"
      ></a-switch>
    </div>
  </a-drawer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { AuthStore } from '@/store/modules/auth'
import { GlobalStore } from '@/store'
import { THEME_SETTING, THEME_CONFIG } from '@/config/config'
import { changeThemeConfig } from '@/utils/changeThemeConfig'

const authStore = AuthStore()
const globalStore = GlobalStore()

// 主题选择事件
const themeChange = value => {
  changeThemeConfig(value)
}
</script>
