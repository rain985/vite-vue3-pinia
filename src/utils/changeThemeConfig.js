import { GlobalStore } from '@/store'

/**
 * 设置主题
 * @param {*} val 主题
 */
export function changeThemeConfig(val) {
  const globalStore = GlobalStore()
  const themeConfig = globalStore.getThemeConfig

  // globalStore.setThemeConfig({
  //   ...themeConfig,
  //   primary: val ? val : themeConfig.primary
  // })

  // const url = `@/style/theme/${themeConfig.primary}-theme.less`

  const body = document.body

  body.setAttribute('class', themeConfig.primary)
}

export function changeGreyOrWeak(val) {
  const globalStore = GlobalStore()
  const themeConfig = globalStore.getThemeConfig

  const body = document.body

  body.setAttribute('style', themeConfig.primary)
}
