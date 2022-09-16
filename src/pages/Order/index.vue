<template>
  <div class="order" :class="{bgc:orderList.length == 0}">
    <Header title="我的订单" back="mySelf" />
    <van-tabs v-model="active" animated color="#1baeae" title-active-color="#1baeae" @change="changeTab" >
      <van-tab :title="item.name" :name='item.num' v-for="item in tabList" :key="item.id">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" @offset="300" >
            <div class="item" v-for="(order,index) in orderList" :key="index" @click="toOrderDetail(order.orderNo)">
              <div class="item_header">
                <div class="order_id">订单时间：{{order.createTime}}</div>
                <div class="payState">{{order.orderStatusString}}</div>
              </div>
              <van-card
                :num="child.goodsCount"
                :price="child.sellingPrice"
                desc="全场包邮"
                :title="child.goodsName"
                :thumb="prefix(child.goodsCoverImg)"
                v-for="child in order.newBeeMallOrderItemVOS"
                :key="child.goodsId"
                style="background-color: #fff"
              />
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <BackToTop/>
  </div>
</template>

<script>
  export default {
    name:'Order',
    data() {
      return {
        tabList:[
          {id:'001', name:'全部',num:''},
          {id:'002', name:'待付款',num:'0'},
          {id:'003', name:'待确认',num:'1'},
          {id:'004', name:'待发货',num:'2'},
          {id:'005', name:'已发货',num:'3'},
          {id:'006', name:'交易完成',num:'4'},
        ],
        active:'',
        page:1,   
        orderList:[],
        isLoading:false,  // pullRefresh 组件的加载状态
        loading:false,  // list 组件的加载效果
        finished:false, // 是否完成所有数据的加载
      }
    },
    mounted() {
      // this.getOrderInfo()
      /* 这里为了实现在订单详情页中支付成功或确认收货后，跳转到 order 订单页的对应 tab标签下 */
      if (this.$route.query.from == 'paySuccess') {
        this.active = '1'
      } else if (this.$route.query.from == 'receiveSuccess') {
        this.active = '4'
      }
    },
    methods:{
      async getOrderInfo() {
        let {data,data:{list}} = await this.$API.order.getOrderList({pageNumber:this.page,status:this.active})
        this.orderList = this.orderList.concat(list) 
        this.totalPage = data.totalPage
        // 关掉加载状态 ---- 等快到底部的时候再开启
        this.loading = false
        // 查看数据是否全部获取到
        this.finished = this.page >= data.totalPage ? true : false
      },
      // 标签切换的回调 ---- 接收两个参数：选择标签的 name属性值 和 title属性值
      changeTab(tabIndex,tabName) {
        // 重置数据
        this.orderList = []
        this.totalPage = 0
        // this.page = 1
        // this.onLoad()
        this.onRefresh()
      },
      // pullRefresh 组件 --- 页面下拉刷新时触发的回调
      async onRefresh() {
        this.page = 1
        this.onLoad()
      },
      // list 组件 ----- 到达底部请求新增一页数据进行展示【一加载页面就会执行，一切换 tab 栏也会执行】
      onLoad() {
        // 如果不是下拉刷新且当前页不是最后一页，就继续请求数据
        if (!this.isLoading  && this.page < this.totalPage) {
          this.page = this.page + 1
        }
        if (this.isLoading) {
          this.orderList = []
          this.isLoading = false
        }
        this.getOrderInfo()
      },
      // 点击跳转到订单详情界面 OrderDetail
      toOrderDetail(id) {
        this.$router.push({name:'orderDetail',query:{id}})
      }
    }
  }
</script>

<style lang="less" scoped>
  .order {
    background-color: #f9f9f9;

    .van-tabs {
      margin-bottom: .5333rem;
      /deep/.van-tabs__wrap.van-tabs__wrap--scrollable {
        position: fixed;
        left: 0;
        top: 1.2rem;
        z-index: 999;
      }
      .van-tabs__content {
        .van-tabs__track .van-tab__pane-wrapper .van-tab__pane{
          .van-list {
            padding-top: 2.4rem;
            .item {
              background-color: #fff;
              margin: .2667rem .2667rem 0;
              padding:.2667rem;
              .item_header {
                display: flex;
                justify-content: space-between;
                align-items: center;
              }
            }
          }
        }
      }
    }
  }

  .bgc {
    height: 100%;
  }

  // 调整下拉刷新的 loading 效果的大小
  .van-loading__spinner.van-loading__spinner--circular{
    width: .4rem!important;
    height: .4rem!important;
  }
  // 调整下拉刷新显示文字的位置
  .van-loading.van-loading--circular {
    margin-top: .2rem!important;
  }
</style>
