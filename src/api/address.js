import requests from '@/utils/axios'

// 获取用户地址信息
export const getAddress = () => requests({
  url:'/address',
  method: 'get',
  data:{ pageNumber: 1, pageSize: 1000 }
})

// 添加用户地址信息 ---- 两种写法，第二种方式传递的其实是 data 数据，不是 params 参数
export const addAddress = (data) => requests({
  url:'/address',
  method: 'post',
  data,
})
// export const addAddress = (params) => requests.post('/address',params)

// 修改用户地址信息 ---- 两种写法，第二种方式传递的其实是 data 数据，不是 params 参数
export const updateAddress = (data) => requests({
  url:'/address',
  method: 'put',
  data,
})
// export const updateAddress = (params) => requests.put('/address',params)

// 删除用户地址信息
export const deleteAddress = (id) => requests({
  url:`/address/${id}`,
  method: 'delete',
})