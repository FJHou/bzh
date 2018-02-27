<template>
  <div class="default-page">
    <Bhead :titles="pagetitle">
      <div slot="left" class="back" @click.stop="backEvent">
        <i class="fonticon icon-chevron-left"></i>
      </div>
      <div slot="right" @click.stop="confirm">
        <span class="confirm">确定</span>
      </div>
    </Bhead>
    <div class="content border-1px-t border-1px-b">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import Bhead from 'base/head/head'
export default {
  props: {
    pagetitle: {
      type: String,
      default: ''
    }
  },
  methods: {
    backEvent () {
      this.$emit('returnBack')
    },
    confirm () {
      this.$emit('pageConfirm')
    }
  },
  components: {
    Bhead
  }
}
</script>

<style lang="less">
  @import '../../assets/css/variable.less';

  .default-page{
    position: fixed;
    z-index: 3;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    background: #fff;
    .content{

    }
    .back{
      position: absolute;
      left: 0;
      top: 0;
      padding: 0 0.3rem;
      .icon-chevron-left{
        font-size: 0.32rem;
      }
    }
    .confirm{
      position: absolute;
      right: 0;
      top: 0;
      padding: 0 0.3rem;
    }
  }
</style>
