<template>
  <div class="e-head" :class="isTransparent ? 'transparent' : ''" :style="getBgClr" >
    <slot name="left">
      <div class="left-slot" @click="back"><i class="fonticon icon-chevron-left"></i></div>
    </slot>
    <h1 class="titles"><span class="title-text">{{titles}}</span></h1>
    <slot name="right"></slot>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  props: {
    isTransparent: {
      type: Boolean,
      default: false
    },
    styles: {
      type: String,
      default: ''
    },
    titles: {
      type: String,
      default: ''
    },
    borderShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    back () {
      this.$emit('leave')
      this.$router.back()
    }
  },
  computed: {
    getBgClr () {
      return this.styles ? this.styles : ''
    }
  },
  mounted () {
     // console.log(this)
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/variable.less';

.e-head{
  position: relative;
  display: flex;
  z-index: 2;
  font-size: 0.34rem;
  height: 0.88rem;
  line-height: 0.88rem;
  text-align: center;
  color: #333;
  background-color: #fff;
  .titles {
    flex: 1;
    overflow: hidden;
    // font-weight: 100;
    .title-text{
      margin: auto;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 70%;
    }
  }
  .left-slot{
    position: absolute;
    left: 0;
    top: 0;
    padding-left: 0.3rem;
    // padding-right: 0.1rem;
    width: 0.5rem;
    height: 100%;
    flex: 0 0 0.5rem;
    .icon-chevron-left{
      font-size: 0.32rem;
    }
  }
  .right-slot{
    position: absolute;
    right: 0;
    top: 0;
    padding-right: 0.3rem;
    min-width: 0.5rem;
    height: 100%;
    flex: 0 0 0.5rem;
  }
}
.transparent{
  background-color: transparent;
}
</style>
