<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  props: {
    click: {
      type: Boolean,
      default: true
    },
    shouldScrollEnd: {
      type: Boolean,
      default: true
    },
    isSnap: {
      type: Boolean,
      default: true
    },
    isScrollFullPage: {
      type: Boolean,
      default: false
    },
    isMomentum: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    setTimeout(() => {
      this._setQuetWidth()
      this._initSlider()
    }, 20)
  },
  methods: {
    reload () {
      this._setQuetWidth()
      this._initSlider()
    },
    _setQuetWidth () {
      let itemArr = this.$refs.sliderGroup.children
      let clientWidth = this.$refs.sliderGroup.clientWidth
      let width = 0
      Array.prototype.forEach.call(itemArr, (item) => {
        let _item = item
        _item.classList.add('item')
        if (this.isScrollFullPage) {
          _item.style.width = clientWidth + 'px'
          width += clientWidth
        } else {
          _item.style.width = _item.offsetWidth + 'px'
          width += _item.offsetWidth
        }
      })
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initSlider () {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: this.isMomentum,
        snap: this.isSnap,
        probeType: 2,
        click: this.click
      })
      if (this.shouldScrollEnd) {
        this.scrollEnd()
      }
    },
    scrollEnd () {
      let me = this
      this.slider.on('scrollEnd', () => {
        me.$emit('scrollEnd')
      })
    },
    prev () {
      this.slider && this.slider.prev()
    },
    next () {
      this.slider && this.slider.next()
    },
    refresh () {
      this.slider && this.slider.refresh()
    },
    getCurrentPage () {
      return this.slider && this.slider.getCurrentPage()
    },
    scrollTo (x = 0, y = 0, t = 20) {
      this.slider && this.slider.scrollTo(x, y, t)
    },
    scrollToElement (el, time = 20, offsetX = false, offsetY = false) {
      this.slider && this.slider.scrollTo(el, time, offsetX, offsetY)
    }
  }
}
</script>

<style lang="less">
.slider-group{
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  // display: flex;
}

</style>
