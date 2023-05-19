import http from '@/service//request.js'

/**
 * 登录
 * @param {*} params
 * @returns
 */
export const getLoginApi = (params = {}) => {
  return http.post('/login', params)
}

/**
 * 登出请求接口
 * @param {*} params
 * @returns
 */
export const getLogoutApi = (params = {}) => {
  return http.post('/logout', params)
}

/**
 * 获菜单列表
 * @param {*} params
 * @returns
 */
export const getAuthMenuListApi = (params = {}) => {
  return http.post('/menu/list', params)
}
