import { http } from '@/service/request.js'

/**
 * 添加用户
 * @param {*} params
 * @returns
 */
export const addUser = (params = {}) => {
  return http.post('/adduser', params)
}
