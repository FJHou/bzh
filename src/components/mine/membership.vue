<template>
  <div class="focus-view">
    <Bhead :titles="title"></Bhead>
    <Scroll class="member-wrapper">
    <article class="vip-wrap">
    <div>
      <div class="top-icon">
        <span class="fonticon icon-my-vip"></span>
      </div>
      <div class="top-tip">
        【注意】 有责任提醒您，请仔细阅读以下全部内容。如果您不同意本协议的任一或全部条款内容，请不要以确认的形式（包括但不限于：勾选、点击）选择“同意接受”或使用本协议项下服务。
      </div>
    </div>
    <dl>
      <dt>
        1.随机游客——普通会员
      </dt>
      <dd>
        普通游客作为关注后进入，可浏览公众号内部分内容，对其不进行开放“精选栏目内容推送”“优惠券领取”“线上音频试听”“资产配置报告”等权益项目权限，如游客想进入此界面了解，需进行会员登录提醒界面
      </dd>
    </dl>
    <dl>
      <dt>
        2.普通会员——金牌会员
      </dt>
      <dd>
        <p>普通会员作为只能浏览部分内容的低等会员，要想取得以上未对其开放的项目，要进行积分进阶制度，积分获得足值时则普通会员升级为金牌会员</p>
        <ul>
          <li>积分整体满分60分</li>
          <li>（1）收藏+2分</li>
          <li>（2）签到+1分（连续7天签到可再追加5分）</li>
          <li>（3）分享+5分</li>
          <li>（4）预约俱乐部活动且参加活动+60分</li>
          <li>注：此积分设置在会员日及节日进行双倍累计计算</li>
        </ul>
      </dd>
    </dl>
    <dl>
      <dt>
        3.金牌会员——铂金会员
      </dt>
      <dd>
        金牌会员如产生对部分订阅产品（付费）变免费/获得1VS1专项客户服务/高端增值活动的意向升级，需在参与活动且购买我司产品或产生乐享生活的增值消费活动后，方可升级，此阶段升级，通过下线客户管理系统登记完成
      </dd>
    </dl>
    <dl>
      <dt>
        4.铂金会员——钻石会员
      </dt>
      <dd>
        最为终极会员级别，升至此级，需俱乐部管理人员主动邀请进行，无需线上进行说明
      </dd>
    </dl>
    </article>
    </Scroll>
  </div>
</template>

<script>
import Bhead from 'base/head/head'
import Scroll from 'base/scroll/scroll'

export default {
  data () {
    return {
      title: '会员制度'
    }
  },
  components: {
    Bhead,
    Scroll
  }
}
</script>

<style lang="less">
.focus-view{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #fff;
  z-index: 2;
  article{
    // padding: 10px;
    h3{
      text-align: center;
    }
  }
  .member-wrapper {
    position: absolute;
    top: .88rem;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .vip-wrap{
    padding: .32rem;
    .top-icon{
      text-align: center;
      margin-bottom: .25rem;
      .icon-my-vip{
        display: inline-block;
        width: 1.1rem;
        height: 1.1rem;
        background: #f07d42;
        color: #fff;
        font-size: 50px;
        line-height: 1rem;
        border-radius: 50%;
      }
    }
    .top-tip{
      margin-bottom: .45rem;
      color: #828282;
      font-size: .26rem;
      line-height: .5rem;
    }
    dl{
      margin-bottom: .45rem;
      dt{
        font-size: .3rem;
        color: #333;
        line-height: .6rem;
      }
      dd{
        color: #828282;
        font-size: .26rem;
        line-height: .5rem;
      }
    }
  }
}
</style>
