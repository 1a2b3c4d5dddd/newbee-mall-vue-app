<template>
  <div class="search">
    <header class="search_header">
      <van-icon name="arrow-left" @click="backRoute" />
      <div class="search_header_search">
        <van-icon name="search" />
        <input type="text" v-model="searchText" @keydown.enter="goSearch">
      </div>
      <button class="btn" @click="goSearch">搜索</button>
    </header>
    <div class="tab">
      <van-tabs type="card" title-inactive-color="#1BAEAE" color="#1BAEAE" @click="getTabsInfo">
        <van-tab title="推荐" name=""></van-tab>
        <van-tab title="新品" name="new"></van-tab>
        <van-tab title="价格" name="price"></van-tab>
      </van-tabs>
    </div>
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
      <van-list 
        v-model="loading" 
        :finished="finished" 
        finished-text="没有更多了"
        @offset="300"
        @load="onLoad"
        ref="list"
      >
        <div class="goods_item" v-for="(item,index) in searchList" :key="index">
          <img :src="prefix(item.goodsCoverImg)">
          <div class="goods_info">
            <div class="goods_name">{{item.goodsName}}</div>
            <div class="introduce">{{item.goodsIntro}}</div>
            <div class="price">￥{{item.sellingPrice}}</div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    <BackToTop/>
  </div>
</template>

<script>
  import {search} from '@/api/goods'
  export default {
    name:'Search',
    data() {
      return {
        searchList:[],  // 所有的检索数据列表
        loading:false,  // 列表底部刷新的状态
        finished:true,
        searchText:'',  // 搜索框内容(检索内容)
        isLoading:false,  // 下拉刷新的状态
        page:1,
        orderBy:'', // tab 栏被选中的name属性值
        totalPage:undefined,  // 检索数据总页数
      }
    },
    methods:{
      // 底部刷新的回调
      onLoad() {
        if (this.totalPage) {
          if (this.page < this.totalPage) {
            this.page = this.page + 1
            this.goSearch()
          } else {
            this.finished = true
          }
        }
      },
      // 下拉刷新的回调
      onRefresh() {
        this.page = 1
        this.searchList = []
        this.totalPage = 0
        this.goSearch()
        this.isLoading = false
      },
      // 搜索按钮的回调
      async goSearch() {
        // 这里是解决 -- classify 组件来到 search 组件后，在输入内容搜索物品，之前数据残留问题
        if (this.$route.query.categoryId)  this.searchList = []
        
        if (this.searchText.length) this.finished = false
        let params = { 
          pageNumber: this.page, 
          goodsCategoryId: this.$route.query.categoryId || undefined, 
          keyword: this.searchText, 
          orderBy: this.orderBy 
        }
        let {data:{list},data} = await search(params)
        this.searchList = this.searchList.concat(list)
        this.totalPage = data.totalPage
        if (this.page >= this.totalPage) this.finished = true
        this.loading = false
      },
      // 切换 tab 栏的回调 ---- 第一个参数对应 name 属性，第二个参数对应 title 属性
      getTabsInfo(name,title) {
        this.orderBy = name
        this.page = 1
        this.totalPage = 0
        this.searchList = []
        if (this.searchText.length || this.$route.query.categoryId)  {
          this.goSearch()
        } else {
          this.finished = true
        }
      },
      // 返回按钮
      backRoute() {
        this.$router.back()
      },
    },
    beforeRouteEnter(to,from,next) {
      next(vm => {
        if (from.name == 'classify') {
          vm.goSearch()
        }
      })
    }
  }
</script>

<style lang="less">
  .search {
    .search_header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 1.3333rem;
      padding: 0 .4rem;
      position: fixed;
      top: 0;
      left: 0;
      background-color: #fff;
      z-index: 999;
      
      .van-icon-arrow-left {
        font-size: .48rem;
      }

      .search_header_search {
        display: flex;
        align-items: center;
        width: 76%;
        height: .8rem;
        border-radius: .8rem;
        background-color: #f7f7f7;
        input {
          font-size: .3467rem;
          color: #666;
        }

        .van-icon-search {
          padding: 0 .1333rem 0 .5333rem;
          font-size: .48rem;
        }
        input {
          height: 70%;
          width: 70%;
          background-color: #f7f7f7;
        }
      }

      .btn {
        padding: .1333rem;
        font-size: .4rem;
        border-radius: .1333rem;
        background-color: @mainColor;
      }
    }

    .tab {
      position: fixed;
      top: 1.3333rem;
      left: 0;
      z-index: 999;
      width: 100%;
      padding-bottom: .2667rem;
      background-color: #fff;
    }

    .van-pull-refresh .van-pull-refresh__track {
      .van-pull-refresh__head {
        top: 2.6rem;
      }
      .van-list {
        padding-top: 2.4rem;
        transition: all .3s linear;
        .goods_item {
          display: flex;
          padding: .2667rem 0;
          border-bottom: .0267rem solid #dcdcdc;
          height: 120px;
          img {
            padding: 0 .2667rem;
          }
          .goods_info {
            padding: .1333rem .2667rem;
            .goods_name {
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              font-size: .4267rem;
              color: #333;
            }
            .introduce {
              color: #999;
              font-size: .32rem;
              margin: .2667rem 0;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            }
            .price {
              font-size: .4267rem;
              color: @mainColor;
            }
          }
        }
      }
    }
  }

  // 调整下拉刷新的 loading 效果的大小
  // .van-loading__spinner.van-loading__spinner--circular{
  //   width: .4rem!important;
  //   height: .4rem!important;
  // }
  // // 调整下拉刷新显示文字的位置
  // .van-loading.van-loading--circular {
  //   margin-top: .2rem!important;
  // }
</style>
