<template>
  <div class="hot-contanner">
    <header>热门精选</header>
    <Scroll class="index-content" :data="[]">
    <section>

      <swiper loop 
              auto 
              :list="bannerList" 
              :index="swiperImg_index" 
              @on-index-change="swiperImg_onIndexChange" 
              :height="'3.6rem'">
      </swiper>

      <div class="hot-activity">
        <ul>
          <li @click="enterEnjoy()">
            <p>乐享生活</p>
            <span>优享品质活动</span>
          </li>
          <li @click="enterGlobal()">
            <p>资产配置</p>
            <span>全球置业精选</span>
          </li>
        </ul>
      </div>
      <div class="hot-figure">
        <h5>
          热门精选
        </h5>
        <ul>
          <li v-for="(item, index) in PopularsList" @click="enterProject(item.moduleType, item.code)" :key="index">
            <div class="img-wrapper">
              <img class="fig-img" v-lazy="item.imageUrl" alt="">
            </div>
            <p>{{item.title}}</p>
          </li>
        </ul>
      </div>
      </section>
    </Scroll>
    <footerview></footerview>
  </div>
</template>

<script>
/* created by fanling in 20171123 */
import footerview from 'base/footer/footer.vue'
import { Swiper, GroupTitle, SwiperItem, XButton, Divider } from 'vux'
import Scroll from 'base/scroll/scroll'
import axios from 'axios'
import { findFeaturedBanner, findFeaturedPopulars } from 'api/index/api-index'
import { RESULT_CODE } from 'assets/js/utils'

export default {
  data () {
    return {
      swiperList: [],
      swiperImg_index: 0,
      PopularsList: [],
      bannerList: []
    }
  },
  created () {
    this.findFeaturedBanner()
    this.findFeaturedPopulars()
  },
  methods: {
    enterEnjoy () {
      this.$router.push({
        path: `/enjoy`
      })
    },
    enterGlobal () {
      this.$router.push({
        path: `/global`
      })
    },
    enterProject (type, code) {
      if (type === 2) {
        this.$router.push({
          path: `/enjoy/enjoyDetail?id=${code}`
        })
      } else if (type === 1) {
        this.$router.push({
          path: `/global/detail?id=${code}`
        })
      }
    },
    findFeaturedBanner () {
      findFeaturedBanner().then((res) => {
        if (res.resultCode === RESULT_CODE) {
          let arr = res.result.featuredBannerList
          let bannerList = arr.map((item, index) => {
            item.type = item.moduleType
            if (item.type === 1) {
              item.url = `/global/detail?id=${item.code}`
            } else if (item.type === 2) {
              item.url = `/enjoy/enjoyDetail?id=${item.code}`
            } else if (item.type === 3) {
              item.url = ''
            }
            item.img = item.imageUrl
            return item
          })
          console.log(bannerList)
          this.bannerList = bannerList
        }
      })
    },
    findFeaturedPopulars () {
      findFeaturedPopulars().then((res) => {
        if (res.resultCode === RESULT_CODE) {
          this.PopularsList = res.result.featuredPopularsList
        }
      })
    },
    swiperImg_onIndexChange (index) {
      this.swiperImg_index = index
    }
  },
  components: {
    footerview,
    Swiper,
    SwiperItem,
    GroupTitle,
    XButton,
    Divider,
    Scroll,
    axios
  }
}
</script>

