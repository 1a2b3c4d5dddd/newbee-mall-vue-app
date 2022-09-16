<template>
  <div class="overlay">
    <van-overlay :show="isShowOverLay">
      <van-loading color="#1BAEAE" size="1.3333rem" />
    </van-overlay>
  </div>
</template>

<script>
  export default {
    name:'OverLay',
    data() {
      return {
        isShowOverLay:true, // 显示|隐藏加载的遮罩层
      }
    },
    mounted() {
      this.$bus.$on('toggleIsShowOverLay',value => {this.isShowOverLay = value})
    }
  }
</script>

<style lang="less">
  .overlay {
    position: relative;
    .van-loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
  }
</style>
