import requests from '@/utils/axios'

// 生成订单  -----  参数是 {addressId:"",cartItemIds:[]}
export const createOrder = (data) => requests.post('/saveOrder',data)

// 支付订单
export const payOrder = (params) => requests.get('/paySuccess',{params})

// 获取订单列表 --- 两种写法【注意传的是 params 参数】
export const getOrderList = (params) => requests({
  url:'/order',
  method:'get',
  params,
})
// export const getOrderList = (params) => requests.get('/order',{params})

// 获取订单详情
export const getOrderDetail = (id) => requests.get(`/order/${id}`)

// 确认收货
export const confirmOrder = (id) => requests.put(`/order/${id}/finish`)

// 取消订单
export const cancelOrder = (id) => requests.put(`/order/${id}/cancel`)