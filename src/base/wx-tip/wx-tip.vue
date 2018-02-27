<!--  -->
<template>
  <div class="wx-tip">
    <div class="arrow">
      <img src="../../assets/img/weixin-tip.png" alt="">
    </div>
    <p class="tip-text">点击右上角</p>
    <p class="tip-text">选择在浏览器里打开</p>
    <p class="close" @click="close"><i class="fonticon icon-close"></i></p>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    close () {
      this.$emit('closeTip')
    }
  }
}
</script>

<style lang='less' scoped>
  .wx-tip{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 5;
    .arrow {
      text-align: right;
      img{
        margin-top: 10px;
        margin-right: 20px;
      }
    }
    .tip-text {
      color: #fff;
      text-align: center;
      &:first-child {
        margin-top: 50%;
      }
    }
    .close{
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;
      .icon-close{
        font-size: 1rem;
        color: #fff;
      }
    }
  }
</style>