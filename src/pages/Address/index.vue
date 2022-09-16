<template>
  <div class="address"> 
    <Header title="地址管理" back="mySelf" />
    <div class="container">
      <div class="container_item" v-for="item in addressInfoList" :key="item.addressId">
        <div class="info"  @click="toCreateOrder(item)">
          <div class="top">
            <span class="name">{{item.userName}}</span>
            <span class="phone">{{item.userPhone}}</span>
            <span class="default" v-show="item.defaultFlag">默认</span>
          </div>
          <div class="user_address">
            <span>{{item.provinceName}}</span>
            <span>{{item.cityName}}</span>
            <span>{{item.regionName}}</span>
            <span>{{item.detailAddress}}</span>
          </div>
        </div>
        <van-icon name="edit" @click="updateAddress(item)" />
      </div>
    </div>
    <twiceLoading :isShowLoading="isShowLoading" />
    <footer class="footer">
      <div @click="addAddress">新增地址</div>
    </footer>
  </div>
</template>

<script>
  // 全国地区的邮政编码数据
  import {tdist} from '@/assets/AllAddressList'
  export default {
    name:'Address',
    data() {
      return {
        addressInfoList:[],
        isShowLoading:false,
      }
    },
    mounted() {
      this.getAddressList()
    },
    methods:{
      async getAddressList() {
        if (!this.$store.state.address.addressList.length) {
          await this.$store.dispatch('getAddressList')
        }
        this.addressInfoList = this.$store.state.address.addressList
      },
      // 点击地址跳转到 createOrder 组件【传递当前点击的地址信息】
      toCreateOrder(info) {
        this.$router.push({ name:'createOrder', params:{info}})
      },
      // 新增地址
      addAddress() {
        this.$router.push({name:'editAddress',query:{type:'add',infoList:''}})
      },
      // 编辑地址
      updateAddress(info) {
        for(let k in tdist) {
          if (tdist[k][0] == info.regionName) {
            var code = k
          }
        }
        // 整理文档要求的数据
        let infoList = {
          id:info.addressId,
          name:info.userName,
          tel:info.userPhone,
          province:info.provinceName,
          city:info.cityName,
          county:info.regionName,
          addressDetail:info.detailAddress,
          areaCode:code,  // 这是地区邮政编码，必填项
          isDefault:info.defaultFlag == 1,
        }
        this.$router.push({name:'editAddress',query:{type:'update',infoList}})
      },
    },
    // #region
    /* ----------------   已弃用   -------------------
      下面是为了解决多次切换地址，多次点击头部返回按钮会在 createOrder 和 address 之间来回切换。
      当 vm.$route.params.info 为 undefined 时，即为address回退到createOrder。分两种情况【箭头为回退的含义】
            1. address => createOrder => address => mySelf
            2. createOrder => address => mySelf
      可以简化为 --- 从 createOrder 回退过来并且想要回退到 createOrder 这种情形就跳往 mySelf 
      beforeRouteEnter (to, from, next) {
        next(vm => {
          if (from.name == 'createOrder' && !vm.$route.params.sign) {
            vm.$store.commit('CHANGE_FLAG',true)
          }
        })
      }, 
     */
    // #endregion
  }
</script>

<style lang="less" scoped>
  .address {
    .container {
      padding: 1.3333rem 0 1.8667rem;
      .container_item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .2667rem .5333rem;
        border-radius: .2667rem;
        margin: .2667rem .5333rem;
        box-shadow: 0 .0533rem #f7f7f7;
        .info {
          color: #323233;
          .top {
            display: flex;
            align-items: center;
            font-size: .4267rem;
            margin-bottom: .2667rem;
            line-height: 100%;
            .name {
              margin-right: .1333rem;
            }
            .default {
              font-size: .32rem;
              padding: 0 .0533rem;
              margin-left: .1333rem;
              background-color: #ee0a24;
              color: #fff;
              padding-left: .1333rem;
              text-align: center;
              border-radius: .16rem;
            }
          }
          .user_address {
            font-size: 13px;
            display: flex;
            span {
              padding-right: .1333rem;
              line-height: 100%;
            }
          }
        }

        .van-icon {
          font-size: .5333rem;
        }
      }
    }

    .footer {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1.6rem;
      background-color: #fff;
      z-index: 99;
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: .0267rem solid #f9f9f9;

      div {
        width: 90%;
        height: 1.0667rem;
        border-radius: .5333rem;
        background-color: @mainColor;
        font-size: .4267rem;
        color: #fff;
        text-align: center;
        line-height: 1.0667rem;
      }
    }
  }
  
</style>
