import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'

Vue.use(VueRouter)


/* 
  重写 push 和 replace ---- 解决用编程式路由导航实现路由跳转的标签，在第二次及之后点击该标签进行跳转时，会报  NavigationDuplicated 错误 
*/
// 1. 保存原本的 push 和 replace
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
/* 
  2. 重写 --- location 为调用方法时传入的配置(path/name、query参数、params参数) resolve和reject分别为
  成功和失败的回调。如果成功和失败的回调都传了，就调用原来的 push/replace; 如果没传或少传就手动传两个空的回调。
  用call或apply方法改变this的指向并且调用函数【apply要求传的参数要写成数组的形式】，要将我们重写的 push 和 
  replace重新指回 VueRouter 
*/
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve || reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve || reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}


const router = new VueRouter({
  routes,
})

export default router