<template>
  <div class="flii-assess">
    <Bhead :titles="title"></Bhead>
    <div class="g-cell border-1px-t" @click="showSexPopup = true">
      <span>性别</span>
      <p>{{userSex}}</p>
      <i class="fonticon icon-arrow-forward"></i>
    </div>
    <div class="g-cell border-1px-t">
      <span>姓名</span>
      <p class="text-wrapper">
        <input type="text" name="userName" placeholder="请输入姓名" v-model="userName" maxlength="10">
        <i class="fonticon icon-close-circled" v-show="userName" @click="userName = ''"></i>
      </p>
    </div>
    <div class="g-cell border-1px-t border-1px-b">
      <span>手机号</span>
      <p class="text-wrapper">
        <input type="tel" name="telNumber" placeholder="请输入手机号码" maxlength="11" v-model="telNumber">
        <i class="fonticon icon-close-circled" v-show="telNumber" @click="telNumber = ''"></i>
      </p>
    </div>
    <div class="submit-wrapper">
      <span class="submit-assess" @click="submitAssess">确认并提交评估</span>
    </div>
    <PopupPicker :data="sex"
                 :show="showSexPopup"
                 :confirm-text="'确定'"
                 @on-hide="showSexPopup = false"
                 @on-change="sexPopupChange"
                 class="sex-popup">
    </PopupPicker>
  </div>
</template>

<script>
import Bhead from 'base/head/head'
import { PopupPicker } from 'vux'
export default {
  data () {
    return {
      title: '在线评估-填写个人信息',
      showSexPopup: false,
      telNumber: '',
      sex: [['男', '女']],
      userSex: '男',
      userName: ''
    }
  },
  methods: {
    submitAssess () {
      let sex = this.userSex
      if (sex === '男') {
        sex = 1
      } else {
        sex = 2
      }
      this.$emit('getResult', this.userName, sex, this.telNumber)
    },
    sexPopupChange (value) {
      this.userSex = value.toString()
    }
  },
  components: {
    Bhead,
    PopupPicker
  }
}
</script>

<style lang="less">
@import '../../assets/css/variable.less';

.flii-assess{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #fff;
  z-index: 2;
  .g-cell{
    display: flex;
    // padding: 0 0.3rem;
    height: 1rem;
    line-height: 1rem;
    span{
      padding-left: .3rem;
      flex: 0 0 1rem;
      width: 1rem;
      font-size: 0.3rem;
      margin-right: 1rem;
    }
    p{
      flex: 1;
    }
    .text-wrapper{
      display: flex;
      input{
        flex: 1;
        height: 100%;
        border: none;
        outline: none;
        line-height: 1rem;
        font-size: .3rem
      }
      .icon-close-circled{
        color: #ccc;
        padding: 0 0.4rem;
        font-size: 14px;
      }
    }

    .icon-arrow-forward{
      font-weight: 100;
      font-size: 18px;
      padding-right: .3rem
    }
  }
  .submit-wrapper{
    margin-top: 1.15rem;
    text-align: center;
    .submit-assess{
      display: inline-block;
      width: 4.53rem;
      height: 0.88rem;
      border-radius: 5px;
      line-height: 0.88rem;
      font-size: 0.34rem;
      background: #6ba4ea;
      color: #fff;
    }
  }
  .sex-popup{
    display: none;
  }
}
  /**
   * 自定义遮罩vux组件样式
   */
  // 完成按钮
  // .v-transfer-dom{
  //   .vux-popup-header-right {
  //     color: #6ba4ea;
  //   }
  //   .vux-popup-dialog::-webkit-scrollbar{
  //     display: none;
  //   }
  // }

</style>
