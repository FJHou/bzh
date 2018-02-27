<template>
  <div class="mine">
    <Bhead :titles="title"></Bhead>
    <div class="mine-info">
      <div class="avatar-group">
        <div class="avatar">
          <div class="avatar-border">
            <div class="img-wrapper">
              <img src="../../assets/img/avatar.png">
            </div>
          </div>
        </div>
        <p class="name">
          <span @click="checkLogin">{{userName}}</span>
          <span v-if="isLogin" @click="checkInfo">查看修改资料<i class="fonticon icon-arrow-forward"></i></span>
        </p>
        <p class="sign-in" @click="checkLogin">
          <!-- <span :class="signed">签到</span> -->
        </p>
      </div>
      <div class="nav-group">
        <p class="booking border-1px" @click="enterBooking">
          <i class="num">{{bookingCnt}}</i>
          <span>我的预约</span>
        </p>
        <p class="focus" @click="enterFocus">
          <i class="num">{{focusCnt}}</i>
          <span>我的关注</span>
        </p>
      </div>
    </div>
    <p class="gap"></p>
    <ul class="entrance-list">
      <li class="item" @click="enterMembership">
        <i class="fonticon item-icon icon-my-vip"></i>
        <p class="item-name">会员制度</p>
        <b class="item-arrow"><i class="fonticon icon-arrow-forward"></i></b>
      </li>
      <li class="item" @click="enterQuestion">
        <i class="fonticon item-icon icon-integral-question"></i>
        <p class="item-name">常见问题</p>
        <b class="item-arrow"><i class="fonticon icon-arrow-forward"></i></b>
      </li>
      <li class="item" @click="enterContactUs">
        <i class="fonticon item-icon icon-custom-service"></i>
        <p class="item-name">联系我们</p>
        <b class="item-arrow"><i class="fonticon icon-arrow-forward"></i></b>
      </li>
      <li class="item" @click="enterAboutUs">
        <i class="fonticon item-icon icon-custom-service"></i>
        <p class="item-name">关于我们</p>
        <b class="item-arrow"><i class="fonticon icon-arrow-forward"></i></b>
      </li>
    </ul>
    <transition name="slide">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import Bhead from 'base/head/head'
import { findMyHomePage, findMyBespeakInfos } from 'api/mine/api-mine'
import { hasUToken, RESULT_CODE } from 'assets/js/utils'

export default{
  data () {
    return {
      userName: '立即登录',
      bookingCnt: 0,
      focusCnt: 0,
      isSignIn: true,
      title: '个人中心'
    }
  },
  computed: {
    signed () {
      return this.isSignIn ? 'signed' : ''
    },
    isLogin () {
      return hasUToken()
    }
  },
  created () {
    this.getUserInfo()
    this.getBookingCount()
  },
  methods: {
    getUserInfo () {
      findMyHomePage().then((res) => {
        if (res.resultCode === RESULT_CODE) {
          let result = res.result
          this.focusCnt = result.attentCount
          this.userName = result.nickName
        }
      })
    },
    getBookingCount () {
      findMyBespeakInfos(2, 1).then((res) => {
        if (res.resultCode === RESULT_CODE) {
          this.bookingCnt = res.result.listCount
        }
      })
    },
    checkLogin () {
      if (!hasUToken()) {
        this.$store.commit('SHOW_LOGIN_VIEW', true)
        return false
      }
      return true
    },
    enterBooking () {
      if (!this.checkLogin()) {
        return
      }

      this.$router.push({
        path: '/mine/booking'
      })
    },
    enterFocus () {
      if (!this.checkLogin()) {
        return
      }

      this.$router.push({
        path: '/mine/focus'
      })
    },
    checkInfo () {
      this.checkLogin()

      this.$router.push({
        path: '/mine/info'
      })
    },
    enterMembership () {
      this.$router.push({
        path: '/mine/membership'
      })
    },
    enterQuestion () {
      this.$router.push({
        path: '/mine/question'
      })
    },
    enterContactUs () {
      this.$router.push({
        path: '/mine/contactUs'
      })
    },
    enterAboutUs () {
      this.$router.push({
        path: '/mine/aboutUs'
      })
    }
  },
  components: {
    Bhead
  }
}
</script>

<style lang="less" scope>

  .mine{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 1rem;
    background-color: #f6f6f7;
    z-index: 2;
    .gap{
      height: 0.2rem;
    }
    .mine-info{
      position: relative;
      padding-bottom: .22rem;
      height: 3.02rem;
      background: url('../../assets/img/banner.png') 100%/cover no-repeat;
      .avatar-group{
        display: flex;
        padding-top: 0.58rem;
        padding-bottom: 0.08rem;
        color: #fff;
        .avatar{
          display: flex;
          align-items: center;
          padding-left: 0.28rem;
          padding-right: 0.16rem;
          .avatar-border{
            position: relative;
            width: 1.16rem;
            height: 1.16rem;
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            overflow: hidden;
            text-align: center;
            .img-wrapper{
              width: 1.0rem;
              height: 1.0rem;
              border-radius: 50%;
              overflow: hidden;
              position: absolute;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
              margin: auto;
              background: #fff;
              img{
                width: 100%;
              }
            }

          }
        }
        .name{
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          :nth-child(1){
            font-size: 0.3rem;
          }
          :nth-child(2){
            margin-top: 5px;
            font-size: 0.2rem;
            .icon-arrow-forward{
              font-size: 0.2rem;
              vertical-align: middle;
            }
          }
        }
        .sign-in{
          padding-right: 0.79rem;
          font-size: 0.34rem;
          display: flex;
          text-align: center;
          align-items: center;
          .signed{
            padding: .11rem .5rem;
            // width: 1.4rem;
            // height: 0.55rem;
            border-radius: 3px;
            border: 1px solid #fff;
          }
        }
      }
      .nav-group{
        width: 100%;
        // position: absolute;
        // left: 0;
        // bottom: .22rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        height: 1.16rem;
        color: #fff;
        .border-1px{
          position: relative;
          :after{
            content: '';
            position: absolute;
            right: 0;
            top: 0;
            height: 100%;
            width: 1px;
            transform: scaleY(.6);
            transform-origin: 50% 50%;
            background-color: #fff;
          }
        }
        .num{
          margin-bottom: 4px;
        }
        .booking, .focus{
          padding-top: 0.2rem;
          flex: 1;
          border-radius: 5px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .entrance-list{
      li{
        display: flex;
        padding-left: 0.4rem;
        padding-right: 0.25rem;
        height: 0.9rem;
        line-height: 0.9rem;

        .item-icon{
          flex: 0 0 0.35rem;
          padding-right: 0.16rem;
          font-size: 0.5rem;
          color: #d7e0ec;
        }
        .item-name{
          flex: 1;
          font-size: .3rem;
        }
        .item-arrow{
          flex: 0 0 0.35rem;
          // background: url('../../assets/img/main_03.png') center/100% no-repeat
        }
        .icon-arrow-forward{
          font-size: .30rem;
        }
      }
    }
    .slide-enter-active, .slide-leave-active{
      transition: all .3s linear
    }
    .slide-enter, .slide-leave-active{
      transform: translate3d(100%,0,0)
    }
  }

</style>
