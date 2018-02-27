<template>
  <div class="focus-view">
    <Bhead :titles="title"></Bhead>
    <div class="tab">
      <span @click="getEnjoyList" :class="{'active' : tabIndex === 0}">乐享生活({{enjoyDataCount}})</span>
      <span @click="getGlobalList" :class="{'active' : tabIndex === 1}">全球资产配置({{globalDataCount}})</span>
      <p class="slider-bar">
        <span class="slider" ref="slider">
          <b></b>
        </span>
      </p>
    </div>
    <ListView class="focus-list" :data="currentData" ref="focuslist" @select="select"></ListView>
  </div>
</template>

<script>
import Bhead from 'base/head/head'
import ListView from 'base/list-view/listview'
import { findMyAttentionInfos } from 'api/mine/api-mine'
import { RESULT_CODE } from 'assets/js/utils'

export default {
  data () {
    return {
      title: '我的关注',
      currentData: [],
      enjoyData: [],
      enjoyDataCount: 0,
      globalData: [],
      globalDataCount: 0,
      tabIndex: 0
    }
  },
  created () {
    this.getFocusInfos(2, 1)
  },
  methods: {
    getFocusInfos (n, m) {
      findMyAttentionInfos(n, m).then((res) => {
        // console.log(res)
        if (res.resultCode === RESULT_CODE) {
          let result = res.result
          this.listTypeId = result.listTypeId
          // 资产配置
          if (result.listTypeId === '1') {
            let attentionList = result.attentionList.map((item) => {
              item.createTime = item.createTime.split(' ')[0]
              return item
            })
            this.globalData = this.currentData = attentionList
            this.globalDataCount = result.listCount
            this.enjoyDataCount = result.otherCount
          // 乐享生活
          } else if (result.listTypeId === '2') {
            console.log(res)
            let attentionList = result.attentionList.map((item) => {
              item.endTime = item.endTime.split(' ')[0]
              item.startTime = item.startTime.split(' ')[0]
              return item
            })
            this.enjoyData = this.currentData = attentionList
            this.enjoyDataCount = result.listCount
            this.globalDataCount = result.otherCount
          }
        }
      })
    },
    getGlobalList (e) {
      this.tab(e)
      this.getFocusInfos(1, 2)
    },
    getEnjoyList (e) {
      this.tab(e)
      this.getFocusInfos(2, 1)
    },
    tab (e) {
      let element = e.target
      let index = [].indexOf.call(element.parentNode.children, element)

      this.tabIndex = index

      // sliderbar 滑动距离
      this.$refs.slider.style.transform = `translate3D(${window.innerWidth / 2 * index}px, 0, 0)`
    },
    select (id, status) {
      if (status === 2) {
        this.$vux.toast.show({
          text: '该活动已下架',
          width: '9em',
          type: 'cancel'
        })
        return
      }
      // 资产配置
      if (this.listTypeId === '1') {
        this.$router.push({
          path: `/global/detail?id=${id}`
        })
      // 乐享生活
      } else if (this.listTypeId === '2') {
        this.$router.push({
          path: `/enjoy/enjoydetail?id=${id}`
        })
      }
    }
  },
  components: {
    Bhead,
    ListView
  }
}
</script>

<style lang="less">
.focus-view{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #fff;
  z-index: 2;
  .tab{
    position: relative;
    z-index: 1;
    display: flex;
    height: 0.76rem;
    line-height: 0.76rem;
    text-align: center;
    font-size: 0.34rem;
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
    .slider-bar{
      position: absolute;
      bottom: 1px;
      width: 100%;
      height: 4px;
      .slider{
        display: block;
        width: 50%;
        height: 100%;
        transition: all .3s ease;
        b{
          display: block;
          margin: auto;
          width: 60%;
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
  .focus-list{
    position: absolute;
    top: 1.63rem;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