<style lang="less">
html,body{
  background: #f6f6f7;
  position: relative;
}
.hot-contanner{
  width: 100%;
  height: 100%;
  position: fixed;
  header{
    position: fixed;
    top:0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 0.88rem;
    text-align: center;
    line-height: 0.88rem;
    letter-spacing:0.01rem;
    font-size: 0.32rem;
    background: #fff;
    font-weight: bold;
  }
  .index-content{
    position: absolute;
    top: 0.88rem;
    bottom: 1rem;
    left: 0;
    right: 0;
  }
  .hot-activity{
    width: 100%;
    overflow: hidden;
    height: 2rem;
    background: url(../../assets/img/index-tab.png) no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    ul{
      width: 100%;
      height: 1.12rem;
      margin-top: 0.95rem;
      display: flex;
      li{
        /*flex: 0 0 46%;*/
        width: 50%;
        height: 0.9rem;
        padding:0 0 0 0.4rem;
        text-align: center;
        p{
          font-size: 0.32rem;
          font-weight: bold;
          line-height: 0.35rem;
          color: #ffffff;
        }
        span{
          font-size: 0.24rem;
          color: #daedff;
        }
      }
      li:first-child{
        background: url(../../assets/img/icon-coffer.png) no-repeat 0.8rem 0.1rem;
        background-size: 0.55rem 0.63rem;
        p{
          padding-left: 0.3rem;
          padding-top: 0.1rem;
        }
        span{
          padding-left: 0.3rem;
        }
      }
      li:last-child{
        background: url(../../assets/img/icon-card.png) no-repeat 0.4rem 0.2rem;
        background-size: 0.51rem 0.51rem;
        p{
          padding-left: -0.3rem;
          padding-top: 0.1rem;
        }
        span{
          padding-left: -0.3rem;
        }
      }
      // pad兼容
      @media screen and (min-width: 768px) {
        li:first-child{
          background: url(../../assets/img/icon-coffer.png) no-repeat 1.6rem 0.1rem;
          background-size: 0.55rem 0.63rem;
          p{
            padding-left: 0.3rem;
            padding-top: 0.1rem;
          }
          span{
            padding-left: 0.3rem;
          }
        }
        li:last-child{
          background: url(../../assets/img/icon-card.png) no-repeat 1.2rem 0.2rem;
          background-size: 0.51rem 0.51rem;
          p{
            padding-left: -0.3rem;
            padding-top: 0.1rem;
          }
          span{
            padding-left: -0.3rem;
          }
        }
      }
    }
  }
  .hot-figure{
    background: #fff;
    margin-top: 0.2rem;
    overflow: hidden;
    position: relative;
    ul{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      li{
        flex: 0 0 46%;
        width: 50%;
        width: 100%;
        // height: 2.9rem;
        div{
          width: 100%;
          height: 2.9rem;
          overflow: hidden;
        }
        p{
          height: 0.7rem;
          font-size: 0.24rem;
          color: #333;
          line-height: 0.7rem;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }
      }
      li:nth-child(2n+1){
        padding-left: 3%;
        padding-right: 1%;
      }
      li:nth-child(2n){
        padding-right: 3%;
        padding-left: 1%;
      }
      /*li:first-child{*/
        /*margin-left: 4%;*/
        /*margin-right: 0.2rem;*/
      /*}*/
      /*li:last-child{*/
        /*margin-right: 4%;*/
      /*}*/
    }
    h5{
      width: 100%;
      padding: 0.2rem 0 0.1rem 0;
      position: relative;
      height: 0.68rem;
      text-align: center;
      line-height: 0.68rem;
      font-size: 0.32rem;
      color: #333;
      font-weight: bold;
      font-style: normal;
      img{
        display: block;
        width: 0.16rem;
        height: 0.16rem;
        position: absolute;
      }
      img.first-img{
        top:0.28rem;
        left: 2.5rem;
      }
      img.last-img{
        top:0.28rem;
        right: 2.5rem;
      }
    }
    .img-wrapper{
      display: flex;
      align-items: center;
      justify-content: center;
      .fig-img[lazy=loading] {
        width: 30%;
      }
      .fig-img{
        width: 100%;
      }
    }

  }
  h5:before{
    position: absolute;
    top:0.6rem;
    left: 0.88rem;
    content: " ";
    background:#666666;
    width: 1.20rem;
    height: 0.01rem;
  }
  h5:after{
    position: absolute;
    top:0.6rem;
    right: 0.88rem;
    content: " ";
    background:#666666;
    width: 1.20rem;
    height: 0.01rem;
  }
}

/* vux style */
.copyright {
  font-size: 12px;
  color: #ccc;
  text-align: center;
}
.text-scroll {
  border: 1px solid #ddd;
  border-left: none;
  border-right: none;
}
.text-scroll p{
  font-size: 12px;
  text-align: center;
  line-height: 30px;
}
.black {
  background-color: #000;
}
.title{
  line-height: 100px;
  text-align: center;
  color: #fff;
}
.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}
.vux-indicator.custom-bottom {
  bottom: 30px;
}
.vux-slider > .vux-indicator, .vux-slider .vux-indicator-right{
  position: absolute;
  /*left: 45%;*/
  bottom: 0.15rem;
}
.vux-slider > .vux-swiper > .vux-swiper-item > a > .vux-swiper-desc {
  display: none;
  // position: absolute;
  // left: 0;
  // right: 0;
  // bottom: 0;
  // height: 1.4em;
  // font-size: 16px;
  // padding: 20px 50px 12px 13px;
  // margin: 0;
  // background-image: none!important;
  // background: rgba(0,0,0,0.4);
  // color: #fff;
  // text-shadow: 0 1px 0 rgba(0, 0, 0, 0.5);
  // overflow: hidden;
  // text-overflow: ellipsis;
  // white-space: nowrap;
  // word-wrap: normal;
}
// .vux-slider > .vux-indicator > a > .vux-icon-dot.active, .vux-slider .vux-indicator-right > a > .vux-icon-dot.active {
//   background-color: #fff !important;
// }
</style>
