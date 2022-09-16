<template>
  <div class="setting">
    <Header title="账号管理" />
    <van-row>
      <van-col span="5">昵称</van-col>
      <van-col span="10" offset="3"><input type="text" v-model="name"></van-col>
    </van-row>
    <van-row>
      <van-col span="5">个性签名</van-col>
      <van-col span="60" offset="3"><input type="text" v-model="title"></van-col>
    </van-row>
    <van-row>
      <van-col span="5">修改密码</van-col>
      <van-col span="10" offset="3"><input type="text" v-model="password"></van-col>
    </van-row>
    <div class="btns">
      <button @click="save">保存</button>
      <button @click="logout">退出登入</button>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'vant'
  export default {
    name:'Setting',
    data() {
      return {
        name:'',
        title:'',
        password:'',
      }
    },
    async mounted() {
      const {data} = await this.$API.user.getUserInfo()
      this.title = data.introduceSign
      this.name = data.loginName
    },
    methods:{
      async save() {
        const params = {
          introduceSign: this.title,
          nickName: this.name,
          passwordMd5: this.$md5(this.password)
        }
        await this.$API.user.EditUserInfo(params)
        Toast.success('修改成功')
      },
      async logout() {
        let {resultCode} = await this.$API.user.logout()
        if (resultCode) {
          localStorage.setItem('token','')
          window.location.href = '/'
        }
      },
    }
  }
</script>

<style lang="less" scoped>
  .setting {
    padding-top: 1.3333rem;
    .van-row {
      padding: .2667rem 0;
      margin: 0 .5333rem;
      font-size: .4267rem;
      
      color: #323233;
      border-bottom: .0267rem solid #f9f9f9;
      .van-col.van-col--5 {
        text-align: justify;
        height: .5333rem;
      }
      .van-col.van-col--5:after {
        content: '';
        display: inline-block;
        width: 100%;
      }
    }

    .btns {
      margin-top: .5333rem;
      button {
        width: 80%;
        height: 1.1733rem;
        line-height: 1.1733rem;
        text-align: center;
        margin: .1333rem 10%;
        font-size: .4267rem;
        border: .0267rem solid @mainColor;
        color: #fff;
        background-color: @mainColor;
      }
    }
  }
</style>
