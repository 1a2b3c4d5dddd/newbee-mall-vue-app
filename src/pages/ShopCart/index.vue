<template>
  <div class="shopCart">
    <Header title="购物车" />
    <div class="no_info" v-show="isShowInfo">
      <van-icon name="smile-o" size="1.3333rem" />
      <span>购物车空空如也</span>
      <button @click="$router.push({name:'home'})">前往首页</button>
    </div>
    <div class="have_info" v-show="!isShowInfo">
      <div class="container">
        <van-swipe-cell v-for="item in shopCartInfo" :key="item.goodsId">
          <van-checkbox v-model="item.checked" checked-color="#1BAEAE"></van-checkbox>
          <img :src="prefix(item.goodsCoverImg)">
          <div class="good_info">
            <div class="top">
              <span class="name">{{item.goodsName}}</span>
              <span class="count">x{{item.goodsCount}}</span>
            </div>
            <div class="bottom">
              <span class="price">￥{{item.sellingPrice}}</span>
              <van-stepper :value="item.goodsCount" :name="item.cartItemId" max="5" integer async-change @change="changeCount" />
            </div>
           </div>
          <template #right>
            <van-button square text="删除" type="danger" class="delete-button" @click="deleteGoods(item)" />
          </template>
        </van-swipe-cell>
      </div>
      <van-submit-bar :price="totalPrice" button-text="提交订单" button-color="#1BAEAE" @submit="onSubmit">
        <van-checkbox v-model="allChecked" checked-color="#1BAEAE">全选</van-checkbox>
      </van-submit-bar>
    </div>
    <twiceLoading :isShowLoading="isShowLoading" />
    <Footer/>
  </div>
</template>

<script>
  import { Toast } from 'vant'
  export default {
    name:'ShopCart',
    computed:{
      totalPrice() {
        let total = 0
        this.shopCartInfo.forEach(item => {
          if (item.checked) {
            total += item.goodsCount * item.sellingPrice
          } else {
            return false
          }
        })
        // 因为 price 属性绑定的是数值单位是 分，所以要显示正确的值，要 X100 转换单位 
        return total * 100
      },
      allChecked: {
        get() {
          return this.shopCartInfo.every(item => {
            return item.checked == true
          })
        },
        set(value) {
          this.shopCartInfo.forEach(item => {
            item.checked = value
          })
          return value
        }
        
      }
    },
    data() {
      return {
        shopCartInfo:[],
        isShowInfo:true,
        isShowLoading:true,
      }
    },
    methods: {
      async getShopCartInfo(type) {
        // 通过参数 type 来控制是否更新仓库中购物车数据
        if (type) await this.$store.dispatch('getShopCartList')
        this.shopCartInfo = this.$store.state.shopCart.shopCartList
        // 选择展示的页面内容
        this.isShowInfo = this.shopCartInfo.length == 0 ? true : false
        // 关掉 loading 效果
        this.isShowLoading = false
      },
      /* 
        商品数量变化的回调【默认接收两个参数，一是当前的数量，二是当前步进器 name属性】-- 这里覆盖了这两个默认参数
        修正一下 --- 因为要实现异步变更，所以还是选择使用默认的参数，没有直接将 item 传过来

        这里为了实现 loading 效果结束后再改变商品数量，给步进器加了 async-change 属性【异步变更】，异步变更是让
        步进器的显示的值不是即时变更，而是在某个时刻去更新。change事件其实会触发两次，传过来的默认值是实时更新的，
        异步变更是页面，所以下面判断 步进器 变化后的值与界面显示值的比较，来决定 loading 效果的显示与隐藏
      */
      async changeCount(goodsCount,info) {
        // loading 效果的显示与隐藏 --- 当变化后的真实值(同步)goodsCount == 界面显示的值 就结束 loading 效果
        if (goodsCount == this.shopCartInfo.filter(item => item.cartItemId == info.name)[0].goodsCount) {
          this.isShowLoading = false
        } else {
          this.isShowLoading = true
        }
        let res = await this.$API.shopCart.updateGoodsCount({cartItemId:info.name,goodsCount})
        if (res.resultCode == 200) {
          this.shopCartInfo.filter(item => {
            if (item.cartItemId == info.name) {
              item.goodsCount = goodsCount
            } else {
              return false
            }
          })
          this.isShowLoading = false
        }
      },
      // 删除商品的回调
      async deleteGoods(info) {
        this.isShowLoading = true
        let res = await this.$API.shopCart.deleteGoods(info.cartItemId)
        if (res.resultCode == 200) {
          this.getShopCartInfo(true)
        }
      },
      // 提交订单的回调
      onSubmit() {
        if (!this.shopCartInfo.some(item => item.checked == true)) {
          Toast.fail({
            message: '您还没有选择宝贝',
            position: 'bottom',
          });
        }
        // 跳到生成订单界面并携带选中的商品信息
        let result = this.shopCartInfo.filter(item => item.checked == true)
        this.$router.push({name:'createOrder',params:{infoList:result}})
      },
    },
    mounted() {
      // this.getShopCartInfo()
    },
    beforeRouteEnter(to,from,next){
      next(vm => {
        if (from.name == 'detail' && vm.$route.query.noUpdate) {
          vm.getShopCartInfo(false)
        } else {
          vm.getShopCartInfo(true)
        }
      })
    }
  }
</script>

<style lang="less" scoped>
  .shopCart {
    padding-top: 1.3333rem;
    .no_info {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 4.6667rem;

      span {
        font-size: .4267rem;
        color: #2c3e50;
      }

      button {
        width: 50%;
        padding: .2667rem 0;
        color: #fff;
        font-size: .3733rem;
        background-color: @mainColor;
        margin-top: 0.3333rem;
      }
    }

    .have_info {
      padding-bottom: 3.2rem;
      .container {
        .van-swipe-cell {
          margin-bottom: .2667rem;
          /* 不理解为什么要将 /deep/ 放在前面 van-swipe-cell__wrapper 这个大盒子的样式才生效 */ 
          /deep/ .van-swipe-cell__wrapper {
            display: flex;
            .van-checkbox {
              padding: 0 .2667rem;
            }
            img {
              display: block;
              width: 2.6667rem;
              height: 2.6667rem;
            }
            .good_info {
              display: flex;
              justify-content: space-between;
              flex-direction: column;
              padding: .5333rem;
              width: 6.5333rem;
              .top {
                display: flex;
                justify-content: space-between;
                color: #2c3e50;
                font-size: .32rem;
              }
              .bottom {
                display: flex;
                justify-content: space-between;
                .price {
                  color: #ff0000;
                  font-size: .4267rem;
                }
              }
            }
          }
        }
      }
      .van-submit-bar {
        margin-bottom: 1.3333rem;
        border-bottom: .0267rem solid #fff;
      }
    }

    
  }

  .delete-button {
    height: 100%;
  }
</style>
