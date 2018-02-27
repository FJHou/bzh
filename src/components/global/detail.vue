<template>
  <div class="detail-view">
    <Bhead :titles="'资产配置详情'"></Bhead>
    <Scroll class="detail-content" :data="data" ref="globalDetail">
      <article class="article">
        <section class="overview">
          <div class="overview-img">
            <img :src="content.imageUrl">
          </div>
          <div class="overview-text">
            <h3>{{content.name}}</h3>
            <h4>发布时间：<time>{{content.createDate}}</time></h4>
            <div id="context">
              <p v-html="context"></p>
            </div>
          </div>
        </section>
      </article>
    </Scroll>
    <DetaiFooter @getInfo="getInfo" @focus="focus" :isFocus="isFocus" v-if="projectStatus !== '3'"></DetaiFooter>
    <Alert v-model="alertShow" :title="alertTitle" :content="alertContent"></Alert>
  </div>
</template>
<script>
import Bhead from 'base/head/head'
import Scroll from 'base/scroll/scroll'
import DetaiFooter from 'components/detail-footer/detail-footer'
import { XDialog, Alert } from 'vux'
import { RESULT_CODE, hasUToken, imgLoaded } from 'assets/js/utils'
import { findProjectDetailInfo,
        attentionOneProject,
        cancelAttention,
        bespeakOneProject }
from 'api/global/api-global.js'

export default {
  data () {
    return {
      title: '资产配置详情',
      data: [],
      code: '',
      projectStatus: '',
      content: {},
      context: '',
      result: {},
      alertShow: false,
      alertTitle: '',
      alertContent: '',
      reservation: '',
      isFocus: false,
      showgetInfoConfirm: false
    }
  },
  created () {
    this.getDetail()
  },
  methods: {
    checkLogin () {
      if (!hasUToken()) {
        this.$store.commit('SHOW_LOGIN_VIEW', true)
        return false
      }

      return true
    },
    getDetail () {
      let id = this.$route.query.id

      findProjectDetailInfo(id).then((res) => {
        if (res.resultCode === RESULT_CODE) {
          this.content = res.result.projectInfo
          this.context = res.result.projectInfo.context
          document.title = this.content.name
          // v-html解析时遇到多张图片，在网络较差的情况下
          // 无法及时获取图片的高度导致better-scroll高度
          // 计算错误,页面无法滑动到底部
          imgLoaded(res.result.projectInfo.context).then((msg) => {
            if (msg === 'loaded') {
              this.$refs.globalDetail.refresh()
            }
          }).catch((err) => {
            console.log(err)
          })
          this.result = res.result
          this.code = res.result.projectInfo.code
          res.result.attention === 'N' ? this.isFocus = false : this.isFocus = true
          this.reservation = res.result.reservation === 'N' ? 'false' : 'true'
          this.data = [1]
        }
      })
    },
    getInfo () {
      if (!this.checkLogin()) {
        return
      }

      if (this.reservation === 'true') {
        this.alertShow = true
        this.alertTitle = '您已提交成功'
        this.alertContent = '请耐心等待理财师与您联系'
        return
      }

      bespeakOneProject(this.code).then((res) => {
        if (res.resultCode === RESULT_CODE) {
          this.reservation = 'true'
          this.alertTitle = '提交成功'
          this.alertContent = '我们的理财师会尽快与您沟通'
          this.alertShow = true
        }
      })
    },
    focus () {
      if (!this.checkLogin()) {
        return
      }

      if (!this.isFocus) {
        attentionOneProject(this.code).then((res) => {
          if (res.resultCode === RESULT_CODE) {
            this.isFocus = true
            console.log(this.$store.getters)
            this.$store.commit('SET_ATTENTION_STATUS', 'Y')
          }
        })
      } else {
        cancelAttention(this.code).then((res) => {
          if (res.resultCode === RESULT_CODE) {
            this.isFocus = false
            // this.$store.getters.currentStatus.attention = 'N'
            this.$store.commit('SET_ATTENTION_STATUS', 'N')
          }
        })
      }
    }
  },
  components: {
    Bhead,
    Alert,
    DetaiFooter,
    Scroll,
    XDialog
  }
}
</script>

<style lang="less">
.detail-view{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 2;
  .detail-content {
    position: absolute;
    top: 0.88rem;
    // bottom: 1rem;
    bottom: .8rem;
    left: 0;
    right: 0;
    .article{
      .overview,
      .project{
        .overview-img {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 3.6rem;
          overflow: hidden;
          &>img{
            width: 100%;
          }
        }
        .overview-text{
          padding: 0.12rem 0.3rem 0.2rem;
          // h3{
          //   font-size: 0.3rem;
          //   line-height: .6rem;
          // }
          // h4{
          //   font-size: 0.22rem;
          //   color: #666;
          //   border-bottom: 1px solid #e9e9e9;
          //   padding-bottom: .3rem;
          // }
          // p{
          //   padding-top: 0.3rem;
          //   font-size: 0.24rem;
          //   line-height: .48rem;
          // }
        }
      }
      .project{
        .project-text{
          padding: 0.32rem 0.3rem 0.2rem;
          h2{
            padding-bottom: 0.2rem;
          }
        }
      }
    }
  }
  .alert-fade-enter-active, .alert-fade-leave-active {
    transition: all .3s ease;
  }
  .alert-fade-enter, .alert-fade-leave-active {
    opacity: 0;
  }
}
</style>
