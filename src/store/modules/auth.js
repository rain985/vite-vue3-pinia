import { defineStore } from 'pinia'
import { getShowMnuList, getAllBreadcrumbList, getFlatArr } from '@/utils/utils'
import { getAuthMenuListApi } from '@/service/modules/login'

// AuthStore
export const AuthStore = defineStore({
  id: 'AuthStore',
  state: () => ({
    // 当前页面路由名称，用来做按钮权限筛选
    routeName: '',
    // 按钮权限列表
    authButtonList: {
      ggg: ['add', 'edit', 'delete', 'import', 'export'],
      ccc: ['add', 'edit', 'delete', 'import', 'export']
    },
    // 菜单权限列表
    authMenuList: [],
    // 是否打开主题配置
    drawerVisible: false
  }),
  getters: {
    // 获取按钮权限信息
    authButtonListGet: state => state.authButtonList,
    // 菜单权限列表
    authMenuListGet: state => state.authMenuList,
    // 获取需要渲染的菜单
    showMnuListGet: state => getShowMnuList(state.authMenuList),
    // 获取所有的面包屑
    breadCrunbListGet: state => getAllBreadcrumbList(state.authMenuList),
    // 扁平化之后的一维数组路由，主要用来添加动态路由
    flatMenuListGet: state => getFlatArr(state.authMenuList)
  },
  actions: {
    async setRouteName(name) {
      this.routeName = name
    },
    async setDrawerVisible(visible) {
      this.drawerVisible = visible
    },
    async getAuthMenuList() {
      const { data } = await getAuthMenuListApi()
      this.authMenuList = data
    }
  }
})
