<template>
  <div class="detail" v-show="isShowContext">
    <Header title="商品详情" />
    <div class="detail_container">
      <div class="img"><img :src="prefix(bigImg[0])"></div>
      <div class="title">{{goodsDetail.goodsName}}</div>
      <p class="sendWay">免邮费，顺丰快递</p>
      <span class="price">￥{{goodsDetail.sellingPrice}}</span>
      <div class="detail_info">
        <ul>
          <li>概述</li>
          <li>参数</li>
          <li>安装服务</li>
          <li>常见问题</li>
        </ul>
        <div v-html="goodsDetail.goodsDetailContent" class="imgs"></div>
      </div>
    </div>
    <footer class="detail_footer">
      <van-goods-action>
        <van-goods-action-icon icon="chat-o"  text="客服" @click="service" />
        <van-goods-action-icon 
          icon="cart-o" text="购物车" 
          :badge="shopCartCount" 
          @click="shopCart" 
          :class="{isShowCount:shopCartCount == 0}"
        />
        <van-goods-action-button text="加入购物车" @click="addCart" />
        <van-goods-action-button primary text="立即购买" @click="buyNow" />
      </van-goods-action>
    </footer>
    <OverLay/>
  </div>
</template>

<script>
  export default {
    name:'Detail',
    data() {
      return {
        goodsDetail:{},  // 商品详细信息
        isShowContext:false, // 是否展示内容
        shopCartCount:0,  // 购物车商品数量
      }
    },
    mounted() {
      this.getDetail()
      this.update()
    },
    methods:{
      // 获取商品详情
      async getDetail() {
        let id = this.$route.params.id
        let res = await this.$API.goods.getDetail(id)
        if (res.resultCode == 200) {
          this.goodsDetail = res.data
          // 关闭遮罩层
          this.$bus.$emit('toggleIsShowOverLay',false)
          this.isShowContext = true
        }
      },
      // 点击底部客服按钮的回调
      service() {},
      // 点击底部购物车按钮的回调
      shopCart() {
        this.$router.push({name:'shopCart'})
      },
      // 点击底部加入购物车按钮的回调
      async addCart() {
        try {
          await this.$API.shopCart.addShopCart({goodsCount:1, goodsId:this.goodsDetail.goodsId})
        } catch (error) {
          console.log('不能重复添加');
        }
        await this.update()
      },
      // 点击底部立即购买按钮的回调
      async buyNow() {
        // 1. 先加入购物车 --- 这里加 await 和  this.update() 函数前面加 await，是因为它俩是异步任务，确保它俩先执行
        await this.addCart()
        // 2. 跳转到 shopCart 后，只有当前商品为选中状态，其余的均变为未选中状态
        this.$store.commit('UPDATE_ACTIVE_STATUS',this.$route.params.id)
        // 多传一个参数，告诉 shopCart 组件不要再去更新数据了，否则会将上面修改好状态的数据覆盖掉
        this.$router.push({name:'shopCart',query:{noUpdate:true}})
      },
      // 用于更新仓库中购物车信息，以及购物车右上角的数量更新
      async update() {
        await this.$store.dispatch('getShopCartList')
        this.shopCartCount = this.$store.state.shopCart.shopCartList.length
      }
    },
    computed:{
      // 大图片
      bigImg() {
        return this.goodsDetail.goodsCarouselList || []
      },
    }
  }
</script>

<style lang="less" scoped>
  .detail {
    .detail_footer {
      position: fixed;
      top: 0;
      left: 0;

      .van-goods-action-button {
        color: #fff;
        background: linear-gradient(left,#6bd8d8,#1baeae);
      }

      .van-goods-action-icon.isShowCount{
        /deep/.van-icon.van-icon-cart-o.van-goods-action-icon__icon{
          .van-info {
            display: none!important;
          }
        }
      }
    }

    .detail_container {
      padding: 1.6rem .2667rem;
      .img {
        display: flex;
        justify-content: center;
        align-content: center;
        width: 100%;
        height: 8.5333rem;
        img {
          display: block;
          width: 80%;
        }
      }
      .title {
        font-size: .48rem;
        color: #333;
      }
      .sendWay {
        font-size: .3733rem;
        color: #999;
        margin: .1333rem 0;
      }
      .price {
        display: block;
        font-size: .5867rem;
        color:#f63515;
        margin-bottom: .5333rem;
      }
      .detail_info {
        ul {
          height: 1.1333rem;
          width: 100%;
          li {
            width: 25%;
            float: left;
            font-size: 16px;
            text-align: center;
            padding: .1333rem 0;
            border-right: 1px solid #999;
          }
          li:nth-child(4) {
            border:0;
          }
        }
        .imgs img{
          display: block;
          width: 100%;
        }
      }
    }
  }
</style>
