<template>
  <div class="create_order">
    <Header title="生成订单" />
    <div class="buyer" v-if="isShowCard">
      <div class="buyer_info">
        <div class="name_and_phone">{{nameAndPhone}}</div>
        <div class="address">{{address}}</div>
      </div>
      <van-icon name="arrow" @click="onEdit" size="0.5333rem" />
    </div>
    <div class="container" v-if="isShowCard">
      <van-card
        :num="item.goodsCount"
        :price="`${item.sellingPrice}.00`"
        :title="item.goodsName"
        :thumb="prefix(item.goodsCoverImg)"
        v-for="item in $store.state.shopCart.infoList" :key="item.goodsId"
      />
    </div>
    <footer class="footer" v-if="isShowCard">
      <div class="info">
        <span class="text">商品金额</span>
        <span class="price">￥{{allPrice}}</span>
      </div>
      <button @click="generateOrder">生成订单</button>
    </footer>
    <!-- 底部支付方式弹出框 -->
    <PayWayPop :showPopup.sync="showPopup" type="createOrder" />
  </div>
</template>

<script>
  import { Toast } from 'vant'
  export default {
    name:'CreateOrder',
    computed:{
      nameAndPhone() {
        return this.showAddress.userName + " " + this.showAddress.userPhone
      },
      address() {
        return this.showAddress.provinceName + " " + this.showAddress.cityName + " " + this.showAddress.regionName + " " + this.showAddress.detailAddress
      },
      allPrice() {
        let all = 0
        this.$store.state.shopCart.infoList.forEach(item => {
          all += (item.sellingPrice * item.goodsCount)
        });
        return all
      }
    },
    data() {
      return {
        showAddress:{},
        isShowCard:false,
        orderNo:'',  // 生成订单的编号
        showPopup:false,
      }
    },
    methods:{
      getAddress() {
        this.$store.dispatch('getAddressList').then(value => {
          // 成功获取到地址信息 --- 判断有没有设置默认地址
          if (value.some(item => item.defaultFlag == 1)) {
            // 有默认地址就展示
            this.showAddress = value.filter(item => item.defaultFlag == 1)[0]
            this.isShowCard = true
          } else {
            // 没有默认地址就前往 address 页面进行设置 --- 多传一个 params 参数，用于标识当前为正常跳转【而非头部返回按钮触发的路由回退】--- 已弃用
            // this.$router.push({name:'address',params:{sign:true}})
            this.$router.push({name:'address'})
          }
          // 将从 shopCart 传过来的数据存在仓库中【选择的商品列表】
          this.$store.commit('SAVE_INFO_FROM_SHOPCART_TO_CREATEORDER',this.$route.params.infoList)
        },reason => {
          Toast.fail(reason)
        })
      },
      // 编辑按钮的回调
      onEdit() {
        // 多传一个 params 参数，用于标识当前为正常跳转【而非头部返回按钮触发的路由回退】--- 已弃用
        // this.$router.push({name:'address',params:{sign:true}})
        this.$router.push({name:'address'})
      },
      // 生成订单按钮的回调
      async generateOrder() {
        this.showPopup = true
      },
    },
    beforeRouteEnter(to,from,next) {
      /* 在这个钩子中，没有this，因为vm还没创建，官方说可以给 next 传递一个回调，回调的形参就是vm【组件实例】 */
      next(vm => {
        if (from.name == 'shopCart') {
          vm.getAddress()
        } else if (from.name == 'address') {
          /* 
            当点击 address 中的地址时跳转到 createOrder 时，下面的逻辑没问题。
            当 address 是回退到 createOrder 时会报错， vm.showAddress 为 undefined
            解决方法 --- 如果是跳转到 createOrder 就在路由上读取，如果是回退到 createOrder 就重新读仓库中的数据
          */
          vm.showAddress = vm.$route.params.info || vm.$store.state.address.addressList.filter(item => item.defaultFlag == 1)[0]
          vm.isShowCard = true
          /* ------------    已弃用   ---------------------
            下面是为了解决多次切换地址，多次点击头部返回按钮会在 createOrder 和 address 之间来回切换。
            当 vm.$route.params.info 为 undefined 时，即为address回退到createOrder。分两种情况【箭头为回退的含义】
                      1. address => createOrder => address => mySelf
                      2. createOrder => address => mySelf

              if (!vm.$route.params.info) {
                vm.$router.push({name:'mySelf'})
              }
          */
        } else {
          console.log(`${from.name}路由来的，这里不做处理`);
        }
      })
    },
  }
</script>

<style lang="less" scoped>
  .create_order {
    width: 100%;
    height: 100vh;
    background-color: #f9f9f9;

    .buyer {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.6rem .5333rem .5333rem;
      font-size: .4267rem;
      color: #222333;
      background-color: #fff;
      .name_and_phone {
        margin: .1333rem 0 .2667rem;
      }
      &::after {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 0.05333rem;
        background: -webkit-repeating-linear-gradient(135deg,#ff6c6c,#ff6c6c 20%,
        transparent 0,transparent 25%,#1989fa 0,#1989fa 45%,transparent 0,transparent 50%);
        background-size: 2.13333rem;
        content: "";
      }
    }

    .container {
      padding-bottom: 3.2rem;
      .van-card {
        background-color: #fff;
        margin: .2667rem 0;
        .van-card__content {
          padding: .2667rem;
          .van-card__bottom {
            .van-card__price {
              font-size: .4267rem;
              color: #ff0000;
            }
            .van-card__num {
              font-size: .3733rem;
            }
          }
        }
      }
    }

    .footer {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      border-top: .0267rem solid #e9e9e9;
      z-index: 99;
      background-color: #fff;

      .info {
        display: flex;
        justify-content: space-between;
        margin-top: .5333rem;
        padding: 0 5%;
        line-height: 100%;
        .text {
          font-size: .3733rem;
          color: #222333;
        }
        .price {
          font-size: .48rem;
          color: #ff0000;
        }
      }

      button {
        display: block;
        width: 90%;
        height: 1.2rem;
        line-height: 1.2rem;
        text-align: center;
        margin: .2667rem 5%;
        font-size: .4267rem;
        color: #fff;
        background-color: @mainColor;
      }
    }
  }
</style>
