<!--  -->
<template>
  <div class="report-view">
  <Bhead :titles="title"></Bhead>
  <!-- <div class="rep-tipbox">
    <span><i>!</i><b>请在浏览器内打开下载</b></span>
  </div> -->
  <p v-if="reportList.length === 0" class="no-reports">暂无资产报告</p>
  <dl v-for="(report, index) in reportList" :key="index" v-else>
    <dt class="year-tit">
      <span><b></b></span>
      <i class="ye-text">{{report.groupYear}}</i>
    </dt>
    <dd>
      <ul class="report-list">
        <li class="report-item"
            v-for="(item, index) in report.reports" 
            :key="index"
            @click="downloadReport(item.url)">
            <!-- <p v-for="item in report">{{item.name}}</p> -->
            <a>{{item.name}}</a>
        </li>
        <!-- <li class="report-item">暂无资产报告</li> -->
      </ul>
    </dd>
  </dl>
  <Wxtip v-show="showWxTip" @closeTip="closeWxTip"></Wxtip>
  </div>
</template>

<script>
import Bhead from 'base/head/head'
import Wxtip from 'base/wx-tip/wx-tip'
import { checkLogin } from '@/mixins/check-login'
import { findAssetsReportsGroupYears } from 'api/global/api-global.js'
import { RESULT_CODE, isAndroid } from 'assets/js/utils'

export default {
  data () {
    return {
      title: '资产配置详情', // header 的标题
      reportList: [],
      showWxTip: false
    }
  },

  mixins: [checkLogin],

  created () {
    this._findAssetsReportsGroupYears()
  },

  methods: {
    closeWxTip () {
      this.showWxTip = false
    },

    downloadReport (url) {
      if (!this.checkLogin()) {
        return
      }

      if (isAndroid()) {
        this.showWxTip = true
      } else {
        window.location.href = url
      }
    },

    _findAssetsReportsGroupYears () {
      findAssetsReportsGroupYears().then((res) => {
        if (res.resultCode === RESULT_CODE) {
          console.log(res)
          this.reportList = res.result
        }
      })
    }
  },
  components: {
    Bhead,
    Wxtip
  }
}
</script>

<style lang='less' scoped>
  .report-view{
    position: fixed;
    z-index: 2;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fbf9fe;
    overflow: hidden;
    .rep-tipbox{
      text-align: center;
      margin-bottom: .26rem;
      i{
        display: inline-block;
        width: .28rem;
        height: .28rem;
        background: #ffd387;
        border-radius: 50%;
        vertical-align: middle;
        font-size: 10px;
        line-height: 14px;
        text-align: center;
        color: #fff;
        margin-right: .14rem;
      }
      b{
        font-weight:normal;
        vertical-align: middle;
        color: #999;
        font-size: .26rem;
      }
    }
    .e-head{
      margin-bottom: .25rem;
    }
    dl{
      padding: 0 0.3rem;
      margin-top: -.1rem;
      dd{
        margin-left: .13rem;
        border-left: .06rem solid #6ba4ea;
        padding: 0.4rem 0;
        margin-top: -0.08rem;
      }
    }
    .year-tit{
      line-height: 1.6;
      .ye-text{
        display: inline-block;
        padding: 0 0.3rem;
        font-size: .3rem;
        background: #6ba4ea;
        color: #fff;
        border-radius: 17px;
        vertical-align: middle;
      }
      span{
        display: inline-block;
        vertical-align: middle;
        position: relative;
        margin-right: 5px;
        width: .3rem;
        height: .3rem;
        border-radius: 50%;
        border: 1px solid #6ba4ea;
        background: #6ba4ea;
        b{
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          display: block;
          margin: auto;
          width: .14rem;
          height: .14rem;
          border-radius: 50%;
          background: #fff;
        }
      }
    }
    .report-list{
      padding-left: .4rem;
      li{
        line-height: 1.8;
      }
      .report-item{
        padding: 3px 0;
        a{
          display: block;
          font-size: .30rem;
          color: #333;
        }
      }
    }
    .no-reports{
      margin: 30% auto;
      text-align: center;
      color: #ccc;
    }
  }
</style>