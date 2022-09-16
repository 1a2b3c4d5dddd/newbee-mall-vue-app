<template>
  <div class="classify">
    <header class="search_header">
      <van-icon name="arrow-left" @click="backRoute" />
      <div class="search_header_search">
        <van-icon name="search" />
        <span @click="$router.push({name:'search'})">全场50元起步</span>
      </div>
    </header>
    <van-sidebar v-model="activeKey">
      <van-sidebar-item :title="item.categoryName" v-for="(item,index) in categoryList" :key="item.categoryId" :class="{navBar_checked:index == activeKey}" />
    </van-sidebar>
    <div class="sidebar_container">
      <div class="sidebar_container_item" v-for="(item,index) in categoryList" :key="item.categoryId" v-show="index == activeKey" >
        <div class="sidebar_container_item_list" v-for="child in item.secondLevelCategoryVOS" :key="child.categoryId">
          <div class="title">{{child.categoryName}}</div>
          <div class="container_box">
            <span v-for="children in child.thirdLevelCategoryVOS" :key="children.categoryId" class="item" @click="goSearch(children.categoryId)">
              <img src="http://s.weituibao.com/1583591077131/%E5%88%86%E7%B1%BB.png">
              <span class="item_text">{{children.categoryName}}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    <OverLay/>
  </div>
</template>

<script>
  export default {
    name:'Classify',
    data() {
      return {
        activeKey:0,  // 选中侧边栏的索引值
        categoryList:[],  // 分类列表数据
        toggleHeaderPosition:false,  // 头部的定位方式
      }
    },
    mounted() {
      this.getCategoryList()
      window.addEventListener('scroll',this.pageScroll)
    },
    methods:{
      async getCategoryList() {
        let res = await this.$API.goods.getCategory()
        if (res.resultCode == 200) {
          this.categoryList = res.data
          // 关闭遮罩层
          this.$bus.$emit('toggleIsShowOverLay',false)
        }
      },
      // 跳转搜索界面
      goSearch(categoryId) {
        this.$router.push({name:'search',query:{categoryId}})
      },
      // 返回按钮
      backRoute() {
        this.$router.back()
      },
      pageScroll() {
        // 被卷去的头部
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        scrollTop > 100 ? this.toggleHeaderPosition = true : this.toggleHeaderPosition = false
      },
    }
  }
</script>

<style lang="less" scoped>
  .classify {
    .search_header {
      position: fixed;
      top: 0;
      left: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 1.3333rem;
      padding: 0 .4rem;
      border-bottom: 1px solid #000;
      background-color: #fff;
      z-index: 99;
      
      .van-icon-arrow-left /deep/ {
        font-size: .48rem;
      }

      .search_header_search {
        display: flex;
        align-items: center;
        width: 76%;
        height: .8rem;
        border-radius: .8rem;
        background-color: #f7f7f7;
        margin-right: 1.1rem;

        .van-icon-search /deep/ {
          padding: 0 .1333rem 0 .5333rem;
          font-size: .48rem;
        }
        span {
          height: 70%;
          width: 70%;
          color: #666666;
          background-color: #f7f7f7;
        }
      }
    }

    .van-sidebar {
      margin-right: 0;
      width: 3.13333rem;

      .van-sidebar-item--select::before {
        background-color: #fff!important;
      }
    }

    .sidebar_container {
      position: absolute;
      top: 1.3333rem;
      right: 0;
      width: calc(100% - 3.13333rem);

      .sidebar_container_item {
        margin-bottom: 1.3333rem;
        .sidebar_container_item_list {
          margin-bottom: .2667rem;
          .title {
            text-align: center;
            font-size: .48rem;
            font-weight: 700;
            padding: .5333rem 0;
          }
          .container_box {
            display: flex;
            flex-wrap: wrap;
            .item {
              display: flex;
              width: 33.3333%;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              img {
                display: block;
                width: .8rem;
                height: .8rem;
              }
              .item_text {
                margin: .4rem 0;
                font-size: .4rem;
              }
            }
          }
          
        }
      }
    }
  }

  .van-sidebar {
    position: fixed;
    top: 1.3333rem;
    left: 0;
  }

  .navBar_checked {
    color: @mainColor;
  }
</style>
