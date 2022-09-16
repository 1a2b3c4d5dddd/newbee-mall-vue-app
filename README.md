### 账号 15717071618  111111
### 项目时间    2022-8-25 ===>
  8.27 完成静态首页  
  8.28 完成分类界面
  9.2  解决关于 生成订单(createOrder)中来回更换地址，多次点击头部按钮在 地址信息(address) 和 生成订单(createOrder)
       之间来回跳转【因为前面都是 push 操作】。 
        1. 实现在 address 回退到 mySelf 路由【在满足这种情形下 --- createOrder ==> address ==> mySelf 箭头为回退 】。
              具体看 CreateOrder 和 Address 中的钩子 beforeRouteEnter 
        2. 回退到 mySelf 后再进行回退后只能在 address 之间来回跳转。
      这里还是选择项目原方案，通过父组件来控制 Header 组件的返回按钮的回退需求 ---- 简单完成上述需求
  9.3  解决关于 postcss-px2rem 不能将行内样式中的单位 px 转为 rem 问题。
        1. 问题来源 --- 增加地址AddAddress 组件中的地址列表的样式【每个地址的间距】
        2. 解决步骤 --- 下载 style-px2rem-loader 插件并新建 style-px2rem-loader.js 文件进行配置【处理规则】
                       在 vue.config.js 中配置 style-px2rem-loader 
                       在需要转换单位的组件外层加个 template 标签并加上 lang="pug"
  9.6  关于我的订单 ---- 遍历订单列表绑定的 key 为索引值。如果是订单的 id 会报错【不是唯一值】，但能正常渲染。

  Detail组件立即购买按钮跳到ShopCart组件时，如果购物车原先没有这件商品，数据没有实时更新。ShopCart组件84行

### 插件介绍
  1. js-md5 ===> 用于加密指定字符串【登入注册时对用户账号和密码在前端就进行加密】
  2. vue2-verify ===> 用于图形验证【登入注册时数字结果验证】
  3. pushstate-server ===> 前端用来向​history​中塞入一条历史记录，且必须是当前域名下的，执行完成后，地址
                           栏会变成塞入的url但页面不会改变
  4. better-scroll ===> 重点解决移动端（已支持 PC）各种滚动场景需求的插件
  5. postcss-px2rem ===> 将 px 自动转为 rem。这个可以用安装好的插件来代替
  6. lib-flexible ===> 实现自动设置当前HTML的字体大小为当前屏幕的 1/10【不用写媒体查询】
          使用这个插件要注意：将index.html中的 meta name="viewport"标签，需要将他注释掉，因为如果有这个
                            标签的话，lib-flexible就会默认使用这个标签。而我们要使用lib-flexible自己生
                            成的 meta name="viewport"来达到高清适配的效果。
  7. postcss-pxtorem ===> 插件将px自动转为rem。配合vant实现响应式【新建 .postcssrc.js 文件进行配置】
                            
### 
