import { createRouter, createWebHistory } from 'vue-router'
import { staticRouter, errorRouter } from './modules/base'
import NProgress from '@/config/nprogress'
import { AuthStore } from '@/store/modules/auth'
import { GlobalStore } from '@/store'
import { LOGIN_URL } from '@/config/config.js'
import { initDynamicRouter } from './modules/dynamicRouter'

// const directives = import.meta.globEager('./*/*.js')

// for (const com in directives) {
//   // console.log(com.default)
//   //   const comkey = com.match(/.\/*\/*.js/)
//   //   console.log(comkey)
// }

/**
 * @description 动态路由参数配置简介 📚
 * @param path ==> 菜单路径
 * @param name ==> 菜单别名
 * @param redirect ==> 重定向地址
 * @param component ==> 视图文件路径
 * @param meta ==> 菜单信息
 * @param meta.icon ==> 菜单图标
 * @param meta.title ==> 菜单标题
 * @param meta.activeMenu ==> 当前路由为详情页时，需要高亮的菜单
 * @param meta.isLink ==> 是否外链
 * @param meta.isHide ==> 是否隐藏
 * @param meta.isFull ==> 是否全屏(示例：数据大屏页面)
 * @param meta.isAffix ==> 是否固定在 tabs nav
 * @param meta.isKeepAlive ==> 是否缓存
 * */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...staticRouter, ...errorRouter],
  static: false,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

/**
 * 路由拦截 beforeEach
 */
router.beforeEach(async (to, from, next) => {
  const globalStore = GlobalStore()
  // 1.开始
  NProgress.start()

  // 动态设置标题
  const title = import.meta.env.VITE_GLOB_APP_TITLE
  document.title = to.meta.title ? `${to.meta.title}-${title}`:title

  // 2判断是访问登录页，有token就在当前页，没有token重置路由至登录页
  if (to.path === LOGIN_URL) {
    if (globalStore.token !== '') return next(from.fullPath)
    resetRouter()
    return next()
  }

  // 3.没有token，跳转登录页
  if (globalStore.token === '') return next({ path: LOGIN_URL, replace: true })

  // 4.如果没有菜单列表，就重新请求菜单列表并添加动态路由
  const authStore = AuthStore()
  authStore.setRouteName(to.name)

  if (!authStore.authMenuListGet.length) {
    await initDynamicRouter()
    return next({ ...to, replace: true })
  }

  // 5正常访问路由
  next()
})

/**
 * @description 重置路由
 * */
export const resetRouter = () => {
  const authStore = AuthStore()
  authStore.flatMenuListGet.forEach(route => {
    const { name } = route
    if (name && router.hasRoute(name)) router.removeRoute(name)
  })
}

/**
 * 路由跳转结束
 */
router.afterEach(() => {
  NProgress.done()
})

/**
 * 路由跳转错误
 */
router.onError(() => {
  NProgress.done()
})

export default router
