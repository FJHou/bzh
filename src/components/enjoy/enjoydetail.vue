<template>
  <div class="detial-box-cantainer">
    <headerview :titles='"乐享生活详情"'></headerview>
    <Scroll class="enjoy-detail-content" :data="[]" ref="enjoyDetail">
      <section>
        <div class="detial-box-swiper">
          <swiper loop auto :list="bannerList" :index="demo06_index" @on-index-change="demo06_onIndexChange"></swiper>
        </div>
        <div class="detail-box-text">
          <p>{{activityInfo.name}}</p>
          <!-- <p>珍爱时刻Botanica植物餐厅</p> -->
          <p>{{activityInfo.cityName}}</p>
          <p>{{activityInfo.startTime}} 至 {{activityInfo.endTime}}</p>
          <p class="aPhone"><i>{{activityInfo.address}} </i><a :href="'tel:'+phoneNum"><b class="fonticon icon-phone"></b></a></p>
          <p class="aStars"><b class="fonticon icon-stars" :class="reservationFlag == 'Y'? 'on' : 'off'"></b><i>{{bespeakCount}}人已预约</i></p>
        </div>
        <div style="width: 100%;height: 0.2rem;background: #fbf9fe;"></div>
        <div class="enjoy-recommend">
          <h4>推荐理由</h4>
          <p class="context" v-html="activityInfo.context"></p>
        </div>
      </section>
    </Scroll>
    <div class="detail-footer" v-if="projectStatus !== '3'">
      <div class="more-info" @click="booking" >
        预约活动
      </div>
      <div class="add-focus" @click="addFocus">
        <span v-if="isFocus">已关注</span>
        <span v-else><i class="fonticon icon-plus-empty">关注</i></span>
      </div>
    </div>
    <Alert v-model="alertShow" :title="alertTitle" :content="alertContent"></Alert>
  </div>
</template>

<script>
/* created by fanling in 20171127 */
import headerview from 'base/head/head.vue'
import { Swiper, GroupTitle, SwiperItem, Alert } from 'vux'
import Scroll from 'base/scroll/scroll'
import { findActivityDetailInfo,
         findActivityBanners } from 'api/enjoy/api-enjoy'
import { attentionOneProject,
         cancelAttention,
         bespeakOneProject }
from 'api/global/api-global.js'
import { RESULT_CODE, hasUToken, imgLoaded } from 'assets/js/utils'

