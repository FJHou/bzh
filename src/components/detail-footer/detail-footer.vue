<template>
  <div class="detail-footer">
    <div class="more-info" @click="moreInfo">
      了解项目更多信息
    </div>
    <div class="add-focus" @click="addFocus" v-if="focusShow">
      <span v-if="isFocus">已关注</span>
      <span v-else><i class="fonticon icon-plus-empty">关注</i></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isFocus: {
      type: Boolean,
      default: false
    },
    focusShow: {
      type: Boolean,
      default: true
    }
  },
  computed: {

  },
  methods: {
    addFocus () {
      this.$emit('focus')
    },
    moreInfo () {
      this.$emit('getInfo')
    }
  }
}
</script>

<style lang="less">
  .detail-footer{
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    font-size: 0.3rem;
    width: 100%;
    .more-info{
      flex: 1;
      color: #fff;
      background-color: #6ba4ea;
    }
    .add-focus{
      flex: 0 0 2.1rem;
      width: 2.1rem;
      color: #6ba4ea;
      background: #fff;
      span{
        display: block;
      }
      .icon-plus-empty{
        line-height: 0.3rem;
        font-size: 0.3rem;
      }
    }
  }
</style>
