import { defineStore, createPinia } from 'pinia'
import { DEFAULT_PRIMARY } from '@/config/config.js'
import piniaPersistConfig from '@/config/piniaPersist'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// ThemeStore
export const GlobalStore = defineStore({
  id: 'GlobalState',
  state: () => ({
    // token
    token: '',
    // 主题配置
    themeConfig: {
      // 主题色
      primary: DEFAULT_PRIMARY,
      // 折叠菜单
      isCollapse: false,
      // 展开菜单
      openKeys: [],
      // 是否展示面包屑
      isBreadcrumb: true,
      // 是否展示面包屑图标
      isBreadcrumbIcon: true,
      // 是否展示页脚
      isPageFooter: true
    }
  }),
  getters: {
    // 获取主题配置
    getThemeConfig: state => state.themeConfig
  },
  actions: {
    // 设置主题配置
    async setThemeConfig(config) {
      this.themeConfig = { ...config }
    },
    // 设置token
    async setToken(token) {
      this.token = token
    }
  },
  persist: piniaPersistConfig('GlobalState')
})
const store = createPinia()
store.use(piniaPluginPersistedstate)

export default store
