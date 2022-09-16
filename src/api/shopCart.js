import requests from '@/utils/axios'

// 获取购物车的信息
export const getShopCartInfoList = (params) => requests({
  url:`/shop-cart`,
  method:'get',
  params
})

// 修改商品的数量 --- 传递的数据为{cartItemId:"",goodsCount:""}
export const updateGoodsCount = (data) => requests({
  url:`/shop-cart`,
  method:'put',
  data
})
 
// 删除商品 ---- 参数是商品的 cartItemId
export const deleteGoods = (id) => requests({
  url:`/shop-cart/${id}`,
  method:'delete',
})

// 加入购物车 ----- 参数是{goodsCount:, goodsId:}
export const addShopCart = (params) => requests.post('shop-cart',params)