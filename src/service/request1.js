import axios from 'axios'
import { GlobalStore } from '@/store/index.js'
import { RESULTENUMS } from '@/config/httpEnums'
import { message } from 'ant-design-vue'
import { checkStatus } from './checkStatus'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: RESULTENUMS.TIMEOUT,
  withCredentials: false // 表示跨域请求是是否需要使用凭证
})

instance.interceptors.request.use(config => {
  // 请求拦截
  const globalStore = GlobalStore()
  const token = globalStore.token

  return { ...config, headers: { ...config.headers, 'x-token': token } }
})

instance.interceptors.response.use(
  response => {
    // 响应拦截

    const { data } = response
    const globalStore = GlobalStore()

    // 登录失败
    if (data.code === RESULTENUMS.OVERDUE) {
      message.error(data.msg)
      globalStore.setToken('')
      routerKey.replace(LOGIN_URL)
      return Promise.reject(data)
    }

    // 全局错误信息拦截
    if (data.code && data.code !== RESULTENUMS.SUCCESS) {
      message.error(data.msg)
      return Promise.reject(data)
    }
    return response
  },
  error => {
    const { response } = error
    // 请求超时 && 网络错误单独判断，没有 response
    if (error.message.indexOf('timeout') !== -1)
      message.error('请求超时！请您稍后重试')
    if (error.message.indexOf('Network Error') !== -1)
      message.error('网络错误！请您稍后重试')

    // 根据响应码做处理
    if (response && response.data) {
      checkStatus(response.status)
      return Promise.reject(error)
    }
    // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
    if (!window.navigator.onLine) router.replace('/500')
    return Promise.reject(error)
  }
)

/**get请求
 * @param {string} url
 * @param {object} params
 */
export const get = (url, params = {}) => {
  return instance({
    method: 'get',
    url,
    params
  })
}

/** post 请求
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export const post = (url, data = {}, params = {}) => {
  return instance({
    method: 'post',
    url,
    data,
    params
  })
}

export const download = (url, params = {}) => {
  return instance({})
}

export default instance
