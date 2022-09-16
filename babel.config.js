module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // 自动按需引入 vant 中的组件
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ],
  env:{
    development:{
      plugins:['dynamic-import-node']
    }
  }
}
