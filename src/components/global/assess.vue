<template>
  <div class="assess">
    <Bhead :titles="title"></Bhead>
    <Slider class="question-slider" 
            :click="true" 
            :isScrollFullPage="true" 
            @scrollEnd="scrollEnd">
      <div v-for="(question, index) in questions" class="question-wrapper" :key="index">
        <h3 class="question-count">共<span>{{index + 1}}/</span>{{questions.length}}道题</h3>
        <p class="question"><i>{{index + 1}}</i>{{question.question}}<span v-if="question.des">({{question.des}})</span></p>
        <p class="desc"><span v-if="question.des2">{{question.des2}}</span></p>
        <Checklist class="check-list"
                   :max="1"
                   :options="question.answers"
                   @on-change="checkListChange"
                   v-model="anwser[index]"
                   ref="checklist">
        </Checklist>
        <!-- <Checklist class="check-list"
                    :max="1"
                    :options="['测试点击1', '测试点击2', '测试点击3', '测试点击4']"
                    v-model="testCheck"
                    ref="check">
        </Checklist> -->
      </div>
    </Slider>
    <p class="arrow-signal" v-if="hideArrowSignal">
      <i class="fonticon icon-arrow-back"></i>滑动答题
    </p>
    <transition name="fold">
      <div class="start-section" v-show="showStartSection">
        <img src="../../assets/img/assess_start_bg.png">
        <p class="assess-count">伯仲会已为<span> {{assessCount}} </span>用户免费评估</p>
        <div class="start-assess">
          <span @click="showStartSection = false">开始评估</span>
        </div>
      </div>
    </transition>
    <transition name="assess-slide">
      <FillAssess v-show="fillAssessShow" @getResult="confirmAssess"></FillAssess>
    </transition>
    <transition name="result-slide">
      <Result v-show="resultShow" :state="assessResult"></Result>
    </transition>

  </div>
</template>

<script>
import Bhead from 'base/head/head'
import Slider from 'base/slider/slider'
import FillAssess from 'components/global/fill-assess'
import Result from 'components/global/result'
import { checkLogin } from '@/mixins/check-login'
import { Checklist } from 'vux'
import { questions } from './questionList.js'
import { onlineAssessment } from 'api/global/api-global'
import { RESULT_CODE } from 'assets/js/utils'

export default {
  data () {
    return {
      testCheck: [],
      title: '在线评估',
      assessCount: 0,
      hideArrowSignal: true,
      showStartSection: true,
      questions: questions,
      fillAssessShow: false,
      resultShow: false,
      assessResult: '',
      anwser: [],
      count: 0,
      isSetAnswers: true
    }
  },
  mixins: [checkLogin],
  created () {
    this.assessCount = this.$route.query.count
  },
  methods: {
    scrollEnd () {
      this.hideArrowSignal = false
    },
    checkListChange () {
      this.fillAssessShow = this.anwser.every((item) => {
        return item.length === 1
      })
    },
    confirmAssess (...text) {
      let answers = this.anwser.map((i) => {
        return i[0]
      }).join(',')

      let obj = {
        answers: answers,
        sex: text[1],
        userName: text[0],
        mobile: text[2]
      }
      if (obj.userName === '') {
        this.$vux.toast.show({
          text: '用户名不能为空',
          width: '9em',
          type: 'cancel'
        })
        return
      }
      if (obj.mobile === '') {
        this.$vux.toast.show({
          text: '手机号不能为空',
          width: '9em',
          type: 'cancel'
        })
        return
      }

      if (!this.checkLogin()) {
        return
      }

      this._onlineAssessment(obj)
    },
    _onlineAssessment (obj) {
      onlineAssessment(obj).then((res) => {
        if (res.resultCode === RESULT_CODE) {
          this.resultShow = true
          this.assessResult = res.result
        } else {
          this.$vux.toast.show({
            text: res.msg,
            width: '9em',
            type: 'cancel'
          })
        }
      })
    }
  },
  components: {
    Bhead,
    Slider,
    Checklist,
    Result,
    FillAssess
  }
}
</script>

