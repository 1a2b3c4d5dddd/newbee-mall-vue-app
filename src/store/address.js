import {getAddress} from '@/api/address'

const actions = {
  async getAddressList({commit}) {
    let res = await getAddress()
    if (res.resultCode == 200) {
      commit('GET_ADDRESS_LIST',res.data)
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(new Error('地址信息获取失败'))
    }
  }
}

const mutations = {
  GET_ADDRESS_LIST(state,value) {
    state.addressList = value
  }
}

const state = {
  addressList:[]
}

const getters = {}

export default {
  namespace:true,
  actions,
  mutations,
  state,
  getters,
}