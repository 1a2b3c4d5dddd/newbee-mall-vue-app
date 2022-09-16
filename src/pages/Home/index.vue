<template>
  <div style="position:relative">
    <header class="header" :class="{sroll_top:!changeBgc}">
      <van-icon name="wap-nav" :color="headerBgc" size="0.5333rem" @click="$router.push({name:'classify'})" />
      <div class="search">
        <span class="app_title">新蜂商城</span>
        <span class="small_title" @click="toSearchRoute">山河无恙，人皆安之</span>
      </div>
      <span class="login" v-if="toggle" @click="$router.push({name:'mySelf'})">登入</span>
      <van-icon name="manager-o" :color="headerBgc" size="0.5333rem" @click="$router.push({name:'mySelf'})" v-else/>
    </header>
    <!-- 轮播图  -->
    <div class="swiper" style="position:relative">
      <van-swipe class="my-swipe" indicator-color="#1BAEAE" :autoplay="3000">
        <van-swipe-item v-for="(item,index) in carousels" :key="index">
          <img :src="item.carouselUrl" v-lazy="item.carouselUrl">
        </van-swipe-item>
      </van-swipe>
      <van-loading class="loading" color="#1BAEAE" v-if="isLoading" />
    </div>
    <!-- 商品导航栏 -->
    <div class="goods_nav">
      <ul>
        <li v-for="item in goodsNavImgs" :key="item.id">
          <img :src="item.imgUrl">
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <!-- 新品上线模块 -->
    <GoodsList title="新品上线" :info="newGoodses" :isLoading="isLoading" />
    <!-- 热门商品模块 -->
    <GoodsList title="热门商品" :info="hotGoodses" v-if="!isLoading" />
    <!-- 最新推荐模块 -->
    <GoodsList title="最新推荐" :info="recommendGoodses" v-if="!isLoading" style="padding-bottom:2.3333rem" />
    <Footer/>
  </div>
</template>

<script>
  import GoodsList from './GoodsList'
  export default {
    name:'Home',
    components:{GoodsList},
    data() {
      return {
        changeBgc: false, // 头部背景色切换
        goodsNavImgs:[   // 商品导航栏数据
          {id:1,imgUrl:'http://s.weituibao.com/1583585285461/cs.png',name:'新蜂超市'},
          {id:2,imgUrl:'http://s.weituibao.com/1583585285468/fs.png',name:'新蜂服饰'},
          {id:3,imgUrl:'http://s.weituibao.com/1583585285470/qq.png',name:'全球购'},
          {id:4,imgUrl:'http://s.weituibao.com/1583585285472/sx.png',name:'新蜂生鲜'},
          {id:5,imgUrl:'http://s.weituibao.com/1583585285467/dj.png',name:'新蜂到家'},
          {id:6,imgUrl:'http://s.weituibao.com/1583585285465/cz.png',name:'充值缴费'},
          {id:7,imgUrl:'http://s.weituibao.com/1583585285469/pt.png',name:'9.9元拼'},
          {id:8,imgUrl:'http://s.weituibao.com/1583585285468/juan.png',name:'领券'},
          {id:9,imgUrl:'http://s.weituibao.com/1583585285471/sq.png',name:'省钱'},
          {id:10,imgUrl:'http://s.weituibao.com/1583585285470/qb.png',name:'全部'},
        ],
        carousels:[],  // 轮播图数据
        hotGoodses:[],  // 热门商品数据
        newGoodses:[],  // 新品上线数据
        recommendGoodses:[], // 最新推荐数据
        isLoading:true,   // loading 效果
        toggle:true,  // ‘登入’文字与图标的切换
      }
    },
    computed: {
      headerBgc() {
        if (this.changeBgc) return '#fff'; return '#1BAEAE'
      }
    },
    methods: {
      // 获取主页信息
      async getInfo() {
        let res = await this.$API.home.getHomeInfo()
        if (res.resultCode == 200) {
          this.carousels = res.data.carousels
          this.hotGoodses = res.data.hotGoodses
          this.newGoodses = res.data.newGoodses
          this.recommendGoodses = res.data.recommendGoodses
          this.isLoading = false
        }
      },
      // 页面滚动事件回调
      pageScroll() {
        // 被卷去的头部
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        scrollTop > 100 ? this.changeBgc = true : this.changeBgc = false
      },
      // 跳转到 Search 路由
      toSearchRoute() {
        this.$router.push({name:'search',query:{from:'home'}})
      }
    },
    mounted() {
      this.getInfo()
      window.addEventListener('scroll',this.pageScroll)
      if (localStorage.getItem('token')) this.toggle = false
    }
  }
</script>

<style scoped lang="less">
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 1.3333rem;
    background-color: @mainColor;
    padding: 0 .4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 999;

    &.sroll_top {
      background: transparent;
      .login {
        color: @mainColor;
      }
    }

    .search {
      width: 73%;
      height: .8rem;
      line-height: .8rem;
      background: hsla(0,0%,100%,.7);
      border-radius: .8rem;
      display: flex;
      align-items: center;

      .app_title {
        float: left;
        height: .6rem;
        line-height: .6rem;
        border-right: .0267rem solid #666;
        padding: 0 .2667rem;
        font-size: .5333rem;
        font-weight: 700;
        color: @mainColor;
      }
      .small_title {
        float: left;
        font-size: .32rem;
        color:#666;
        margin: 0 auto;
      }
    }

    .login {
      font-size: .3733rem;
      color: #fff;
    }
  }

  .my-swipe /deep/ {
    width: 100%;
    height: 4.5333rem;

    .van-swipe__track /deep/ {
      .van-swipe-item /deep/ {
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
    
  }
  
  .goods_nav {
    width: 100%;
    padding-bottom: .2667rem;

    ul {
      width: 100%;
      display: flex;
      flex-flow: row wrap;

      li {
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #2c3e50;

        img {
          display: block;
          width: 1.0667rem;
          height: 1.0667rem;
          margin: .2667rem .2667rem .1333rem;
        }
      }
    }
  }

  .loading /deep/ {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%)
  }
</style>