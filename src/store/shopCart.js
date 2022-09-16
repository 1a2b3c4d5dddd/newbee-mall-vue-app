import {getShopCartInfoList} from '@/api/shopCart'

const actions = {
  async getShopCartList({commit}) {
    let res = await getShopCartInfoList({pageNumber:1})
    if (res.resultCode == 200) {
      commit('GET_SHOPCART_LIST',res.data)
      return Promise.resolve()
    } else {
      return Promise.reject('获取购物车信息失败!')
    }
  }
}

const mutations = {
  GET_SHOPCART_LIST(state,value) {
    // 给数据添加 checked 属性，用于改变商品的选中状态
    state.shopCartList = value.map(item => {
      return {
        ...item,
        checked:true,
      }
    })
  },
  // 保存从购物车(shopCart)传给创建订单(createOrder)的商品列表
  SAVE_INFO_FROM_SHOPCART_TO_CREATEORDER(state,value) {
    state.infoList = value
  },
  // detail 组件点击立即购买时使用 ----- 当前商品为选中状态，其余的均变为未选中状态
  UPDATE_ACTIVE_STATUS(state,id) {
    state.shopCartList = state.shopCartList.map(item => {
      return {
        ...item,
        checked: item.goodsId != id ? false : true
      }
    })
  }
}

const state = {
  shopCartList:[],
  infoList:[],
}

const getters = {}

export default {
  namespace:true,
  actions,
  mutations,
  state,
  getters,
}