<template>
  <div class="login">
    <Header :title="toggle ? '登入' : '注册'" back="home" />
    <div class="img"><img src="http://s.weituibao.com/1582958061265/mlogo.png"></div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div class="verify">
        <Verify ref="loginVerifyRef" @error="error" :showButton="false" @success="success" :width="'40%'" :height="'1.0667rem'" :fontSize="'.4267rem'" :type="2"></Verify>
      </div>
      <a class="toggle" @click="toggle = !toggle">{{toggle ? '立即注册' : '已有登入账号'}}</a>
      <div style="margin:.4267rem;">
        <van-button round block type="info" native-type="submit">{{toggle ? '登入' : '注册'}}</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
  import Verify from 'vue2-verify'
  import {Toast} from 'vant'
  export default {
    name:'Login',
    components:{Verify},
    data() {
      return {
        toggle:true, // 登入|注册切换
        username:'',
        password:'',
        verify:false
      }
    },
    methods:{
      dealTriVer() {
        // 执行验证码的验证，通过 this.verify 知道验证码是否填写正确
        this.$refs.loginVerifyRef.$refs.instance.checkCode()
      },
      async onSubmit() {
        // 进行验证码验证
        this.dealTriVer()
        if (!this.verify) {
          Toast.fail('验证码未填或填写错误!')
          return
        }
        if (this.toggle) {
          const {data} = await this.$API.user.login({
            "loginName": this.username,
            "passwordMd5": this.$md5(this.password)
          })
          localStorage.setItem('token',data)
          // 设置整个URL(回到首页)
          window.location.href = '/'
        } else {
          await this.$API.user.register({
            "loginName": this.username,
            "password": this.password
          })
          Toast.success('注册成功')
          // 注册成功后切换为登入
          this.toggle = true
        }
      },
      // 验证失败的回调
      error(obj) {
        this.verify = false
      },
      // 验证成功的回调
      success(obj) {
        this.verify = true
      },
    }
  }
</script>

<style lang="less" scoped>
  .login {
    .img {
      width: 3.2rem;
      height: 3.2rem;
      margin: 2.3333rem auto 0;
    }
    .van-form {
      margin: 0 5%;
      .verify-bar-area {
        margin-top: .64rem;
        .verify-left-bar {
          border-color: @mainColor;
        }
        .verify-move-block {
          background-color: @mainColor;
          color: #fff;
        }
      }
      .verify {
        >div {
          width: 100%;
        }
        display: flex;
        justify-content: center;
        /deep/ .cerify-code-panel {
          margin-top: .4267rem;
          display: flex;
          align-items: center;
        }
        /deep/.verify-code {
          width: 40%!important;
          margin: 0 .3733rem!important;
        }
        /deep/.verify-code-area {
          width: 54%!important;
          margin-left: .3733rem!important;
          display: flex;
          align-items: center;
          .varify-input-code {
            width: 2.4rem;
            height: 1.0133rem!important;
            border: .0267rem solid #e9e9e9!important;
            padding-left: .2667rem;
            font-size: .4267rem;
          }
          .verify-change-area {
            line-height: 1.1733rem;
          }
        }
      } 
      .van-button--info {
        background-color: @mainColor;
        border-color: @mainColor;
      }
      .toggle {
        display: inline-block;
        color: #1989fa;
        font-size: .3733rem;
        margin: .5333rem 5% 0;
      }
    }
  }
</style>
