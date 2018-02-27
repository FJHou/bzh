<template>
  <div class="about-wrap">
    <Bhead :titles="title"></Bhead>
    <article class="about-box">
      <header>
        <!-- <img src="../../assets/img/about_img.png" alt=""> -->
        <div class="ab-bg"></div>
      </header>
      <section class="ab-tit">
        <h2>伯仲会</h2>
        <p>专注为中国高净值人群打造汇集高端</p>
        <p>生活服务+全球资产配置为一体的精英俱乐部。</p>
      </section>
      <section class="ab-nav">
        <ul>
          <li class="li-box">
            <div class="b-box-col">
              <img src="../../assets/img/about_zichan.png" alt="" class="icon-img">
              <span>资产配置</span>
            </div>
            <div class="b-box-col">
              <img src="../../assets/img/about_caifu.png" alt="" class="icon-img">
              <span>财富管理</span>
            </div>
          </li>
          <li class="li-box">
            <div class="b-box-col">
              <img src="../../assets/img/about_haiwai.png" alt="" class="icon-img">
              <span>海外置业</span>
            </div>
            <div class="b-box-col">
              <img src="../../assets/img/about_jingying.png" alt="" class="icon-img">
              <span>精英教育</span>
            </div>
          </li>
        </ul>
      </section>
      <section class="ab-cont">
        <div class="text">
          伯仲会平台通过为目标会员持续提供原创精选内容、线上精品课程、线下高端活动、会员专属定制服务等内容锁定目标人群。形成集资产配置、财富管理、国际身份规划、税务筹划、资产管理、海外置业、家族信托、精英教育、出国留学等于一体的一站式高端会员服务平台。
        </div>
      </section>
    </article>
  </div>
</template>
<script>
  import Bhead from 'base/head/head'

  export default {
    data () {
      return {
        title: '关于我们'
      }
    },
    components: {
      Bhead
    }
  }
</script>

<style lang="less">
.about-wrap{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2;
  background: #fbf9fe;
  overflow-y: auto;
  .about-box{
    position: relative;
    top: .88rem;
  }
  .e-head{
    position: fixed;
    width: 100%;
  }
  .ab-bg{
    width: 100%;
    height: 3.56rem;
    background: url('../../assets/img/about_banner.png') 100%/cover no-repeat;
  }
  .ab-tit{
    text-align: center;
    font-size: .26rem;
    background: #fff;
    padding: .22rem 0;
    margin-bottom: .2rem;
    line-height: .4rem;
    h2{
      font-size: .34rem;
      line-height: .6rem;
      font-weight: 400;
    }
  }
  .ab-nav{
    margin-bottom: .05rem;
    background: #fbf9fe;
    .li-box{ 
      padding: 0 .30rem;
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-bottom: .2rem;
      .b-box-col{
        height: 1rem;
        flex: 1;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        .icon-img{
          width: .74rem;
          height: .74rem;
          margin-right: .3rem;
        }
      }
      :first-child{
        margin-right: .11rem;
      }
      :last-child{
        margin-left: .11rem;
      }
    }
  }
  .ab-cont{
    background: #fff;
    font-size: .26rem;
    padding: .2rem .35rem;
    line-height: .48rem;
    .text{
      text-indent:.25rem;
    }
  }
}
</style>