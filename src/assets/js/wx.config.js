import wx from 'weixin-js-sdk'
import { wxSign } from 'api/wechat/api-wechat'
export function wxInit (afterHash) {
  wxSign().then((res) => {
    let result = res.result
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: result.appId, // 必填，公众号的唯一标识
      timestamp: result.timestamp, // 必填，生成签名的时间戳
      nonceStr: result.noncestr, // 必填，生成签名的随机串
      signature: result.signature, // 必填，签名，见附录1
      jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })
  })
  wx.ready(() => {
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，
    // config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把
    // 相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以
    // 直接调用，不需要放在ready函数中。
    let imgUrl = location.origin + '/dist/static/img/logo.png'
    let currentTitle = document.title
    wx.onMenuShareTimeline({
      title: currentTitle, // 分享标题
      link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl // 分享图标
    })
    wx.onMenuShareAppMessage({
      title: currentTitle, // 分享标题
      desc: '', // 分享描述
      link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '' // 如果type是music或video，则要提供数据链接，默认为空
    })
  })
  // wx.error((res) => {
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，
    // config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把
    // 相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以
    // 直接调用，不需要放在ready函数中。
    // alert('微信验证失败')
    // alert(res)
  // })
}

export function wxConfig (afterHash) {
  let currentUrl = location.origin + '/dist/#' + afterHash
  let imgUrl = location.origin + '/dist/static/img/logo.png'
  let currentTitle = document.title

  wx.onMenuShareTimeline({
    title: currentTitle, // 分享标题
    link: currentUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: imgUrl // 分享图标
  })
  wx.onMenuShareAppMessage({
    title: currentTitle, // 分享标题
    desc: '', // 分享描述
    link: currentUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: imgUrl, // 分享图标
    type: '', // 分享类型,music、video或link，不填默认为link
    dataUrl: '' // 如果type是music或video，则要提供数据链接，默认为空
  })
}
