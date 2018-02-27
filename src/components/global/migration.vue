<template>
  <div class="migration-view">
    <Bhead :titles="title"></Bhead>
    <nav class="flag-nav border-1px-b border-1px-t">
      <h4>热门国家</h4>
      <Slider class="flag-slider" :isMomentum="true" ref="flagSlider" >
        <li class="flag-item" 
            v-for="(country, index) in dataMap" 
            @click="selectCountry(country.id)" 
            :class="{'active': currentId == country.id}"
            :key="index">
          <div class="flag-bg" :style="{'background-image': 'url('+country.flagUrl+')'}"></div>
          <p class="country-name">{{country.name}}</p>
        </li>
      </Slider>
    </nav>
    <div class="tab-view">
      <nav class="tab-nav border-1px-b" >
        <h4>{{currentShow.name}}</h4>
        <Slider class="policy" :isMomentum="true" ref="policySlider">
          <li ref="policyItem"
              @click="selectPolicy(index)" 
              v-for="(item, index) in currentShow.policy" 
              :class="{'active' : index === policyIndex}" 
              :key="index">{{item.name}}</li>
        </Slider>
      </nav>
      <Scroll class="time-line-wrapper" ref="timeLineScroll">
        <div class="time-line">
          <div v-if="migrateShow">
            <div class="section" 
                 v-for="(item, index) in currentShow.policy[policyIndex].content"
                 :key="index">
              <h4>
                <span>
                  <b></b>
                </span>
                {{item.title}}
              </h4>
              <article :class="{'last': index === currentShow.policy[policyIndex].content.length - 1}">
                <section>
                  <p v-html="item.content"></p>
                </section>
              </article>
            </div>
          </div>
          <article class="choiceness"  v-else>
            <section v-html="currentShow.policy[policyIndex].content"></section>
          </article>
        </div>
      </Scroll>
    </div>
    <div class="assess-online" v-if="isShowAssess">
      <i class="fonticon icon-close-circled" @click="isShowAssess = false"></i>
      <h2>在线评估</h2>
      <h5>为您制定私人方案</h5>
      <p>伯仲会已为{{userCount}}位用户免费评估</p>
      <div class="join-assess" @click="enterAssess"></div>
    </div>
    <DetaiFooter :focusShow="false" @getInfo="getInfo"></DetaiFooter>
    <Alert v-model="alertShow" :title="alertTitle" :content="alertText"></Alert>
  </div>
</template>

<script>
import Bhead from 'base/head/head'
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import { Alert } from 'vux'
import DetaiFooter from 'components/detail-footer/detail-footer'
import { MIGRATIONLIST } from './globalData'
import { choicenessMap } from './flag-map'
import { RESULT_CODE, hasUToken } from 'assets/js/utils'
import { findAssessmentCount, PlanningConsultation } from 'api/global/api-global.js'

