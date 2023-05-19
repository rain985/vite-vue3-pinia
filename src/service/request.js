import axios from 'axios'
import { GlobalStore } from '@/store/index.js'
import { RESULTENUMS } from '@/config/httpEnums'
import { message } from 'ant-design-vue'
import { checkStatus } from './checkStatus'

const config = {
  baseURL: import.meta.env.VITE_API_URL,
  timeout: RESULTENUMS.TIMEOUT,
  withCredentials: false // 表示跨域请求是是否需要使用凭证
}

class RequestHttp {
  service
  constructor(config) {
    this.service = axios.create(config)
    this.service.interceptors.request.use(config => {
      // 请求拦截
      const globalStore = GlobalStore()
      const token = globalStore.token

      return { ...config, headers: { ...config.headers, 'x-token': token } }
    })

    this.service.interceptors.response.use(
      response => {
        // 响应拦截
        const { data } = response
        const globalStore = GlobalStore()

        // 请求失败,未登录
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
        return data
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
  }

  // 常用请求方法
  get(url, params = {}, _object = {}) {
    return this.service.get(url, { params, ..._object })
  }
  post(url, params = {}, _object = {}) {
    return this.service.post(url, params, _object)
  }
  put(url, params = {}, _object = {}) {
    return this.service.put(url, params, _object)
  }
  delete(url, params = {}, _object = {}) {
    return this.service.delete(url, { params, ..._object })
  }
  download(url, params = {}, _object = {}) {
    return this.service.post(url, params, { ..._object, responseType: 'blob' })
  }
}

export default new RequestHttp(config)
