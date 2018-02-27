<template>
  <div class="g-checklist">
    <div class="checklist-wrapper" v-for="(option, index) in options">
      <label class="select-area" :for="index">
        <span class="select-circle"></span>
        <p class="select-text">{{option.value}}</p>
      </label>
      <input type="checkbox" :id="index" v-model="checkboxValue" style="display: none" :value="option.value">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checkboxValue: []
    }
  },
  props: {
    max: {
      type: Number,
      default: 1
    },
    options: {
      type: Array,
      require: true,
      default: []
    }
  },
  methods: {
    selectedItem (e) {
      console.log(e)
    }
  },
  watch: {
    checkboxValue (newVal) {
      console.log(newVal)
    }
  }
}
</script>

<style lang="less">
  .g-checklist{
    margin-top: 0.65rem;
    padding-left: 0.14rem;
    .checklist-wrapper{
      // margin-top: 0.6rem;

      .select-area{
        position: relative;
        display: flex;
        padding: .3rem 0;
        z-index: 1;
        .select-circle{
          position: relative;
          flex: 0 0 0.38rem;
          width: 0.38rem;
          height: 0.38rem;
          border: 1px solid #6ba4ea;
          border-radius: 50%;
          z-index: -1;
        }
        .select-text{
          position: relative;
          margin-left: .26rem;
          z-index: -1;
        }
      }
    }
  }
</style>
