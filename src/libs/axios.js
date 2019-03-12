import axios from 'axios'
// import store from '@/store'
// import { Spin } from 'iview'
// const addErrorLog = errorInfo => {
//   const { statusText, status, request: { responseURL } } = errorInfo
//   let info = {
//     type: 'ajax',
//     code: status,
//     mes: statusText,
//     url: responseURL
//   }
//   if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
// }

class HttpRequest {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data'
        // 'Content-Type': 'application/x-www-form-urlencoded'
        // 'Content-Type': 'application/json'
        // Access-Control-Allow-Credentials:true

      }
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      // const Authorization = localStorage.getItem('Authorization')
      // if (Authorization) {
      //   config.headers.Authorization = Authorization
      // }
      // const projectId = localStorage.getItem('projectId')
      // if (projectId) {
      //   config.headers.projectId = projectId
      // }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      // alert(res.data.code)
      // if (res.data.code === 403) {
      //   localStorage.removeItem('Authorization')
      //   window.location.replace('/')
      // }
      this.destroy(url)
      const { data, status } = res
      return { data, status }
    }, error => {
      this.destroy(url)
      let errorInfo = error.response
      if (!errorInfo) {
        const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
        errorInfo = {
          statusText,
          status,
          request: { responseURL: config.url }
        }
      }
      // addErrorLog(errorInfo)
      return Promise.reject(error)
    })
  }
  // request (options) {
  //   console.log('=====>', options.method)
  //   const instance = axios.create()
  //   options = Object.assign(this.getInsideConfig(), options)
  //   this.interceptors(instance, options.url)
  //   return instance(options)
  // }
  request (options) {
    const instance = axios.create()
    const baseConfig = this.getInsideConfig()
    if (options.method && options.method === 'put') {
      baseConfig.headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    options = Object.assign(baseConfig, options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
