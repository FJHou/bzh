<template>
  <div class="enjoy">
  <headerview :titles='titles'></headerview>
    <div class="enjoy-options">
      <ul>
        <li @click="showCityMemu($event)"><span :class="{ 'class-a': isA, 'class-b': isB}">{{cityName}}</span></li>
        <li @click="showCategoryMenu"><span :class="{ 'class-c': isC, 'class-d': isD}">{{categoryName}}</span></li>
        <li @click="showSortMemu"><span :class="{ 'class-e': isE, 'class-f': isF}">{{cingName}}</span></li>
      </ul>
    </div>
    
    <Scroll class="enjoy-content"
            :data="currentList"
            @pullingUp="pullingUp"
            :pullUpLoad="true"
            ref="enjoyScroll">
      <section>
        <div class="enjoy-swiper">
          <swiper loop auto :height="swiperHeight" 
                            :list="bannerList" 
                            :index="swiperIndex" 
                            >
          </swiper>
        </div>
        <div class="enjoy-lize">
          <p>乐享推荐</p>
          <p>品质生活从这一刻开始</p>
        </div>
        <!-- <div class="enjoy-line"></div> -->
        <div class="enjoy-detail">
          <dl class="enjoy-nav" 
              v-for="(item, index) in enjoyLifeList" 
              :data-id="item.code" 
              @click="getEnjoyDetail(index, item.code)"
              :key="index">
            <dt>
               <img class="fig-img" v-lazy="item.imageUrl">
            </dt>
            <dd class="nav-title">
              {{item.name}}
            </dd>
            <dd class="nav-text">
              <i>{{item.cityName}}</i>
              <i>{{item.startTime}}</i>
              <i>预约人数：{{item.countNum}}</i>
            </dd>
            <dd v-if="item.astatus != 3">
              <span v-if="item.attention === 'N'" @click.stop="onfocus($event, index)" :data-id="item.code">
                <i class="fonticon icon-plus-empty"></i>关注
              </span>
              <span v-else @click.stop="onfocus($event, index)" :data-id="item.code">
                已关注
              </span>
            </dd>
            <dd v-else>
              <span @click.stop="return">已结束</span>
            </dd> 
          </dl>
        </div>
        <p v-if="enjoyLifeList.length === 0" class="no-more">没有更多了~</p>
      </section>
    </Scroll>
    <transition name="global-slide"><router-view></router-view></transition>

    <transition name="city-slide">
      <cityview v-show="toggleCity" 
                :docTypeIndex="docTypeIndex" 
                @confirmSelect="hideCity"
                @hideMask="hideMask"></cityview>
    </transition>
    <!-- <transition name="city-slide"> -->
      <cationview v-show="toggleCation" 
                  :cationIndex="cationIndex" 
                  @confirmSelect="hideCation"
                  @hideMask="hideMask">
      </cationview>
    <!-- </transition> -->
    <transition name="city-slide">
    <cingview v-show="toggleCing" 
              :cingIndex="cingIndex" 
              @confirmSelect="hideCing"
              @hideMask="hideMask"></cingview>
    </transition>
  </div>
</template>

<script>
import headerview from 'base/head/head.vue'
import Scroll from 'base/scroll/scroll'
import { checkLogin } from '@/mixins/check-login'
import { Swiper, GroupTitle, SwiperItem } from 'vux'
import {findActivityInfos, findActivityBanners} from 'api/enjoy/api-enjoy'
// 取消关注和关注 共用api-global模块的请求只是传递的type不一样
import { attentionOneProject, cancelAttention } from 'api/global/api-global.js'
import { RESULT_CODE } from 'assets/js/utils'
// 异步加载组件
const cityview = (resolve) => {
  import('./check-city.vue').then((module) => {
    resolve(module)
  })
}
const cationview = (resolve) => {
  import('./check-cation.vue').then((module) => {
    resolve(module)
  })
}
const cingview = (resolve) => {
  import('./check-cing.vue').then((module) => {
    resolve(module)
  })
}

