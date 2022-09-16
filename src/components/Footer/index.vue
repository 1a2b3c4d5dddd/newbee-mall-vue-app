<template>
  <!-- 底部导航栏 -->
  <van-tabbar v-model="active" active-color="#1BAEAE" @change="toggle">
    <van-tabbar-item name="home" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item name="classify" icon="qr">分类</van-tabbar-item>
    <van-tabbar-item name="shopCart" icon="shopping-cart-o" 
      :badge="$store.state.shopCart.shopCartList.length"
      :class="{isShowBadge:$store.state.shopCart.shopCartList.length == 0}"
    >购物车</van-tabbar-item>
    <van-tabbar-item name="mySelf" icon="user-o" dot>我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
  export default {
    name:'Footer',
    data() {
      return {}
    },
    computed:{
      // 底部切换收集当前选中的标签 name 属性值【用vuex管理】
      active:{
        get() {
          return this.$store.state.global.footerActive
        },
        set(value) {}
      }
    },
    methods:{
      toggle(activeName) {
        this.$store.commit('CHANGE_FOOTER_ACTIVE',activeName)
        switch (this.active) {
          case 'home' :{
            this.$router.push({name:'home'})
            break;
          }
          case 'classify' :{
            this.$router.push({name:'classify'})
            break;
          }
          case 'shopCart' :{
            this.$router.push({name:'shopCart'})
            break;
          }
          case 'mySelf' :{
            this.$router.push({name:'mySelf'})
            break;
          }
          default:{
            console.log('啦啦啦，出错啦！');
          }
        }
      }
    },
    mounted() {
      this.$store.commit('CHANGE_FOOTER_ACTIVE',this.$route.name)
    },
  }
</script>

<style lang="css" scoped>
  .isShowBadge.van-tabbar-item /deep/ .van-tabbar-item__icon .van-info {
    display: none!important;
  }
</style>