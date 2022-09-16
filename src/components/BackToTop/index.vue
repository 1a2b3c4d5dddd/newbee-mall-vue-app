<template>
  <div class="backToTop" @click="toTop" :class="{showBackToTop:isShowBackToTop}">返回顶部</div>
</template>

<script>
  export default {
    name:'BackToTop',
    data() {
      return {
        isShowBackToTop:false,
      }
    },
    methods: {
      // 页面滚动事件的回调
      pageScrollEvent() {
        this.scroll = window.scrollY
        this.isShowBackToTop = this.scroll > 2000 ? true : false
      },
      // 返回顶部按钮的回调
      toTop() {
        // 能直接回到顶部，且有动画【具体看MDN】
        document.querySelector('.van-list').scrollIntoView({
          behavior:'smooth',
          block:'start'
        })
      }
    },
    mounted() {
      window.addEventListener('scroll',this.pageScrollEvent)
    }
  }
</script>

<style lang="less" scoped>
  .backToTop {
    position: fixed;
    top: 70%;
    right: -1.76rem;
    padding: .2667rem .1333rem;
    font-size: .3733rem;
    color: #fff;
    background-color: @mainColor;
    transition: all .3s linear;
  }
  .backToTop.showBackToTop {
    right: 0;
  }
</style>
