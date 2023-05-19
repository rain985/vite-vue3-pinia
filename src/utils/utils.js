/**
 * 使用递归过滤需要渲染的菜单列表
 * @param {*} menuList 菜单列表
 * @returns array
 */
export function getShowMnuList(menuList) {
  let newMenuList = JSON.parse(JSON.stringify(menuList))
  return newMenuList.filter(item => {
    item.children?.length && (item.children = getShowMnuList(item.children))
    return !item.meta?.isHide
  })
}

/**
 * 递归导出所有面包屑存入pinia 中
 * @param {*} menuList 所有菜单列表
 * @param {*} result 输出结果
 * @param {*} parent 父级菜单
 * @returns object
 */
export function getAllBreadcrumbList(menuList, result = {}, parent = []) {
  for (const item of menuList) {
    result[item.path] = [...parent, item]
    if (item.children)
      getAllBreadcrumbList(item.children, result, result[item.path])
  }
  return result
}

/**
 * @description 扁平化数组对象(主要用来处理路由菜单)
 * @param {Array} menuList 所有菜单列表
 * @return array
 */
export function getFlatArr(menuList) {
  let newMenuList = JSON.parse(JSON.stringify(menuList))
  return newMenuList.reduce((pre, current) => {
    let flatArr = [...pre, current]
    if (current.children)
      flatArr = [...flatArr, ...getFlatArr(current.children)]
    return flatArr
  }, [])
}

/**
 * @description 判断数据类型
 * @param {Any} val 需要判断类型的数据
 * @return string
 */
export function isType(val) {
  if (val === null) return 'null'
  if (typeof val !== 'object') return typeof val
  else
    return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase()
}