export default {
  data () {
    return {
      titles: '乐享生活',
      bannerList: [],
      enjoyList: [],
      currentList: [],
      pageNum: 1,
      cityId: '',
      sortBy: '',
      typeId: '',

      toggleCity: false,
      toggleCation: false,
      toggleCing: false,
      docTypeIndex: 0,
      cationIndex: 0,
      cingIndex: 0,

      swiperIndex: 0,
      swiperHeight: '3.6rem',
      cityName: '' || '城市',
      categoryName: '' || '分类',
      cingName: '' || '排序',
      isA: true,
      isB: false,
      isC: true,
      isD: false,
      isE: true,
      isF: false,

      isRrue: true,
      isLogin: false
    }
  },
  mixins: [checkLogin],
  created () {
    this._findActivityInfos()
    this._findActivityBanners()
  },
  computed: {
    enjoyLifeList () {
      return this.$store.getters.enjoyList
    }
  },
  methods: {
    _findActivityInfos () {
      let obj = {
        cityId: this.cityId,
        pageNum: this.pageNum,
        sortBy: this.sortBy,
        typeId: this.typeId
      }

      findActivityInfos(obj).then((res) => {
        if (res.resultCode === RESULT_CODE) {
          if (this.pageNum > res.result.totalPage) {
            return
          }
          res.result.activitylist.map((item) => {
            item.startTime = item.startTime.substring(0, item.startTime.lastIndexOf(':'))
          })
          this.enjoyList = this.currentList = this.enjoyList.concat(res.result.activitylist)
          this.$store.commit('SET_ENJOY_LIST', this.enjoyList)

          if (this.pageNum > 1) {
            this.$refs.enjoyScroll.finishPullUp()
          }
        }
      })
    },
    _findActivityBanners () {
      findActivityBanners().then((res) => {
        if (res.resultCode === RESULT_CODE) {
          let arr = res.result.ativityBannerList
          // 由于vux 的swiper组件接收的格式是一个固定的，所以
          // 这里包装一下返回参数的结构
          let bannerList = arr.map((item, index) => {
            item.img = item.imageUrl
            item.url = `enjoy/enjoydetail?id=${item.code}`
            return item
          })
          this.bannerList = bannerList
        }
      })
    },
    pullingUp () {
      ++this.pageNum
      this._findActivityInfos()
    },
    hideMask () {
      this.toggleCity = false
      this.toggleCation = false
      this.toggleCing = false
    },
    showCityMemu (e) {
      this.toggleCity = !this.toggleCity
      this.toggleCation = false
      this.toggleCing = false
      this.isA = !this.isA
      this.isB = !this.isB
      this.isC = true
      this.isD = false
      this.isF = false
      this.isE = true
    },
    showCategoryMenu () {
      this.toggleCation = !this.toggleCation
      this.toggleCity = false
      this.toggleCing = false
      this.isC = !this.isC
      this.isD = !this.isD
      this.isA = true
      this.isB = false
      this.isF = false
      this.isE = true
    },
    showSortMemu () {
      this.toggleCing = !this.toggleCing
      this.toggleCity = false
      this.toggleCation = false
      this.isE = !this.isE
      this.isF = !this.isF
      this.isA = true
      this.isB = false
      this.isC = true
      this.isD = false
    },
    // 城市排序
    hideCity (docTypeIndex, cityName, val = '') {
      // 设置城市id
      this.cityId = val

      if (docTypeIndex !== -1) {
        this.docTypeIndex = cityName[docTypeIndex].ENTR_VAL
        this.cityName = cityName[docTypeIndex].ENTR_DESC
        this.isA = true
        this.isB = false
      }
      this.isA = true
      this.isB = false
      this.toggleCity = false
    },
    // 分类排序
    hideCation (cationIndex, categoryName, val) {
      // 设置分类id
      this.typeId = val
      if (cationIndex !== -1) {
        this.cationIndex = categoryName[cationIndex].ENTR_VAL
        this.categoryName = categoryName[cationIndex].ENTR_DESC
        this.isC = true
        this.isD = false
      }
      this.isC = true
      this.isD = false
      this.toggleCation = false
    },
    // 人气 时间 排序
    hideCing (cingIndex, cingName, val) {
      // 设置排序方式
      this.sortBy = val
      if (cingIndex !== -1) {
        this.cingIndex = cingName[cingIndex].ENTR_VAL
        this.cingName = cingName[cingIndex].ENTR_DESC
        this.isE = true
        this.isF = false
      }
      this.isE = true
      this.isF = false
      this.toggleCing = false
    },
    getEnjoyDetail (index, id) {
      this.$store.commit('SET_ENJOY_LIST_INDEX', index)
      this.$router.push({
        path: `/enjoy/enjoydetail?id=${id}`
      })
    },
    // checkLogin () {
    //   if (!hasUToken()) {
    //     this.$store.commit('SHOW_LOGIN_VIEW', true)
    //     return false
    //   }

    //   return true
    // },
    onfocus (e, index) {
      // 点击关注根据有无utoken进行判断是否登录，如果没登录则提弹出登录页
      if (!this.checkLogin()) {
        return
      }

      let projectId = e.target.getAttribute('data-id')
      let idx = index
      let focusState = this.currentList[idx].attention
      if (focusState === 'Y') {
        this._cancelAttention(projectId, idx)
      } else {
        this._attentionOnProject(projectId, idx)
      }
    },
    _attentionOnProject (projectId, idx) {
      attentionOneProject(projectId, '', '', 2).then((res) => {
        if (res.resultCode === RESULT_CODE) {
          this.$store.dispatch('enjoyStatusChange', {
            index: idx,
            status: 'Y'
          })
          // this.$store.commit('SET_GLO_LIST_INDEX', idx)
          // this.$store.commit('SET_ATTENTION_STATUS', 'Y')
          // this.currentList[idx].attention = 'Y'
        }
      })
    },
    _cancelAttention (projectId, idx) {
      cancelAttention(projectId, 2).then((res) => {
        console.log(res)
        if (res.resultCode === RESULT_CODE) {
          this.$store.dispatch('enjoyStatusChange', {
            index: idx,
            status: 'N'
          })
        }
      })
    },
    _resetFilterCondition () {
      this.pageNum = 1
      this.enjoyList = this.currentList = []
      this.$store.commit('SET_ENJOY_LIST', [])
      this.$refs.enjoyScroll.finishPullUp()
    }
  },
  components: {
    headerview,
    cityview,
    cationview,
    cingview,
    Swiper,
    SwiperItem,
    GroupTitle,
    Scroll
  },
  watch: {
    cityId () {
      this._resetFilterCondition()
      this._findActivityInfos()
    },
    sortBy () {
      this._resetFilterCondition()
      this._findActivityInfos()
    },
    typeId () {
      this._resetFilterCondition()
      this._findActivityInfos()
    }
  }
}
</script>

