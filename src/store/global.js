/* 放一些全局组件中的数据 */

import {} from '@/api'

const actions = {}

const mutations = {
  // 改变 Footer 组件被选中的标签
  CHANGE_FOOTER_ACTIVE(state,value) {
    state.footerActive = value
  },
}

const state = {
  footerActive:'home', // Footer组件切换
}

const getters = {}

export default {
  namespace:true,
  actions,
  mutations,
  state,
  getters,
}