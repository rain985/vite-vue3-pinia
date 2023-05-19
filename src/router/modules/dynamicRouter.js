import router from '@/router'
import { isType } from '@/utils/utils'
import { LOGIN_URL } from '@/config/config'
import { GlobalStore } from '@/store'
import { AuthStore } from '@/store/modules/auth'

// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob('@/views/**/*.vue')

/**
 * 初始化动态路由
 */
export const initDynamicRouter = async () => {
  const authStore = AuthStore()
  const globalStore = GlobalStore()
  try {
    // 1.获取菜单列表 && 按钮权限（可合并到一个接口获取，根据后端不同可自行改造）
    await authStore.getAuthMenuList()
    // await authStore.getAuthButtonList()

    // 2.判断当前用户有没有菜单权限
    if (!authStore.authMenuListGet.length) {
      globalStore.setToken('')
      router.replace(LOGIN_URL)
      return Promise.reject('当前用户没有权限，请联系管理员添加')
    }

    // 3.添加动态路由
    authStore.flatMenuListGet.forEach(item => {
      item.children && delete item.children
      if (item.component && isType(item.component) === 'string') {
        item.component = modules['/src/views' + item.component + '.vue']
      }
      if (item.meta.isFull) {
        router.addRoute(item)
      } else {
        router.addRoute('layout', { ...item })
      }
    })
    return Promise.resolve()
  } catch (error) {
    // 💢 当按钮 || 菜单请求出错时，重定向到登陆页
    globalStore.setToken('')
    router.replace(LOGIN_URL)
    return Promise.reject(error)
  }
}
