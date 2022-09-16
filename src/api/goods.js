import requests from '@/utils/axios'

// 获取商品的详细信息
export const getDetail = (id) => requests({
  url:`/goods/detail/${id}`,
  method:'get'
})

// 获取分类列表
export const getCategory = () => requests({
  url:'/categories',
  method:'get'
})

/* 
  搜索商品 ---- 参数 
    {
      pageNumber:当前页,
      goodsCategoryId:商品所属分类的id,
      keyword:检索内容,
      orderBy:分类展示内容
    }
*/ 
export const search = (params) => requests.get('/search', { params })