export default {
  data () {
    return {
      phoneNum: '',
      titles: '',
      isFocus: true,
      activityInfo: {},
      data: [],
      reservation: '',
      reservationFlag: '',
      bespeakCount: '',
      projectStatus: '',
      alertShow: false,
      alertTitle: '',
      alertContent: '',
      bannerList: [],
      demo06_list: [],
      demo06_index: 0,
      showModal: false,
      isShow: ''
    }
  },
  created () {
    this.findActivityDetailInfo()
    console.log('asdasd'.replace(/\w+/, 0))
    // this._findActivityBanners()
  },

  methods: {
    _findActivityBanners () {
      findActivityBanners().then((res) => {
        if (res.resultCode === RESULT_CODE) {
          let arr = res.result.ativityBannerList
          let bannerList = arr.map((item, index) => {
            item.img = item.imageUrl
            return item
          })
          this.bannerList = bannerList
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
    addFocus () {
      if (!this.checkLogin()) {
        return
      }
      if (!this.isFocus) {
        attentionOneProject(this.code, '', '', 2).then((res) => {
          if (res.resultCode === RESULT_CODE) {
            this.isFocus = true
            this.$store.commit('SET_ENJOY_ATTENTION_STATUS', 'Y')
          }
        })
      } else {
        cancelAttention(this.code, 2).then((res) => {
          if (res.resultCode === RESULT_CODE) {
            this.isFocus = false
            this.$store.commit('SET_ENJOY_ATTENTION_STATUS', 'N')
          }
        })
      }
    },
    booking () {
      if (!this.checkLogin()) {
        return
      }
      if (this.reservation === 'true') {
        this.alertShow = true
        this.alertTitle = '您已预约成功'
        this.alertContent = '请耐心等待客服人员与您联系'
        return
      }

      bespeakOneProject(this.code, '', '', 2).then((res) => {
        if (res.resultCode === RESULT_CODE) {
          this.reservation = 'true'
          this.reservationFlag = 'Y'
          this.alertTitle = '预约成功'
          this.alertContent = '我们的客服人员将会与您联系'
          this.alertShow = true
        }
      })
    },

    findActivityDetailInfo () {
      this.code = this.$route.query.id
      findActivityDetailInfo(this.code).then((res) => {
        if (res.resultCode === RESULT_CODE) {
          let activityInfo = res.result.activityInfo
          activityInfo.startTime = activityInfo.startTime.substring(0, activityInfo.startTime.lastIndexOf(':'))
          activityInfo.endTime = activityInfo.endTime.substring(0, activityInfo.endTime.lastIndexOf(':'))
          // v-html解析时遇到多张图片，在网络较差的情况下
          // 无法及时获取图片的高度导致better-scroll高度
          // 计算错误,页面无法滑动到底部
          imgLoaded(activityInfo.context)
            .then((msg) => {
              if (msg === 'loaded') {
                this.$refs.enjoyDetail.refresh()
              }
            })
            .catch((err) => {
              console.log(err)
            })
          this.data = res.result
          this.reservationFlag = res.result.reservation
          this.bespeakCount = res.result.bespeakCount
          this.projectStatus = activityInfo.astatus
          this.activityInfo = activityInfo
          document.title = activityInfo.name
          // 电话号码
          this.phoneNum = activityInfo.phone
          this.bannerList = [
            {
              'img': activityInfo.imageUrl,
              'title': activityInfo.name
            }
          ]
          this.reservation = res.result.reservation === 'N' ? 'false' : 'true'
          res.result.attention === 'N' ? this.isFocus = false : this.isFocus = true
          this.data = [1]
        }
      })
    },
    demo06_onIndexChange (index) {
      this.demo06_index = index
    },
    goaActivity () {
      this.showModal = true
    },
    checked () {
      if (this.isShow) {
        this.isShow = false
      } else {
        this.isShow = true
      }
    }
  },
  components: {
    headerview,
    Swiper,
    SwiperItem,
    GroupTitle,
    Scroll,
    Alert
  }
}
</script>

<style lang="less">
.detial-box-cantainer{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #fff;
  z-index: 2;
  .vux-indicator{
    display: none !important;
  }
  .detail-footer{
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    font-size: 0.3rem;
    width: 100%;
    .more-info{
      flex: 1;
      color: #fff;
      background-color: #6ba4ea;
    }
    .add-focus{
      flex: 0 0 2.1rem;
      width: 2.1rem;
      color: #6ba4ea;
      background: #fff;
      span{
        display: block;
      }
      .icon-plus-empty{
        line-height: 0.3rem;
        font-size: 0.3rem;
      }
    }
  }
  .enjoy-detail-content{
    position: absolute;
    top: 0.88rem;
    bottom: 0.8rem;
    left: 0;
    right: 0;
    .detail-box-text{
      padding-bottom: 0.2rem;
      background:#fff;
    p{
      text-align: center;
      color: #333;
    }
    p:nth-child(1){
      line-height: 0.5rem;
    }
    p:nth-child(3){
      line-height: 0.6rem;
      margin-top: 0.2rem;
    }
    p:nth-child(6){
      line-height: 0.6rem;
    }
      .aPhone{
        height: 0.6rem;
        line-height: 0.6rem;
        i{
          height: 0.6rem;
          line-height: 0.6rem;
        }
        b{
          margin-top: -0.05rem;
          font-size: 0.4rem;
          color: #5aa5f0;
          vertical-align: middle;
        }
      }
      .aStars{
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: center;
        b{
          margin-top: -0.1rem;
          vertical-align: middle;
          font-size: 0.4rem;
          &.off{
            color: #ddd;
          }
          &.on{
            color: #5aa5f0;
          }
        }
      }
   }
  }

  .enjoy-recommend{
    background:#fff;
    margin: 0.2rem auto;
    width: 90%;
    overflow:hidden;
    .context{
      width: 100%;
    }
    // h4{
    //   font-style: normal;
    //   font-weight: normal;
    //   font-size: 0.32rem;
    //   line-height: 0.78rem;
    //   text-align: center;
    // }
    // p{
    //   margin: 0 auto;
    // }
    // img{
    //   height: 3.6rem;
    //   width: 100%;
    //   margin: 0.2rem 0;
    // }
  }
  .enjoy-box-footer{
    position: fixed;
    left: 0;
    bottom:0;
    width: 100%;
    height: 0.8rem;
    background:#fff;
    button{
      border:0;
      width: 72%;
      height: 100%;
      line-height: 100%;
      color: #fff;
      background:#6ba4ea;
      float: left;
    }
    p{
      width: 27%;
      color:#6ba4ea;
      float: left;
      text-align: center;
      border-top: 1px solid #e9e9e9;
      line-height: 0.8rem;
      position: relative;
      i{
        display: block;
        position: absolute;
        top:0;
        left: 15%;
        color: #6ba4ea;
        font-size: 0.46rem;
        font-weight: bolder;
      }
      i.icon-small{
        display: block;
        font-size: 0.3rem;
        font-weight: normal;
        position: absolute;
        top:1%;
        left: 20%;
      }
    }
  }
}
/* vux style */
.copyright {
  font-size: 12px;
  color: #ccc;
  text-align: center;
}
.text-scroll {
  border: 1px solid #ddd;
  border-left: none;
  border-right: none;
}
.text-scroll p{
  font-size: 12px;
  text-align: center;
  line-height: 30px;
}
.black {
  background-color: #000;
}
.title{
  line-height: 100px;
  text-align: center;
  color: #fff;
}
.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}
.vux-indicator.custom-bottom {
  bottom: 30px;
}
@-webkit-keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
.fadeInUp {
  animation-name: fadeInUp;
}
.swiper-demo-img img {
  width: 100%;
}
</style>

