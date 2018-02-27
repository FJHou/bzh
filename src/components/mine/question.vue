<template>
  <div class="question-view">
    <Bhead :titles="title"></Bhead>
    <article>
      <p class="que">1、伯仲会怎么进行登录注册？</p>
      <p class="anw">答：输入手机号码和验证码进行登录注册。</p>
      <p class="que">2、用户怎么退出登录？</p>
      <p class="anw">答：用户登录后，在一定时间内不需要再次登录。如用户想退出登录，请直接清理微信缓存即可。</p>
      <p class="que">3、伯仲会的活动是否是全国性质的？</p>
      <p class="anw">答：现阶段，伯仲会只在济南、西安、宁波、重庆、杭州、天津、北京有活动，后期会逐步增加城市地区。
</p>
      <p class="que">4、伯仲会的活动预约后，是否可以取消预约？</p>
      <p class="anw">答：现阶段，伯仲会的活动只能预约，没有取消预约。预约活动后，用户会接收到系统发送的确定信息，活动方会和用户进行线下沟通。</p>
    </article>
  </div>
</template>

<script>
import Bhead from 'base/head/head'

export default {
  data () {
    return {
      title: '常见问题'
    }
  },
  components: {
    Bhead
  }
}
</script>

<style lang="less">
.question-view{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #fff;
  z-index: 2;
  article {
    padding: .5rem .5rem;
  }
  p{
    margin-bottom: .05rem;
  }
  p.anw{
    color: rgb(150, 148, 148);
    margin-bottom: .2rem;
  }
}
</style>
