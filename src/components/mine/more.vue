<template>
  <div class="more-view">
    <Bhead :titles="title" @leave="leave">
      <div slot="right" class="right-slot" @click="saveInfo">
        保存
      </div>
    </Bhead>
    <Group class="cell-group" gutter="0">
      <PopupPicker :data="educationModel"
                     title = "学历"
                     v-model="education"
                     :show="showEduPopup"
                     :confirm-text="'确定'"
                     @on-hide="showEduPopup = false"
                     class="edu-popup cell"
                     show-name>
      </PopupPicker>
      <PopupPicker :data="industryModel"
                     title = "行业"
                     v-model="industry"
                     :show="industryPopupShow"
                     :confirm-text="'确定'"
                     @on-hide="industryPopupShow = false"
                     class="indu-popup cell"
                     show-name>
      </PopupPicker>
      <Cell title="年收入" value="人民币 单位万" class="cell cell-range">
        <p slot="child" class="range">
          <input type="tel" name="min" v-model="minRange" class="min" maxlength="5">
          <span>-</span>
          <input type="tel" name="max" v-model="maxRange" class="max" maxlength="5">
          <span></span>
        </p>
      </Cell>

    </Group>
  </div>
</template>

<script>
import Bhead from 'base/head/head'
import { Cell, Group, XInput, PopupPicker } from 'vux'
import { educationModel, industryModel } from './mineDataModel'
import { updateUserMoreInfo } from 'api/mine/api-mine'
import { RESULT_CODE } from 'assets/js/utils'

export default {
  name: 'more',
  data () {
    return {
      title: '更多',
      education: [''],
      industry: [''],
      edu: '本科',
      trade: 'IT',
      minRange: '',
      maxRange: '',
      educationModel: educationModel,
      industryModel: industryModel,
      industryPopupShow: false,
      showEduPopup: false
    }
  },
  created () {
    this.getQueryString()
  },
  methods: {
    leave () {
      this.getQueryString()
    },
    getQueryString () {
      let params = this.$route.query
      this.minRange = params.minIncome
      this.maxRange = params.maxIncome
      this.education = [params.education]
      this.industry = [params.industry]
    },
    saveInfo () {
      if (!this._isParamsCorrect()) {
        return
      }

      let obj = {
        education: this.education.toString(),
        industry: this.industry.toString(),
        maxIncome: this.maxRange,
        minIncome: this.minRange
      }

      updateUserMoreInfo(obj).then((res) => {
        if (res.resultCode === RESULT_CODE) {
          this.$router.back()
        }
      })
    },
    // 判断参数是否正确
    _isParamsCorrect () {
      if (isNaN(+this.minRange) || isNaN(+this.maxRange)) {
        this.$vux.toast.show({
          text: '请输入数字',
          position: 'middle',
          type: 'cancel'
        })
        return false
      }

      if (+this.minRange > +this.maxRange) {
        this.$vux.toast.show({
          text: '最大收入必须大于最小收入',
          position: 'middle',
          type: 'cancel',
          width: '9em'
        })
        return false
      }

      return true
    }
  },
  components: {
    Bhead,
    Cell,
    Group,
    XInput,
    PopupPicker
  }
}
</script>

<style lang="less">
.more-view{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #fff;
  z-index: 2;
  .vux-popup-picker-select {
    text-align: center !important;
  }
  .cell{
    padding: .26rem .3rem;
    font-size: .3rem;
    .weui-cell_access {
      padding: 0;
    }
    .weui-cell__ft{
      color: #333;
    }
    .cell-text{
      position: absolute;
      left: 50%;
      transform: translate3D(-50%, 0, 0);
    }
    &:before{
      left: 0;
    }
  }
  .cell-range{
    padding: .5rem .3rem;
    .range{
      padding: 0 0.3rem;
      position: absolute;
      left: 50%;
      transform: translate3D(-50%, 0, 0);
      input{
        display: inline-block;
        width: 1.15rem;
        height: 0.71rem;
        text-align: center;
        &:focus{
          outline: none;
          border-color: #6ba4ea;
        }
      }
    }
  }
}
</style>
