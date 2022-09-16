<template>
  <header class="detail_header">
    <van-nav-bar :title="title" left-arrow @click-left="onClickLeft" @click-right="onClickRight" border>
      <van-icon name="ellipsis" slot="right" />
    </van-nav-bar>
  </header>
</template>

<script>
  export default {
    name:'Header',
    props:['title','back'],
    data() {
      return {

      }
    },
    methods:{
      // 点击头部左侧按钮的回调
      onClickLeft() {
        if (!this.back) {
          this.$router.go(-1)
        } else {
          this.$router.push({name:this.back})
        }
      },
      // 点击头部右侧按钮的回调
      onClickRight() {},
    },
  }
</script>

<style lang="less">
  .detail_header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999999;

    .van-nav-bar /deep/ {
      .van-nav-bar__left /deep/ {
        .van-icon-arrow-left:before /deep/ {
          color:#000;
          font-size: .48rem;
        }
      }
      .van-nav-bar__right /deep/ {
        .van-icon-ellipsis:before {
          color:#000;
          font-size: .5333rem;
        }
      } 
    }
  }
</style>
