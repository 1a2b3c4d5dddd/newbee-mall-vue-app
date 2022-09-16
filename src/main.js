import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入 js-md5  用于加密指定字符串【登入注册时对用户账号和密码在前端就进行加密】
import md5 from 'js-md5'
Vue.prototype.$md5 = md5

// 实现自动设置当前HTML的字体大小为当前屏幕的 10%【1rem自动设置为当前屏幕宽度的 1/10】
import 'lib-flexible/flexible'

// 为了解决图片路径不完整的问题
import {prefix} from '@/utils/imgPrefix'
Vue.prototype.prefix = prefix

// 按需引入 Vant 库中的组件 ----  注意：Dialog Toast Lazyload 要用的话要在组件内再引用一次
import { Divider, Popup, Overlay, Loading, Dialog, 
  ContactCard, Form, AddressEdit, AddressList, Field, CellGroup, 
  Cell, SwipeCell, Icon, Stepper, Card, Checkbox, CheckboxGroup, 
  Button, Swipe, SwipeItem, PullRefresh, List, Tab, Tabs, GoodsAction, 
  GoodsActionIcon, GoodsActionButton, SubmitBar, Toast, Tabbar, TabbarItem,
  Lazyload, NavBar,Sidebar, SidebarItem,ContactList ,Area , Col, Row} from 'vant'
Vue.use(Divider).use(Popup).use(Overlay).use(Loading).use(Dialog).use(Toast)
  .use(ContactCard).use(Form).use(AddressEdit).use(AddressList).use(Field)
  .use(CellGroup).use(Cell).use(SwipeCell).use(Icon).use(Stepper).use(Card)
  .use(Button).use(Swipe).use(SwipeItem).use(PullRefresh).use(List).use(Tab)
  .use(Tabs).use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton)
  .use(SubmitBar).use(Checkbox).use(CheckboxGroup).use(Tabbar).use(TabbarItem)
  .use(Lazyload).use( NavBar).use(Sidebar).use(SidebarItem).use(ContactList ).use(Area)
  .use(Col).use(Row)
import 'vant/lib/index.css';

// 注册全局组件 Footer
import Footer from '@/components/Footer'
Vue.component(Footer.name,Footer)

// 注册全局组件 Header 
import Header from '@/components/Header'
Vue.component(Header.name,Header)

// 注册全局组件 OverLay 二次封装的遮罩层 
import OverLay from '@/components/OverLay'
Vue.component(OverLay.name,OverLay)

// 注册全局组件 Loading 小遮罩层的加载框 
import twiceLoading from '@/components/twiceLoading'
Vue.component(twiceLoading.name,twiceLoading)

// 注册全局组件 底部弹出支付方式框 
import PayWayPop from '@/components/PayWayPop'
Vue.component(PayWayPop.name,PayWayPop)

// 注册全局组件 返回顶部
import BackToTop from '@/components/BackToTop'
Vue.component(BackToTop.name,BackToTop)

Vue.config.productionTip = false

import API from '@/api'
Vue.prototype.$API = API

new Vue({
  store,
  router,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
