<template>
  <div class="lifeplan">
    <Bhead :titles="title"></Bhead>
    <div class="tab">
      <span v-for="(tabItem, index) in tabList" 
            @click.prevent="tab(index)" 
            :class="currentIndex === index ? 'active' : ''"
            :key="index">
        {{tabItem}}
      </span>
      <p class="slider-bar">
        <span class="slider" ref="slider">
          <b></b>
        </span>
      </p>
    </div>
    <transition name="fade">
      <Scroll class="lifeplan-content" :data="currentList" ref="scroll">
        <div class="lifeplan-text" v-if="currentIndex === 0">
          重疾险
          <p class="longtext">在医疗科技发展快速的今天，对危疾病人来说可算是一种福音，但康复期往往长以年计，为您及家人带来沉重的经济负担，而您时下的危疾保障却未必满足长远治疗的开支。</p>
          <p class="longtext">剑荣资产为您提供全周期、全方位保障服务，甄选保费低、费率低、分红高、理赔易的海外重大疾病保障产品，多倍保重大疾病保险产品计划涵盖包括恶性肿瘤、心肌梗塞、中风等各类常见多发病症共计150种，具体分为轻症疾病50种、重大疾病100种，几乎覆盖自然生命周期中可能发生的各种高发重疾与轻症，在重疾前、中、后，全周期地守护客户健康，为家庭提供全面保障，抵御人生风雨</p>
          <p class="longtext">产品亮点:</p>
          <ul class="text-highlights">
            <li>
              <span>1、保障疾病</span>
              <p>其中包含早期危疾和儿童危疾，受保疾病达到了100种，为您的健康全周期提供保障。</p>
            </li>
            <li>
              <span>2、保单储蓄功能</span>
              <p>储蓄价值更强，保单收益更高。</p>
            </li>
            <li>
              <span>3、三重癌症赔付</span>
              <p>无论是旧症还是新症，只要间隔3年以上都可以获得再次理赔。累计可以获得三次癌症赔付，总赔付额高达260%。而且发生第一次索赔之后保单若有未缴完的保费，即时获得豁免，但是保单继续有效，直至赔付满三次。</p>
            </li>
          </ul>
        </div>
        <div class="lifeplan-text" v-if="currentIndex === 1">
          年金险
          <p class="longtext">在医疗科技发展快速的今天，对危疾病人来说可算是一种福音，但康复期往往长以年计，为您及家人带来沉重的经济负担，而您时下的危疾保障却未必满足长远治疗的开支。</p>
          <p class="longtext">剑荣资产为您提供全周期、全方位保障服务，甄选保费低、费率低、分红高、理赔易的海外重大疾病保障产品，多倍保重大疾病保险产品计划涵盖包括恶性肿瘤、心肌梗塞、中风等各类常见多发病症共计150种，具体分为轻症疾病50种、重大疾病100种，几乎覆盖自然生命周期中可能发生的各种高发重疾与轻症，在重疾前、中、后，全周期地守护客户健康，为家庭提供全面保障，抵御人生风雨</p>
          <p class="longtext">产品亮点:</p>
          <ul class="text-highlights">
            <li>
              <span>1、保障疾病</span>
              <p>其中包含早期危疾和儿童危疾，受保疾病达到了100种，为您的健康全周期提供保障。</p>
            </li>
            <li>
              <span>2、保单储蓄功能</span>
              <p>储蓄价值更强，保单收益更高。</p>
            </li>
            <li>
              <span>3、三重癌症赔付</span>
              <p>无论是旧症还是新症，只要间隔3年以上都可以获得再次理赔。累计可以获得三次癌症赔付，总赔付额高达260%。而且发生第一次索赔之后保单若有未缴完的保费，即时获得豁免，但是保单继续有效，直至赔付满三次。</p>
            </li>
          </ul>
        </div>
        <div class="lifeplan-text" v-if="currentIndex === 2">
          长期储蓄
          <p class="longtext">在医疗科技发展快速的今天，对危疾病人来说可算是一种福音，但康复期往往长以年计，为您及家人带来沉重的经济负担，而您时下的危疾保障却未必满足长远治疗的开支。</p>
          <p class="longtext">剑荣资产为您提供全周期、全方位保障服务，甄选保费低、费率低、分红高、理赔易的海外重大疾病保障产品，多倍保重大疾病保险产品计划涵盖包括恶性肿瘤、心肌梗塞、中风等各类常见多发病症共计150种，具体分为轻症疾病50种、重大疾病100种，几乎覆盖自然生命周期中可能发生的各种高发重疾与轻症，在重疾前、中、后，全周期地守护客户健康，为家庭提供全面保障，抵御人生风雨</p>
          <p class="longtext">产品亮点:</p>
          <ul class="text-highlights">
            <li>
              <span>1、保障疾病</span>
              <p>其中包含早期危疾和儿童危疾，受保疾病达到了100种，为您的健康全周期提供保障。</p>
            </li>
            <li>
              <span>2、保单储蓄功能</span>
              <p>储蓄价值更强，保单收益更高。</p>
            </li>
            <li>
              <span>3、三重癌症赔付</span>
              <p>无论是旧症还是新症，只要间隔3年以上都可以获得再次理赔。累计可以获得三次癌症赔付，总赔付额高达260%。而且发生第一次索赔之后保单若有未缴完的保费，即时获得豁免，但是保单继续有效，直至赔付满三次。</p>
            </li>
          </ul>
        </div>
        <div class="lifeplan-text" v-if="currentIndex === 3">
          万用寿险
          <p class="longtext">在医疗科技发展快速的今天，对危疾病人来说可算是一种福音，但康复期往往长以年计，为您及家人带来沉重的经济负担，而您时下的危疾保障却未必满足长远治疗的开支。</p>
          <p class="longtext">剑荣资产为您提供全周期、全方位保障服务，甄选保费低、费率低、分红高、理赔易的海外重大疾病保障产品，多倍保重大疾病保险产品计划涵盖包括恶性肿瘤、心肌梗塞、中风等各类常见多发病症共计150种，具体分为轻症疾病50种、重大疾病100种，几乎覆盖自然生命周期中可能发生的各种高发重疾与轻症，在重疾前、中、后，全周期地守护客户健康，为家庭提供全面保障，抵御人生风雨</p>
          <p class="longtext">产品亮点:</p>
          <ul class="text-highlights">
            <li>
              <span>1、保障疾病</span>
              <p>其中包含早期危疾和儿童危疾，受保疾病达到了100种，为您的健康全周期提供保障。</p>
            </li>
            <li>
              <span>2、保单储蓄功能</span>
              <p>储蓄价值更强，保单收益更高。</p>
            </li>
            <li>
              <span>3、三重癌症赔付</span>
              <p>无论是旧症还是新症，只要间隔3年以上都可以获得再次理赔。累计可以获得三次癌症赔付，总赔付额高达260%。而且发生第一次索赔之后保单若有未缴完的保费，即时获得豁免，但是保单继续有效，直至赔付满三次。</p>
            </li>
          </ul>
        </div>
      </Scroll>
    </transition>
    <DetaiFooter :focusShow="false" @getInfo="getInfo"></DetaiFooter>
    <Alert v-model="alertShow" :title="alertTitle" :content="alertContent"></Alert>
  </div>