<style lang="less">
  .assess{
    position: fixed;
    z-index: 2;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
    overflow: hidden;
    .arrow-signal{
      width: 30%;
      text-align: center;
      position: fixed;
      bottom: 10%;
      left: 0;
      right: 0;
      margin: auto;
      overflow: hidden;
      color: #6ba4ea;
      // color: rgba(255, 255, 255, .9);
      // animation: move 1.5s linear infinite alternate;
      // background: #ccc;
      &:after{
        content: '';
        position: absolute;
        z-index: -1;
        width: 30px;
        height: 100%;
        left: 100%;
        top: 0;
        border-radius: 40%;
        background: #f1f1f1;
        animation: shadowMove 2s linear infinite;
      }
      // @keyframes move{
      //   from{
      //     color: #fff
      //   }
      //   to{
      //     color: #6ba4ea;
      //   }
      // }
      @keyframes shadowMove{
        from{
          left: 100%;
        }
        to{
          left: -30%;
        }
      }
    }
    .question-slider{
      position: absolute;
      top: .88rem;
      left: 0;
      right: 0;
      bottom: 0;
      .question-wrapper{
        box-sizing: border-box;
        padding: 0 0.26rem;
        float: left;
      }
      .question-count{
        margin: 0.35rem 0 0.43rem;
        text-align: center;
        font-size: 0.34rem;
        color: #9e9e9e;
        span{
          display: inline-block;
          color: #6ba4ea;
        }
      }
      .desc{
        margin: 0.2rem 0;
        min-height: 0.19rem;
        font-size: 0.22rem;
        text-align: center;
        color: #999;
      }
      .question{
        width: 100%;
        height: 1.1rem;
        line-height: 1.1rem;
        border: 1px solid #6ba4ea;
        font-size: 0.34rem;
        border-radius: 5px;
        color: #6ba4ea;
        i{
          margin: 0 0.25rem;
          display: inline-block;
          width: 0.38rem;
          height: 0.38rem;
          line-height: .38rem;
          text-align: center;
          border-radius: 50%;
          background: #6ba4ea;
          color: #fff;
          font-size: 0.24rem;
        }
        span{
          margin-left: 0.2rem;
          font-size: 0.24rem;
          color: #999;
        }
      }
      .check-list{
        .weui-cells_checkbox,
        .weui-cell{
          font-size: 0.3rem;
          &:before{
            display: none;
          }
          &:after{
            display: none;
          }
          .vux-checklist-icon-checked{
            margin-top: -3px;
            &:before{
              color: #6ba4ea;
              font-size: 20px;
            }
          }
        }
      }
    }
    .start-section{
      position: absolute;
      top: .88rem;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 3;
      text-align: center;
      background: #fff;
      &.fold-enter-active, &.fold-leave-active {
        transition: all .8s ease;
      }
      &.fold-enter, &.fold-leave-active {
        opacity: 0;
        transform: translate3d(0, 100%, 0);
      }
      img{
        width: 100%;
      }
      .assess-count{
        margin-top: 0.62rem;
        font-size: .3rem;
        span{
          font-size: .36rem;
          color: #6ba4ea;
        }
      }
      .start-assess{
        margin-top: 0.7rem;
        span{
          margin: auto;
          display: block;
          width: 3.45rem;
          height: 0.57rem;
          line-height: 0.57rem;
          border-radius: 5px;
          border: 1px solid #6ba4ea;
          color: #6ba4ea;
        }
      }
    }
    .assess-slide-enter-active, .assess-slide-leave-active {
      transition: all .8s ease;
    }
    .assess-slide-enter, .assess-slide-leave-active {
      transform: translate3d(100%, 0, 0);
    }

    .result-slide-enter-active, .result-slide-leave-active {
      transition: all .8s ease;
    }
    .result-slide-enter, .result-slide-leave-active {
      transform: translate3d(100%, 0, 0);
    }
  }

</style>
