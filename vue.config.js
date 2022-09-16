const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, 
  // 这是对全局 less 的配置
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, "./src/assets/css/base.less")],
    }
  },
  // 配置代理服务器
  devServer: {
    proxy: {
      '/api/v1': {
        target:'http://backend-api-01.newbee.ltd',
        // pathRewrite: {'^/api': ''},  这里不需要重写，因为我们项目中用到的接口地址开头都是 /api
        changeOrigin: true,  // 这个配置在 vue_test中有解释
        ws: false,
      }
    }
  },
  // 使用 style-px2rem-loader 将vant组件身上的行内样式单位 px 转为 rem
  chainWebpack:config => {
    config.module
      .rule('pug')
      .test(/\.pug$/)
      .use('style-px2rem-loader')
      .loader('style-px2rem-loader')
      .end()
  }
})
  