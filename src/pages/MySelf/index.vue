<template>
  <div class="myself">
    <Header title="我的" />
    <div class="container">
      <div class="container_header">
        <div class="photo">
          <img src="http://s.weituibao.com/1583583975067/user-graduate%20(1).png">
        </div>
        <div class="user_info">
          <div class="name">昵称：{{nickName}}</div>
          <div class="login_name">登入名：{{loginName}}</div>
          <div class="title">个性签名：{{introduceSign}}</div>
        </div>
      </div>
      <div class="container_nav">
        <ul>
          <li @click="$router.push({name:'order'})"> 
            <span>我的订单</span>
            <van-icon name="arrow" />
          </li>
          <li @click="$router.push({name:'setting'})"> 
            <span>账号管理</span>
            <van-icon name="arrow" />
          </li>
          <li @click="$router.push({name:'address'})"> 
            <span>地址管理</span>
            <van-icon name="arrow" />
          </li>
          <li @click="$router.push({name:'about'})"> 
            <span>关于我们</span>
            <van-icon name="arrow" />
          </li>
        </ul>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
  export default {
    name:'MySelf',
    data() {
      return {
        introduceSign:'',
        loginName:'',
        nickName:'',
      }
    },
    async mounted() {
      const {data} = await this.$API.user.getUserInfo()
      this.introduceSign = data.introduceSign
      this.loginName = data.loginName
      this.nickName = data.nickName 
    }
  }
</script>

<style lang="less" scoped>
  .myself {
    .container {
      width: 100%;
      padding-top: 1.3333rem;
      .container_header {
        display: flex;
        align-items: center;
        width: 90%;
        padding: .6667rem .5333rem;
        margin: 0 auto;
        background-color: @mainColor;
        border-radius: .2667rem;

        .photo {
          width: 1.6rem;
          height: 1.6rem;
          border-radius: 50%;
          overflow: hidden;
          margin-right: .2667rem;

          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }

        .user_info {
          font-size: .3733rem;
          color: #fff;
          div {
            padding-bottom: .1333rem;
          }
        }
      }

      .container_nav {
        margin-top: .2667rem;
        ul {
          li /deep/ {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 90%;
            height: 1.0667rem;
            font-size: .3733rem;
            margin: 0 5%;
            border-bottom: .0267rem solid #e9e9e9;

            span {
              float: left;
            }
            .van-icon {
              float: right;
            }
          }
        }
      }
    }
  }
</style>