<style lang="less">

.enjoy{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 1rem;
  z-index: 2;
  background:#fff;
  .enjoy-content{
    position: absolute;
    top: 1.88rem;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    .enjoy-lize{
    width: 100%;
    // height: 1.1rem;
    text-align: center;
    padding-top: .15rem;
    margin-bottom: .5rem;
      p{
        color:#707070;
      }
      p:first-child{
        font-style: normal;
        font-size: 0.34rem;
        line-height: 0.5rem;
        font-weight: bold;
        color: #333;
      }
    }
  }

  .enjoy-options{
    position: relative;
    width: 100%;
    height: 1rem;
    border-top: 1px solid #e9e9e9;
    border-bottom: 1px solid #e9e9e9;
    background:#fff;
    z-index: 2;
    ul{
      width: 100%;
      height: 0.5rem;
      line-height: 0.5rem;
      font-size: 0.28rem;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 0.2rem;
      li{
        flex: 1;
        position: relative;
        text-align: center;
        &:not(:last-child) {
          &:before{
            content: '';
            position: absolute;
            right: 0;
            top: 0;
            width: 1px;
            height: 100%;
            background-color: #e9e9e9;
            transform: scaleX(.5)
          }
        }
        span{
          padding-right: 0.3rem;
        }
        span.class-a,span.class-c,span.class-e{
          background: url('../../assets/img/down.png') no-repeat right 59%;
          background-size:0.2rem 0.12rem;
        }
        span.class-b,span.class-d,span.class-f{
          background: url('../../assets/img/up.png') no-repeat right 59%;
          background-size:0.2rem 0.12rem;
        }
      }


      li:last-child{
        border: none;
      }
      li.checkedel{
        color: red;
      }
    }
  }
  .enjoy-swiper{
    width: 90%;
    margin: 0 auto;
  }
  .no-more {
    text-align: center;
    margin-top: 1rem;
    color: #ccc;
  }
  .enjoy-line{
    width: 100%;
    height: 0.2rem;
    background:#fbf9fe;
  }
  .enjoy-detail{
    .enjoy-nav{
      position: relative;
      width: 90%;
      margin: 0 auto;
      // border-bottom: 1px solid #e9e9e9;
      dt{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 4rem;
        // line-height: 3.6rem;
        text-align: center;
        overflow: hidden;
        img[lazy="loaded"]{
          width: 100%;
        }
        // img[lazy="error"]{

        // }
      }
      dd.nav-title{
        // font-weight: bold;
        font-size:0.28rem;
        color: #414141;
        line-height: 0.48rem;
        padding-top: .05rem;
      }
      dd.nav-text{
        font-size:0.22rem;
        color: #adadad;
        margin-bottom: 0.3rem;
        i:nth-child(2){
          margin:0 0.2rem;
        }
      }
      dd:last-child{
        font-size: 0.24rem;
        color: #70b1f2;
        border:1px solid #eeeeee;
        border-radius: 0.12rem;
        position: absolute;
        right: 0.08rem;
        bottom:0.05rem;
        line-height: 0.44rem;
        span{
          padding: 2px 0.1rem;
          display: block;
          .icon-plus-empty{
            font-weight: 600;
            vertical-align: top;
          }
        }
      }
    }
  }
}
.global-slide-enter-active, .global-slide-leave-active{
  transition: all 0.5s ease;
}
.global-slide-enter, .global-slide-leave-active{
  transform: translate3d(100%, 0, 0);
}
.city-slide-enter-active, .city-slide-leave-active {
  opacity: 1;
  transform: scaleY(1);
  transition: transform .5s cubic-bezier(0.23, 1, 0.32, 1) .1s, 
              opacity .3s cubic-bezier(0.23, 1, 0.32, 1) .1s;
  transform-origin: center top;
}
.city-slide-enter, .city-slide-leave-active {
  opacity: 0;
  transform: scaleY(0);
}
</style>
