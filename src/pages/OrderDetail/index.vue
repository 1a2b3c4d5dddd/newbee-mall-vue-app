<template>
  <div class="orderDetail">
    <Header title="订单详情" />
    <div class="order_status">
      <div class="order_status_info same">
        <div>订单状态:<span>{{info.orderStatusString}}</span></div>
        <div>订单编号:<span>{{info.orderNo}}</span></div>
        <div>下单时间:<span>{{info.createTime}}</span></div>
      </div>
      <button class="confirmOrder" @click="toPayOrconfirmOrder" v-if="isShowBtn" >{{info.orderStatusString == '已支付' ? '确认收货' : '去支付'}}</button>
      <button class="cancelOrder" @click="cancelOrder" v-if="isShowBtn" >取消订单</button>
    </div>
    <div class="price_and_sendWay same">
      <div>商品金额:<span>￥{{info.totalPrice}}</span></div>
      <div>配送方式:<span>普通快递</span></div>
    </div>
    <div class="order_list">
      <van-card
        :num="item.goodsCount"
        :price="item.sellingPrice"
        desc="全场包邮"
        :title="item.goodsName"
        :thumb="prefix(item.goodsCoverImg)"
        v-for="item in info.newBeeMallOrderItemVOS"
        :key="item.goodsId"
        style="background-color: #fff"
      />
    </div>
    <!-- 底部支付方式弹出框 -->
    <PayWayPop :showPopup.sync="showPopup" type="orderDetail" />
  </div>
</template>

<script>
  import {Dialog} from 'vant'
  export default {
    name:'OrderDetail',
    data() {
      return {
        info:{},
        showPopup:false, // 底部支付方式弹出框的显示|隐藏
        isShowBtn:false,
      }
    },
    methods:{
      async getInfo() {
        let {data} =  await this.$API.order.getOrderDetail(this.$route.query.id)
        this.info = data
        if (this.info.orderStatusString != '交易成功' && this.info.orderStatusString != '手动关闭')  this.isShowBtn = true
      },
      // 确认收货和去支付的回调
      toPayOrconfirmOrder() {
        if (this.info.orderStatusString == '待支付')  this.showPopup = true;
        // 确认收货
        if (this.info.orderStatusString == '已支付') {
          Dialog.confirm({
            message:'是否确认收货'
          }).then(async () => {
            await this.$API.order.confirmOrder(this.info.orderNo)
            this.getInfo()
          }).catch(() => {
            console.log('啦啦啦，取消确认收货');
          });
        }
      },
      // 取消订单
      async cancelOrder() {
        Dialog.confirm({
          message:'是否取消订单'
        }).then(async () => {
          await this.$API.order.cancelOrder(this.info.orderNo)
          this.isShowBtn = false
          this.getInfo()
        }).catch(() => {
          console.log('啦啦啦，取消订单失败');
        });
        
      },
    },
    mounted() {
      this.getInfo()
    }
  }
</script>

<style lang="less" scoped>
  .orderDetail {
    height: 100%;
    background-color: #f7f7f7;
    .order_status {
      padding: 1.3333rem 0 .5333rem;
      margin-bottom: .5333rem;
      background-color: #fff;
      button {
        width: 90%;
        height: 1.1733rem;
        line-height: 1.1733rem;
        text-align: center;
        margin: .1333rem 5%;
        font-size: .4267rem;
        border: .0267rem solid #ebedf0;
        background-color: #fff;
      }
      .confirmOrder {
        background-color: @mainColor;
        color: #fff;
        border: .0267rem solid @mainColor;
      }
    }

    .price_and_sendWay {
      width: 100%;
      padding: .5333rem 5%;
      background-color: #fff;
      margin: 0 0 .5333rem!important;
    }

    .order_list {
      background-color: #fff;
    }

    .same {
      font-size: .4267rem;
      margin: .5333rem 5% 0;
      div {
        color: #999;
        margin-bottom: .2667rem;
        span {
          color: #2c3e50;
          padding-left: .08rem;
        }
      }
    }
  }
</style>