</template>

<script>
import Bhead from 'base/head/head'
import Scroll from 'base/scroll/scroll'
import DetaiFooter from 'components/detail-footer/detail-footer'
import { checkLogin } from '../../mixins/check-login'
import { Alert } from 'vux'
import { RESULT_CODE } from 'assets/js/utils'
import { PlanningConsultation } from 'api/global/api-global.js'
// import Alert from 'base/alert/alert'

export default{
  mixins: [checkLogin],
  data () {
    return {
      title: '生命保障规划',
      tabList: ['重疾险', '年金险', '长期储蓄', '万用寿险'],
      alertTitle: '',
      alertContent: '',
      currentIndex: 0,
      alertShow: false,
      currentList: []
    }
  },
  methods: {
    tab (index) {
      this.currentIndex = index
      this.$refs.scroll.refresh()
      // sliderbar 滑动距离
      this.$refs.slider.style.transform = `translate3D(${window.innerWidth / 4 * index}px, 0, 0)`
    },
    getDetail () {
      this.$router.push({
        path: '/global/detail'
      })
    },
    getInfo () {
      if (!this.checkLogin()) {
        return
      }
      PlanningConsultation(5).then((res) => {
        if (res.resultCode === RESULT_CODE) {
          this.alertShow = true
          if (res.result.status === 1) {
            this.alertTitle = '您已提交成功'
            this.alertContent = '请耐心等待理财师与您联系'
          } else {
            this.alertTitle = '提交成功'
            this.alertContent = '我们的理财师会尽快与您沟通'
          }
        }
      })
    }
  },
  components: {
    Bhead,
    Scroll,
    DetaiFooter,
    Alert
  }
}
</script>

