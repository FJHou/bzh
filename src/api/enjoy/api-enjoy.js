import axios from 'axios'
import { secret, getUserUToken } from 'assets/js/utils'
import md5 from 'md5'

/**
 * [findActivityInfos 乐享活动列表图]
 * @param  {[type]} code    [项目编号]
 * @param  {String} mobile  [手机号,可为'']
 * @param  {String} smsCode [验证码,可为'']
 * @return {[type]}         [无]
 */
export function findActivityInfos (obj) {
  if (!obj) {
    return
  }

  const UTOKEN = getUserUToken()
  const URL = 'activity/findActivityInfos'
  const SIGN = md5(`cityId=${obj.cityId}&pageNum=${obj.pageNum}&secret=${secret}&sortBy=${obj.sortBy}&typeId=${obj.typeId}&utoken=${UTOKEN}`)

  return axios.post(URL, {
    utoken: UTOKEN,
    cityId: obj.cityId,
    pageNum: obj.pageNum,
    sortBy: obj.sortBy,
    typeId: obj.typeId,
    sign: SIGN
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

/**
 * [findActivityBanners 乐享首页banner图]
 * @param  {[type]} code    [项目编号]
 * @param  {String} mobile  [手机号,可为'']
 * @param  {String} smsCode [验证码,可为'']
 * @return {[type]}         [无]
 */
export function findActivityBanners () {
  const URL = 'banner/findActivityBanners'
  return axios.post(URL, {
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

/**
 * [findActivityDetailInfo 乐享_详情]
 * @param  {[type]} code    [项目编号]
 * @param  {String} mobile  [手机号,可为'']
 * @param  {String} smsCode [验证码,可为'']
 * @return {[type]}         [无]
 */
export function findActivityDetailInfo (code) {
  if (!code) {
    return
  }

  const UTOKEN = getUserUToken()
  const URL = 'activity/findActivityDetailInfo'
  const SIGN = md5(`code=${code}&secret=${secret}&utoken=${UTOKEN}`)

  return axios.post(URL, {
    utoken: UTOKEN,
    code: code,
    sign: SIGN
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

/**
 * [attentionOneProject 关注乐享生活]
 * @param  {[type]} code    [项目编号]
 * @param  {String} mobile  [手机号,可为'']
 * @param  {String} smsCode [验证码,可为'']
 * @return {[type]}         [无]
 */
// export function attentionOneProject (code, mobile = '', smsCode = '') {
//   if (!code) {
//     return
//   }

//   const UTOKEN = getUserUToken()
//   const TYPE = 1
//   const URL = 'attentionbespeak/attentionOneProject'
//   const SIGN = md5(`itemCode=${code}&itemType=${TYPE}&mobile=${mobile}&secret=${secret}&smsCode=${smsCode}&utoken=${UTOKEN}`)

//   return axios.post(URL, {
//     utoken: UTOKEN,
//     mobile: mobile,
//     smsCode: smsCode,
//     itemCode: code,
//     itemType: TYPE,
//     sign: SIGN
//   }).then((res) => {
//     return Promise.resolve(res.data)
//   }).catch((err) => {
//     console.log(err)
//   })
// }
