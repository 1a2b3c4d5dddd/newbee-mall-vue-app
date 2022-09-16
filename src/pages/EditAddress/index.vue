<template>
  <div class="editAddress">
    <Header :title="type ? '新增地址' : '编辑地址'" />
    <template lang="pug">
      <van-address-edit
        :area-list="areaList"
        :show-delete="!type"
        show-detail
        show-set-default
        show-search-result
        :address-info="infoList"
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
      />
    </template>
    <twiceLoading :isShowLoading="isShowLoading" />
  </div>
</template>

<script>
  // 引入全部的地址列表  ----- 这里选择的是引入vant官方的地址库
  import { areaList } from '@vant/area-data'
  import {Toast} from 'vant'
  export default {
    name:'EditAddress',
    data() {
      return {
        searchResult:[],
        areaList:areaList,
        type:this.$route.query.type == 'add',  // 保存类型，boolean 类型
        infoList: this.$route.query.infoList || {}, // 组件需要展示的数据
        isShowLoading:false,
      }
    },
    mounted() {

    },
    methods:{
      // 保存按钮的回调
      async onSave(info) {
        this.isShowLoading = true
        const params = {
          userName: info.name,
          userPhone: info.tel,
          provinceName: info.province,
          cityName: info.city,
          regionName: info.county,
          detailAddress: info.addressDetail,
          defaultFlag: info.isDefault ? 1 : 0,
          areaCode:info.areaCode,
        }
        // 编辑模式下要多一个参数 addressId 
        if (!this.type) {
          params['addressId'] = info.id
        }
        let res = this.type ? await this.$API.address.addAddress(params) : await this.$API.address.updateAddress(params)
        if (res.resultCode == 200) {
          // 更新仓库中的地址列表 ----- 因为数据存在仓库中，address组件也是在仓库中拿数据
          await this.$store.dispatch('getAddressList')
          Toast.success(this.type ? '添加成功' : '修改成功')
          this.$router.push({name:'address'})
        } else {
          Toast.fail(this.type ? '添加失败' : '修改失败')
        }
        this.isShowLoading = false
      },
      // 删除按钮的回调
      async onDelete({id}) {
        this.isShowLoading = true
        let res = await this.$API.address.deleteAddress(id)
        this.isShowLoading = false
        if (res.resultCode == 200) {
          Toast.success('删除成功')
        } else {
          Toast.fail('删除失败')
        }
        await this.$store.dispatch('getAddressList')
        this.$router.push({name:'address'})
      },
    }
  }
</script>

<style lang="less">
  .editAddress {
    padding-top: 1.3333rem;
    .van-address-edit {
      .van-address-edit__default {
        .van-switch {
          font-size: .48rem!important;
        }
        .van-switch--on {
          background-color: @mainColor!important;
        }
      }
      .van-address-edit__buttons {
        .van-button--danger {
          border-color: @mainColor;
          background-color: @mainColor;
        }
      }
    }
  }

  html {
    .van-overflow-hidden {
      .van-popup {
        border-radius: 0;
      }
    }
  }
  
</style>