<style lang="less">

  .lifeplan {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    background: #fff;
    .tab{
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 0.76rem;
      text-align: center;
      font-size: 0.28rem;
      color: #828282;
      background-color: #fff;
      &.tab:before{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background: #e9e9e9;
        transform: scaleY(.5);
      }
      &.tab:after{
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background: #e9e9e9;
        transform: scaleY(.5);
      }
      &.active{
        color: #333;
      }
      .slider-bar{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 4px;
        .slider{
          display: block;
          width: 25%;
          height: 100%;
          transition: all .3s ease;
          b{
            display: block;
            margin: auto;
            width: 50%;
            height: 100%;
            background-color: #6ba4ea;
          }
        }
      }
      span{
        flex: 1;
        &.active{
          color: #6ba4ea;
        }
      }
    }
    .lifeplan-content,
    .global-content{
      position: absolute;
      top: 1.64rem;
      bottom: 0.8rem;
      left: 0;
      right: 0;
      .lifeplan-text{
        padding: .5rem 0.24rem;
        .longtext{
          padding-top:.4rem;
        }
        .text-highlights{
          margin-bottom:.4rem;
        }
      }
      .country-section,
      .selection-section,
      .setting-section{
        margin-top: 0.34rem;
        h4{
          display: flex;
          font-size: 0.32rem;
          font-weight: 100;
          span{
            flex: 1;
          }
          i{
            font-size: 0.24rem;
            color: #999;
          }
        }
        .country-list{
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          display: flex;
          .country-item{
            margin-top: 0.28rem;
            flex: 0 0 25%;
            // display: inline;
            width: 25%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .country-flag{
              height: 0.88rem;
              border-radius: 50%;
              background: pink;
              overflow: hidden;
            }
            .country-name{
              margin-top: 0.3rem;
              font-size: 0.3rem;
              line-height: 0.3rem;
            }
          }
        }
      }
      .setting{
        padding: 0 0.24rem;
        .router-nav{
          padding-top: 0.3rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .nav-button{
            flex: 0 0 1.37rem;
            width: 1.37rem;
            height: 0.53rem;
            font-size: 0.22rem;
            text-align: center;
            line-height: 0.53rem;
            // padding: 0.25rem 0.17rem;
            border-radius: 23px;
            color: #6ba4ea;
            border: 1px solid #6ba4ea;
          }
        }
      }
      .hotspot{
        padding: 0 0.3rem;
        li{
          padding: 0.24rem 0 0.2rem 0;
          .hotspot-img{
            overflow: hidden;
            height: 3.6rem;
            img{
              width: 100%;
            }
          }
          .hotspot-toolbar{
            display: flex;
            align-items: center;
            margin-top: 0.18rem;
            .hotspot-intro{
              flex: 1;
              font-size: 0.28rem;
            }
            .onfocus{
              flex: 0 0 0.82rem;
              margin-left: 0.25rem;
              padding: 0.1rem 0.1rem;
              color: #5aa5f0;
              font-size: 0.2rem;
              text-align: center;
              line-height: 0.4rem;
              border-radius: 5px;
              border: 1px solid #eee;
            }
          }
          &.border-1px-b{
            position: relative;
            &:after{
              content: "";
              position: absolute;
              bottom: 0;
              width: 100%;
              height: 1px;
              background-color: #e9e9e9;
            }
          }

        }
      }
    }
    .global-slide-enter-active, .global-slide-leave-active{
      transition: all 0.5s ease;
    }
    .global-slide-enter, .global-slide-leave-active{
      transform: translate3d(100%, 0, 0);
    }
  }
</style>
