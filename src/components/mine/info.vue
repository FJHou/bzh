<template>
  <div class="info-view">
    <Bhead :titles="title"></Bhead>
    <Group class="cell-group" gutter="0">
      <Cell title="头像" class="cell">
        <div style="" class="avatar-wrapper">
          <i class="fonticon icon-my-personal"></i>
        </div>
      </Cell>
      <Cell title="用户名" :value="nickName" :is-link="true" class="cell" @click.native="toggleNameHide"></Cell>
      <PopupPicker :data="pickerMap"
                     title = "性别"
                     v-model="sex"
                     :show="showSexPopup"
                     :confirm-text="'确定'"
                     @on-change="sexChange"
                     class="sex-popup">
      </PopupPicker>
      <Datetime title="生日"
                placeholder="请输选择出生日期"
                :min-year="1900"
                @on-change="birthdayConfirm"
                v-model="birthday">
      </Datetime>
      <Cell title="手机号" :value="tel" :is-link="true" class="cell" @click.native="toggleTelModify"></Cell>
      <XAddress v-model="address"
                title="地区"
                :hide-district="true"
                :list="addressList"
                @on-shadow-change="addressChange"
                @on-hide="addressConfirm">
      </XAddress>
      <Cell title="更多" :is-link="true" class="cell" @click.native="enterMore"></Cell>
    </Group>
    <transition name="set-name-slide">
      <SetName v-show="setNameShow"
              @returnBack="toggleNameHide"
              @pageConfirm="pageConfirm"
              :pagetitle="'设置昵称'"
              class="setName">
        <div slot="content">
          <XInput type="text" v-model="nickName" placeholder="请输入用户名"></XInput>
        </div>
      </SetName>
    </transition>
    <ModifyTel v-show="modifyTelShow" @modifyTelBack="toggleTelModify" @telChanged="telChanged"></ModifyTel>
  </div>
</template>

<script>
import Bhead from 'base/head/head'
import ModifyTel from 'base/modify-tel/modifytel'
import { RESULT_CODE } from 'assets/js/utils'
import { Cell, Group, PopupPicker, Datetime, XAddress, ChinaAddressV4Data, XInput } from 'vux'
import { findUserDetailInfo,
         updateNickNamelInfo,
         updateSexInfo,
         updateBirthdayInfo,
         updateAreaInfo }
from 'api/mine/api-mine'

const SetName = (resolve) => {
  import('base/default-page/default-page').then((module) => {
    resolve(module)
  })
}

export default {
  data () {
    return {
      title: '修改个人信息',
      nickName: '--',
      sex: ['男'],
      birthday: '1900-01-01',
      tel: '--',
      pickerMap: [['男', '女']],
      addressList: ChinaAddressV4Data,
      address: ['--', '--'],
      showSexPopup: false,
      showBirthPicker: false,
      setNameShow: false,
      setTelShow: false,
      modifyTelShow: false
    }
  },
  created () {
    setTimeout(() => {
      this.findUserDetailInfo()
    }, 20)
  },
  methods: {
    telChanged (tel) {
      this.modifyTelShow = false
      this.tel = tel
    },
    findUserDetailInfo () {
      findUserDetailInfo().then((res) => {
        if (res.resultCode === RESULT_CODE) {
          this._setData(res.result)
        }
      })
    },
    _setData (res) {
      let reuslt = res
      this.birthday = reuslt.birthday
      this.address = [`${reuslt.city}`, `${reuslt.province}`]
      // console.log(this.address)
      this.sex = reuslt.sex === '1' ? ['男'] : ['女']
      this.nickName = reuslt.nickName
      let setName = document.getElementsByClassName('setName')[0]
      setName.setAttribute('data-nickname', reuslt.nickName)
      this.tel = reuslt.mobile
      this.minIncome = reuslt.minIncome
      this.maxIncome = reuslt.maxIncome
      this.integral = reuslt.integral
      this.industry = reuslt.industry
      this.education = reuslt.education
      this.level = reuslt.level
    },
    // 更多
    enterMore () {
      this.$router.push({
        path: `/mine/more?industry=${this.industry}&education=${this.education}&minIncome=${this.minIncome}&maxIncome=${this.maxIncome}`
      })
    },
    // 修改手机号
    toggleTelModify () {
      this.modifyTelShow = !this.modifyTelShow
    },
    pageConfirm () {
      updateNickNamelInfo(this.nickName).then((res) => {
        console.log(res)
        if (res.resultCode === RESULT_CODE) {
          this.setNameShow = !this.setNameShow
        } else {
          this.$vux.toast.text(`${res.msg}`, 'middle')
        }
      })
    },
    // 修改昵称
    toggleNameHide () {
      this.setNameShow = !this.setNameShow
    },
    // 修改性别
    modifySex () {
      this.showSexPopup = true
    },
    // 修改生日-确定
    birthdayConfirm (val) {
      // console.log(val)
      // 发送修改生日请求 this.birthday = val
      // console.log(this.birthday)
      updateBirthdayInfo(val).then((res) => {
        if (res.resultCode === RESULT_CODE) {

        }
      })
    },
    // 修改地址-滑动
    addressChange (val) {
      // console.log(val)
      this.address = val
    },
    // 修改地址-确定
    addressConfirm (val) {
      if (val) {
        updateAreaInfo(this.address[0], this.address[1]).then((res) => {
          console.log(res)
        })
      }
    },
    // 修改性别-确定
    sexChange (value) {
      let sex = value.toString()
      let code = 1
      if (sex === '男') {
        code = 1
      } else if (sex === '女') {
        code = 2
      }
      updateSexInfo(code).then((res) => {
        // console.log(res)
        if (res.resultCode === RESULT_CODE) {

        }
      })
    }
  },
  components: {
    Bhead,
    SetName,
    Group,
    Cell,
    PopupPicker,
    Datetime,
    XAddress,
    XInput,
    ModifyTel
  }
}
</script>

<style lang="less">
.info-view{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #fff;
  z-index: 2;
  .cell-group{
    .sex-popup, .cell, .weui-cell_access, .vux-cell-box{
      font-size: .3rem;
      &:before{
        left: 0;
        color:#e9e9e9;
      }
    }
    .cell{
      padding: .26rem .3rem;
      .avatar-wrapper{
        display: flex;
        justify-content: center;
        align-items: center;
        width: .88rem;
        height: .88rem;
        border-radius: 50%;
        background: #d2d2d2;
        .icon-my-personal{
          font-size: 0.7rem;
          color: #fff;
        }
      }
      &:before{
        left: 0;
        color:#e9e9e9;
      }
    }
  }
  .set-name-slide-enter-active, .set-name-slide-leave-active {
    transition: all .3s ease
  }
  .set-name-slide-enter, .set-name-slide-leave-active {
    transform: translate3D(0, 100%, 0)
  }
  .set-tel-slide-enter-active, .set-tel-slide-leave-active {
    transition: all .3s ease
  }
  .set-tel-slide-enter, .set-tel-slide-leave-active {
    transform: translate3D(0, 100%, 0)
  }
}
</style>
