export const TESTURL = '10.0.114.169:8080'

export const secret = 'bowebtest'

export const RESULT_CODE = '0000'

export function getUserUToken () {
  let _token = hasUToken()

  if (!_token) {
    _token = ''
  }

  return _token
}

export function hasUToken () {
  let res = getStorage('utoken')
  if (!res) {
    return false
  }
  return res
}

export function setStorage (key, value) {
  if ((!key && typeof key !== 'string') || !value) {
    return
  }

  return localStorage.setItem(key, value)
}

export function getStorage (key) {
  if (!key && typeof key !== 'string') {
    return
  }

  return localStorage.getItem(key)
}

export function removeStorage (key) {
  if (!key && typeof key !== 'string') {
    return
  }
  return localStorage.removeItem(key)
}

export function browserBackHideLoginView (store) {
  window.addEventListener('popstate', () => {
    store.commit('SHOW_LOGIN_VIEW', false)
  })
}

export function imgLoaded (str) {
  let reg = /src=['"]([^'"]+)/gi
  // 获取字符串里所有的img地址
  let imgArr = str.match(reg)
  let arrLen = 0
  // 已加载完成的图片
  let loadedImg = 0
  let newImg = []

  if (imgArr) {
    arrLen = imgArr.length
    return new Promise((resolve, reject) => {
      // 遍历数组，创建图片对象，给图片对象添加事件，当触发onload事件时
      // 已加载完成图片的个数+1， 当已加载个数和正则匹配的src图片个数相
      // 等时，resolve 'loaded'。外面捕获到这个通知后对scroll组件refresh
      Array.prototype.forEach.call(imgArr, (img, index) => {
        let imgSrc = decodeURIComponent(img.slice(10))
        let imgDom = new Image()
        newImg[index] = imgDom
        newImg[index].src = imgSrc
        newImg[index].onload = () => {
          loadedImg++
          if (arrLen === loadedImg) {
            resolve('loaded')
          }
        }
        newImg[index].onerror = (err) => {
          reject(err)
        }
      })
    })
  // 防止组件在引用这个函数时当imgArr为null时报错
  } else {
    return Promise.resolve('no pictures')
  }
}

export function isAndroid () {
  let ua = navigator.userAgent
  let uaMap = {
    wx: /MicroMessenger/.test(ua),
    android: /Android|Linux/.test(ua)
  }

  if (uaMap.wx && uaMap.android) {
    return true
  }
  return false
}
