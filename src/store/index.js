import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import shopCart  from './shopCart'
import global from './global'
import address from './address'

export default new Vuex.Store({
  modules:{
    shopCart,
    global,
    address,
  }
})