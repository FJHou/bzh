// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import App from './App'
import store from './vuex'
import VueLazyload from 'vue-lazyload'
import { ToastPlugin } from 'vux'
// rem
import 'assets/js/fit.js'
// axios请求地址配置
import 'assets/js/axios.config.js'
// 基础样式和自定义vux样式
import 'assets/css/base.less'
import 'assets/css/customer-vux-style.less'
// 浏览器后退的时候隐藏登陆页面
import { browserBackHideLoginView } from 'assets/js/utils'
import { wxInit } from 'assets/js/wx.config'
browserBackHideLoginView(store)
wxInit()

// 根据运行环境不同，选择不同路径的svg图片。
// 避免开发环境和生产环境因为路径问题引起的报错
const loading = process.env.NODE_ENV !== 'production' ? 'src/assets/img/loading.svg' : 'static/img/loading.svg'
const errImg = process.env.NODE_ENV !== 'production' ? 'src/assets/img/loading.svg' : 'static/img/loading.svg'

Vue.use(ToastPlugin)
Vue.use(VueLazyload, {
  preLoad: 1,
  error: loading,
  loading: errImg,
  attempt: 1
})
// 解决android和ios在assess.vue点击事件互斥的问题。
const deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent)
if (!deviceIsIOS) {
  FastClick.attach(document.body)
}
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app-box',
  store,
  router,
  render: h => h(App)
})
