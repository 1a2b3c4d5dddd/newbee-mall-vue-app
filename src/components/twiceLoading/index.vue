<template>
  <div class="loading" v-show="isShowLoading">
    <van-loading type="spinner" color="#1BAEAE" />
  </div>
</template>

<script>
  export default {
    name:'twiceLoading',
    props:['isShowLoading'],
    data() {
      return {

      }
    },
  }
</script>

<style lang="less" scoped>
  .loading {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: rgba(0,0,0,.7);
    border-radius: .2667rem;

    .van-loading {
      padding: 1.0667rem;
    }
  }
</style>
