<template>
  <div class="goods">
    <header class="goods_header">{{title}}</header>
    <van-loading class="loading" color="#1BAEAE" v-if="isLoading" />
    <div class="goods_container clearfix">
      <div class="goods_container_item" v-for="item in info" :key="item.goodsId" @click="goDetail(item.goodsId)">
        <img :src="prefix(item.goodsCoverImg)">
        <p class="title">{{item.goodsName}}</p>
        <span class="price">￥{{item.sellingPrice}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name:'GoodsList',
    data() {
      return {

      }
    },
    props:['title','info','isLoading'],
    methods:{
      // 跳转到商品详情页
      goDetail(id) {
        this.$router.push({name:'detail',params:{id}})
      }
    }
  }
</script>

<style lang="less">
  .goods {
    position: relative;
    .loading {
      position: absolute;
      top: 2.6667rem;
      left: 50%;
      transform: translate(-50%,0);
    }
    .goods_header {
      height: 1.3333rem;
      line-height: 1.3333rem;
      text-align: center;
      font-size: .4267rem;
      color: @mainColor;
      background-color: #f9f9f9;
    }
    .goods_container {
      display: flex;
      flex-wrap: wrap;

      .goods_container_item {
        width: 50%;
        padding: .2667rem;
        border-bottom: 1px solid #e9e9e9;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: .3733rem;

        &:nth-child(odd) {
          border-right: 1px solid #e9e9e9;
        }

        img {
          display: block;
          width: 3.2rem;
          height: 3.2rem;
        }
        .title {
          color: #222333;
          text-align: center;
          margin: .2667rem 0 .1333rem;
        }
        .price {
          color: @mainColor;
        }
      }
    }
  }
</style>
