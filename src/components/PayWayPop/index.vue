<template>
  <van-popup 
    :value="showPopup" 
    position="bottom" 
    :style="{height:'30%'}" 
    :close-on-click-overlay="false" 
  >
    <div class="pay">
      <div class="wx same" @click="pay(2)">微信支付</div>
      <div class="zfb same" @click="pay(1)">支付宝支付</div>
    </div>
    <van-icon name="cross" @click="closePop" />
  </van-popup>
</template>
<!-- 
  1. 创建订单组件中，点击叉号或支付按钮都会生成订单，且跳转到订单页
  2. 我的订单组件中，点击叉号只关闭弹窗，支付成功就切换到 tab栏标题 为 ‘待确认’ 
 -->
<script>
  export default {
    name:'PayWayPop',
    props:['showPopup','type'],
    data() {
      return {}
    },
    methods:{
      // 支付的回调
      async pay(way) {
        if(this.type == 'createOrder') {
          // 这里要加 await 不然读取 this.$parent.orderNo 的内容为空
          await this.createOrderNo() 
          this.orderNo = this.$parent.orderNo
        }
        if (this.type == 'orderDetail')  this.orderNo = this.$parent.$route.query.id
        await this.$API.order.payOrder({orderNo:this.orderNo,payType:way})
        /* 传 from 是为了实现跳转到 order 组件后，切换 tab标签名为 ‘待确认’ 页面 */
        this.$router.push({ name:'order',query:{ from: 'paySuccess' } })
      },
      // 点击叉号的回调
      closePop() {
        this.$emit('update:showPopup',false)
        // 如果是 createOrder 组件，点击叉号也会生成订单
        if (this.type == 'createOrder') {
          this.createOrderNo()
          this.$router.push({name:'order'})
        }
      },
      // 生成订单编号
      async createOrderNo() {
        const params = {
          addressId:this.$parent.showAddress.addressId,
          cartItemIds:this.$store.state.shopCart.infoList.map(item => item.cartItemId),
        }
        let {data} = await this.$API.order.createOrder(params)
        this.$parent.orderNo = data

        /* 
          这里是为了实现 -- 当购物车数量变化时，Footer组件中的购物车右上角图标数据实时更新【购物车的数据
          存放在仓，这里是更新仓库中的购物车的数据】
        */
        this.$store.dispatch('getShopCartList')
      },
    }
  }
</script>

<style lang="less" scoped>
  .van-popup {
    .pay {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
      height: 100%;
      .same {
        width: 90%;
        height: 1.3333rem;
        line-height: 1.3333rem;
        text-align: center;
        color: #fff;
        font-size: .4267rem;
      }
      .wx {
        background-color: #4fc08d;
        margin-bottom: .2667rem;
      }
      .zfb {
        background-color: #1989fa;
      }
    }
    .van-icon {
      position: absolute;
      top: .2667rem;
      right: .5333rem;
      height: .5333rem;
      width: .5333rem;
      &::before {
        font-size: .5333rem;
        color: #ccc;
      }
    }
  }
</style>
