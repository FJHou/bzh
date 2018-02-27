<template>
  <div class="booking-view">
    <Bhead :titles="title" class="booking-title"></Bhead>
    <ListView :data="data" class="booking-list" @select="select" ></ListView>
  </div>
</template>

<script>
import Bhead from 'base/head/head'
import ListView from 'base/list-view/listview'
import { findMyBespeakInfos } from 'api/mine/api-mine'
import { RESULT_CODE } from 'assets/js/utils'

export default {
  data () {
    return {
      title: '我的预约',
      enjoyDataCount: 0,
      data: []
    }
  },
  created () {
    this.findMyBespeakInfos()
  },
  methods: {
    select (code, status) {
      if (status === 2) {
        this.$vux.toast.show({
          text: '该活动已下架',
          width: '9em',
          type: 'cancel'
        })
        return
      }
      this.$router.push({
        path: `/enjoy/enjoydetail?id=${code}`
      })
    },
    findMyBespeakInfos () {
      findMyBespeakInfos(2, 1).then((res) => {
        if (res.resultCode === RESULT_CODE) {
          let bespeakList = res.result.bespeakList.map((item) => {
            item.endTime = item.endTime.split(' ')[0]
            item.startTime = item.startTime.split(' ')[0]
            return item
          })
          this.enjoyDataCount = res.result.listCount

          this.data = bespeakList
        }
      })
    }
  },
  components: {
    Bhead,
    ListView
  }
}
</script>

<style lang="less">
.booking-view{
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
    align-items: center;
    justify-content: left;
    height: 0.76rem;
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
      bottom: 0;
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
      flex: 0 0 50%;
      &.active{
        color: #6ba4ea;
      }
    }
  }
  .booking-list {
    position: absolute;
    top:.88rem;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
