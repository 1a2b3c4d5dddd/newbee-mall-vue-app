import requests from '@/utils/axios'

// 登入
export const login = (params) => requests.post('/user/login', params)

// 注册
export const register = (params) => requests.post('/user/register', params)

// 获取用户信息
export const getUserInfo  = () => requests.get('/user/info')

// 修改用户信息
export const EditUserInfo  = (params) => requests.put('/user/info',params)

// 退出登入
export const logout = () => requests.post('/user/logout')