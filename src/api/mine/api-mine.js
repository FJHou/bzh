import axios from 'axios'
import { secret, getUserUToken } from 'assets/js/utils'
import md5 from 'md5'

export function updateUserDetailInfo (obj) {
  const UTOKEN = getUserUToken()
  const URL = 'mine/updateUserDetailInfo'
  const SIGN = md5(`birthday=${obj.birthday}&nickName=${obj.nickname}&secret=${secret}&sex=${obj.sex}&userName=${obj.userName}&utoken=${UTOKEN}`)

  return axios.post(URL, {
    utoken: UTOKEN,
    sign: SIGN
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export function findMyBespeakInfos (...obj) {
  const UTOKEN = getUserUToken()
  const URL = 'attentionbespeak/findMyBespeakInfos'
  const SIGN = md5(`listTypeId=${obj[0]}&secret=${secret}&totalTypeId=${obj[1]}&utoken=${UTOKEN}`)

  return axios.post(URL, {
    utoken: UTOKEN,
    listTypeId: obj[0],
    totalTypeId: obj[1],
    sign: SIGN
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export function findMyAttentionInfos (...obj) {
  const UTOKEN = getUserUToken()
  const URL = 'attentionbespeak/findMyAttentionInfos'
  const SIGN = md5(`listTypeId=${obj[0]}&secret=${secret}&totalTypeId=${obj[1]}&utoken=${UTOKEN}`)

  return axios.post(URL, {
    utoken: UTOKEN,
    listTypeId: obj[0],
    totalTypeId: obj[1],
    sign: SIGN
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export function findMyHomePage (mobile = '', smsCode = '') {
  const UTOKEN = getUserUToken()
  const URL = 'mine/findMyHomePage'
  const SIGN = md5(`mobile=${mobile}&secret=${secret}&smsCode=${smsCode}&utoken=${UTOKEN}`)

  return axios.post(URL, {
    utoken: UTOKEN,
    mobile: mobile,
    smsCode: smsCode,
    sign: SIGN
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

/*
  修改个人信息
 */

// 查看用户资料
export function findUserDetailInfo () {
  const UTOKEN = getUserUToken()
  const URL = 'mine/findUserDetailInfo'
  const SIGN = md5(`secret=${secret}&utoken=${UTOKEN}`)

  return axios.post(URL, {
    utoken: UTOKEN,
    sign: SIGN
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

// 修改更多
export function updateUserMoreInfo (obj) {
  const UTOKEN = getUserUToken()
  const URL = 'mine/updateUserMoreInfo'
  const SIGN = md5(`education=${obj.education}&industry=${obj.industry}&maxIncome=${obj.maxIncome}&minIncome=${obj.minIncome}&secret=${secret}&utoken=${UTOKEN}`)
  console.log(obj)
  return axios.post(URL, {
    utoken: UTOKEN,
    education: obj.education,
    industry: obj.industry,
    maxIncome: obj.maxIncome,
    minIncome: obj.minIncome,
    sign: SIGN
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

// 修改昵称
export function updateNickNamelInfo (name) {
  const UTOKEN = getUserUToken()
  const URL = 'mine/updateNickNamelInfo'
  const SIGN = md5(`nickName=${name}&secret=${secret}&utoken=${UTOKEN}`)

  return axios.post(URL, {
    utoken: UTOKEN,
    nickName: name,
    sign: SIGN
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

// 修改性别
export function updateSexInfo (sex) {
  const UTOKEN = getUserUToken()
  const URL = 'mine/updateSexInfo'
  const SIGN = md5(`secret=${secret}&sex=${sex}&utoken=${UTOKEN}`)

  return axios.post(URL, {
    utoken: UTOKEN,
    sex: sex,
    sign: SIGN
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

// 修改生日
export function updateBirthdayInfo (birthday) {
  const UTOKEN = getUserUToken()
  const URL = 'mine/updateBirthdayInfo'
  const SIGN = md5(`birthday=${birthday}&secret=${secret}&utoken=${UTOKEN}`)

  return axios.post(URL, {
    utoken: UTOKEN,
    birthday: birthday,
    sign: SIGN
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

// 修改地区
export function updateAreaInfo (city, province) {
  const UTOKEN = getUserUToken()
  const URL = 'mine/updateAreaInfo'
  const SIGN = md5(`city=${city}&province=${province}&secret=${secret}&utoken=${UTOKEN}`)

  return axios.post(URL, {
    utoken: UTOKEN,
    province: province,
    city: city,
    sign: SIGN
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

// 修改手机号
export function updateMobileInfo (mobile, smsCode) {
  const UTOKEN = getUserUToken()
  const URL = 'mine/updateMobileInfo'
  const SIGN = md5(`mobile=${mobile}&secret=${secret}&smsCode=${smsCode}&utoken=${UTOKEN}`)

  return axios.post(URL, {
    utoken: UTOKEN,
    mobile: mobile,
    smsCode: smsCode,
    sign: SIGN
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}