export default {
  data () {
    return {
      title: '移民规划', // header 的标题
      dataMap: [],  // 移民规划或精选置业的数据结构
      currentShow: MIGRATIONLIST[0], // 当前应该显示的对应国家数据 默认显示的是第一个国家的内容
      isShowAssess: true, // 是否应该显示调查问卷。如果是精选置业则不显示
      alertShow: false, // 控制弹窗的变量
      policyIndex: 0, // $refs.policySlider 里所选政策的索引值。用来和国家数据做关联
      currentId: 0, // 所选国家的id,这个也是在切换国家时和数据做关联（主要是切换国家时的选中展示）
      userCount: 0, // 问卷调查的人数
      alertTitle: '提交成功 ',
      alertText: '我们的理财师会尽快与您沟通'
    }
  },
  created () {
    // 选中的城市的id 此页的内容会根据这个id
    // 查找相应的数据
    this.currentId = this.$route.params.id
    // 是否显示在线问卷的浮层（true || false），精选置业不显示
    this.migrateShow = this.isShowAssess = this.$route.query.type
    this._fillDataByType()
    this._findAssessmentCount()
  },
  mounted () {
    this.selectCountry(this.currentId)
  },
  methods: {
    _fillDataByType () {
      if (this.migrateShow) {
        this.dataMap = MIGRATIONLIST
        this.currentShow = MIGRATIONLIST[0]
        document.title = this.title = '移民规划'
      } else {
        this.dataMap = choicenessMap
        this.currentShow = choicenessMap[0]
        document.title = this.title = '精选置业'
      }
    },
    // 问卷调查人数
    _findAssessmentCount () {
      findAssessmentCount().then((res) => {
        if (res.resultCode === RESULT_CODE) {
          this.userCount = res.result.findAssessmentCount
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
    // 了解项目更多信息
    getInfo () {
      if (!this.checkLogin()) {
        return
      }
      // type = 1为移民规划，type = 2为精选置业
      let type = this.migrateShow ? 1 : 2
      PlanningConsultation(type).then((res) => {
        if (res.resultCode === RESULT_CODE) {
          // 请求成功弹出提示
          this.alertShow = true
          if (res.result.status === 1) {
            this.alertTitle = '您已提交成功'
            this.alertText = '请耐心等待理财师与您联系'
          } else if (res.result.status === 2) {
            this.alertTitle = '提交成功'
            this.alertText = '我们的理财师会尽快与您沟通'
          }
        }
      })
    },
    // 进入问卷调查
    enterAssess () {
      this.$router.push({
        // 通过地址栏传参的方式传送人数，可以减少一次子页面的请求
        path: `/global/assess?count=${this.userCount}`
      })
    },
    // 选择国家
    selectCountry (currentId) {
      // 当选择国家的时候此函数接收一个国家的id,并从dataMap里过滤出
      // 所选国家的内容（filter返回的内容是个只有一个数据的数组）
      let selectedCountry = this.dataMap.filter((item) => {
        return item.id === +currentId
      })

      this.$router.replace({
        path: `/global/migration/${currentId}`,
        query: {
          type: this.$route.query.type
        }
      })

      this.scrollTo()
      // 加载出所选国家后，把政策切换到第一个
      this.policyIndex = 0
      this.currentShow = selectedCountry[0]
      // 如果点击的是当前展示的国家忽略下面的逻辑
      if (this.currentId === currentId) {
        return
      }
      this.currentId = currentId
      // filter返回的为一个数组，所以要取selectedCountry[0]
      this._resetPolicyWidth()
    },
    // 选择完国家后重置政策的宽度，因为政策名称长短不同会导致样式错乱
    _resetPolicyWidth () {
      let policyItem = this.$refs.policyItem
      Array.prototype.forEach.call(policyItem, (item) => {
        item.style.width = ''
      })
    },
    // 选择政策
    selectPolicy (index) {
      this.policyIndex = index
      this.scrollTo()
    },
    // 切换国家或者政策的时候滚动到顶部(不传参的情况下)
    scrollTo (x = 0, y = 0, time = 0) {
      this.$refs.timeLineScroll.scrollTo(x, y, time)
    }
  },
  watch: {
    currentShow () {
      setTimeout(() => {
        this.$refs.policySlider.reload()
        this.$refs.timeLineScroll.refresh()
      }, 20)
    },
    policyIndex () {
      setTimeout(() => {
        this.$refs.timeLineScroll.refresh()
      }, 20)
    }
  },
  components: {
    Bhead,
    Slider,
    Scroll,
    Alert,
    DetaiFooter
  }
}
</script>

<style lang="less">
  @import '../../assets/css/variable.less';
  .migration-view {
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: 6;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
    overflow: hidden;
    .assess-online{
      position: fixed;
      z-index: 5;
      left: 50%;
      top: 30%;
      width: 4.94rem;
      height: 3.58rem;
      text-align: center;
      transform: translateX(-50%);
      background: url('../../assets/img/assess_bg.png') center/100% no-repeat;
      .icon-close-circled{
        display: block;
        height: 40px;
        width: 40px;
        position: absolute;
        right: 0.3rem;
        top: 0.1rem;
        color: #dcdcdc;
        font-size: 0.3rem;
      }
      h2{
        margin-top: 0.48rem;
        font-size: 0.46rem;
        line-height: 0.46rem;
        color: #60acf7;
      }
      h5{
        margin-top: 0.36rem;
        font-size: 0.34rem;
        line-height: 0.34rem;
      }
      p{
        margin-top: 0.2rem;
        font-size: 0.24rem;
        line-height: 0.24rem;
        color: #666;
      }
      .join-assess{
        position: absolute;
        bottom: 0.2rem;
        left: 0;
        right: 0;
        margin: auto;
        width: 1.05rem;
        height: 1.05rem;
        border-radius: 50%;
      }
    }
    .flag-nav{
      padding: .31rem 0 .37rem;
      background: #fff;
      z-index: 2;
      h4{
        padding-left: .25rem;
        margin-bottom: .2rem;
        font-size: .32rem;
        // font-weight: 100;
      }
      .flag-slider{
        min-height: 1px;
        // box-shadow: -2px 0 30px #ccc inset;
        .slider-group{
          padding-top: .2rem;
        }
        .flag-item{
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 .25rem;
          box-sizing: border-box;
          float: left;
          &.active{
            color: #6ba4ea;
          }
          .flag-bg{
            width: .88rem;
            height: .88rem;
            border-radius: 50%;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            border:1px solid #e9e9e9;
            // box-shadow: 0 0 1px 0px rgba(0,0,0,0.3), 0 0 6px 2px rgba(0,0,0,0.15);
          }
          .country-name{
            margin-top: .18rem;
            font-size: .3rem;
          }
        }
      }
    }
    .tab-view{
      flex: 1;
      position: relative;
      .tab-nav{
        padding-top: .31rem;
        background: #fff;
        z-index: 2;
        box-shadow: 2px 2px 10px #ddd;
        h4{
          padding-left: .25rem;
          // margin-bottom: .2rem;
          font-size: .32rem;
          // font-weight: 100;
        }
        .policy{
          li{
            float: left;
            box-sizing: border-box;
            padding: 0 0.18rem 2px;
            border-bottom: 3px solid transparent;
            line-height: .5rem;
            &.active{
              color: #6ba4ea;
              border-bottom: 3px solid #6ba4ea;
            }
          }
        }
      }
      .time-line-wrapper{
        padding: .2rem .25rem 0;
        position: absolute;
        // z-index: 1;
        top: 1.6rem;
        bottom: .8rem;
        left: 0;
        right: 0;
        .section{
          padding: 0;
          h4{
            line-height: 16px;
            span{
              display: inline-block;
              vertical-align: middle;
              position: relative;
              margin-right: 5px;
              width: 16px;
              height: 16px;

              border-radius: 50%;
              border: 1px solid #6ba4ea;
              b{
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                display: block;
                margin: auto;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: #6ba4ea;
              }
            }
          }
          article{
            margin: 0 8px;
            padding: 0 0.24rem;
            border-left: 1px solid #6ba4ea;
            &.last{
              border-left: 1px solid transparent;
            }
            section{
              padding: 0.11rem 0 0.59rem;
              p{
                line-height: .4rem;
                padding-left: .1rem;
              }
            }
          }
        }
      }
    }
  }
</style>
