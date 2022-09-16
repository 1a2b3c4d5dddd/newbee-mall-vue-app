<template>
  <div id="app">
    <router-view>
      <Home/>
    </router-view>
  </div>
</template>

<script>
  import Home from '@/pages/Home'
  export default {
    name: 'App',
    components:{Home},
  }
</script>

<style lang="less">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  #app {
    height: 100%;
  }
</style>