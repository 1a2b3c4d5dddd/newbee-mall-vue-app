import axios from 'axios'
import { Toast } from 'vant'
import router from '@/router'

const requests = axios.create({
  baseURL:"http://backend-api-01.newbee.ltd/api/v1",  
  timeout:5000,  // 设置请求超时的时间为 5s
})

// 请求拦截器
requests.interceptors.request.use(config => {
  config.headers.token = localStorage.getItem('token')
  return config
})


// 响应拦截器
requests.interceptors.response.use(res => {
  if (typeof res.data !== 'object') {
    Toast.fail('服务端异常！')
    return Promise.reject(res)
  }
  if (res.data.resultCode != 200) {
    if (res.data.message) Toast.fail(res.data.message)
    // 416 为无效认证，需要重新登入获取新的 token
    if (res.data.resultCode == 416) {
      router.push({ path: '/login' })
    }
    return Promise.reject(res.data)
  }

  return res.data
})

export default requests