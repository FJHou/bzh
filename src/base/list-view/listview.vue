<template>
  <Scroll ref="listScroll" :data="data">
    <ul class="list-wrapper">
      <li class="list-item border-1px-b"
          v-for="(item, index) in data"
          :class="{'ended' : item.status === 2}"
          :key="index"
          @click="selected(item.code, item.status)">
        <div class="left-part">
          <img :src="item.imgUrl">
        </div>
        <div class="right-part">
          <p class="name">{{item.name}}</p>
          <p class="time" v-if="item.startDate">活动日期<time>{{item.startTime}} - {{item.endTime}}</time></p>
          <p class="time" v-else>活动日期<time>{{item.createTime}}</time></p>
        </div>
      </li>
      <p v-if="data.length === 0" class="no-more">没有更多了~</p>
    </ul>
    <!-- <p v-for="item in test">{{item.name}}</p> -->
  </Scroll>

</template>

<script>
import Scroll from 'base/scroll/scroll'

export default {
  data () {
    return {
      test: [
        {name: '1'},
        {name: '2'},
        {name: '3'}
      ]
    }
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  methods: {
    selected (code, status) {
      this.$emit('select', code, status)
    }
  },
  components: {
    Scroll
  }
}
</script>

<style lang="less">
  @import '../../assets/css/variable.less';

  .list-wrapper{
    .no-more{
      margin-top: 1rem;
      color: #ccc;
      text-align: center;
    }
    .list-item{
      display: flex;
      padding: 0.22rem 0.28rem;
      position: relative;
      .left-part{
        display: flex;
        align-items: center;
        flex: 0 0 1.44rem;
        width: 1.44rem;
        height: 1.44rem;
        overflow: hidden;
        img{
          width: 100%;
        }
      }
      .right-part{
        flex: 1;
        position: relative;
        padding-left: 0.2rem;
        .name{
          padding-top: 0.08rem;
          font-size: 0.3rem;
        }
        .time{
          position: absolute;
          width: 100%;
          bottom: 0;
          font-size: 0.24rem;
          line-height: 0.3rem;
          color: #828282;
          time{
            padding-left: 0.15rem;
          }
        }
      }
      &.ended{
        background-color: #f6f6f6;
        color: #828282;
        &:before{
          content: '';
          z-index: 1;
          position: absolute;
          right: .35rem;
          bottom: .23rem;
          width: 1rem;
          height: .69rem;
          background: #f6f6f6 url('../../assets/img/ended.png') center/100% no-repeat;
        }
      }
    }
  }
</style>
