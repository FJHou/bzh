import axios from 'axios'
import { secret, getUserUToken } from 'assets/js/utils'
import md5 from 'md5'

/**
 * [findProjectList 投资热点列表]
 * @param  {[type]} pageNum [分页查询页数]
 * @return {[type]}         [无]
 */
export function findProjectList (pageNum = 1) {
  const UTOKEN = getUserUToken()
  const URL = 'project/findProjectList'
  const SIGN = md5(`pageNum=${pageNum}&secret=${secret}&utoken=${UTOKEN}`)

  return axios.post(URL, {
    utoken: UTOKEN,
    pageNum: pageNum || 1,
    sign: SIGN
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

/**
 * [findProjectDetailInfo 查询投资热点项目详情]
 * @param  {[type]} id [项目编号]
 * @return {[type]}    [无]
 */
export function findProjectDetailInfo (id) {
  if (!id) {
    console.log('请传入id')
    return
  }

  const UTOKEN = getUserUToken()
  const URL = 'project/findProjectDetailInfo'
  const SIGN = md5(`code=${id}&secret=${secret}&utoken=${UTOKEN}`)

  return axios.post(URL, {
    utoken: UTOKEN,
    code: id,
    sign: SIGN
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

/**
 * [attentionOneProject 关注投资热点]
 * @param  {[type]} code    [项目编号]
 * @param  {String} mobile  [手机号,可为'']
 * @param  {String} smsCode [验证码,可为'']
 * @return {[type]}         [无]
 */
export function attentionOneProject (code, mobile = '', smsCode = '', type = 1) {
  if (!code) {
    return
  }

  const UTOKEN = getUserUToken()
  const TYPE = type
  const URL = 'attentionbespeak/attentionOneProject'
  const SIGN = md5(`itemCode=${code}&itemType=${TYPE}&mobile=${mobile}&secret=${secret}&smsCode=${smsCode}&utoken=${UTOKEN}`)

  return axios.post(URL, {
    utoken: UTOKEN,
    mobile: mobile,
    smsCode: smsCode,
    itemCode: code,
    itemType: TYPE,
    sign: SIGN
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

/**
 * [bespeakOneProject 预约项目]
 * @param  {[type]} code    [项目编号]
 * @param  {String} mobile  [手机号,可为'']
 * @param  {String} smsCode [验证码,可为'']
 * @return {[type]}         [无]
 */
export function bespeakOneProject (code, mobile = '', smsCode = '', type = 1) {
  if (!code) {
    return
  }

  const UTOKEN = getUserUToken()
  const TYPE = type
  const URL = 'attentionbespeak/bespeakOneProject'
  const SIGN = md5(`itemCode=${code}&itemType=${TYPE}&mobile=${mobile}&secret=${secret}&smsCode=${smsCode}&utoken=${UTOKEN}`)

  return axios.post(URL, {
    utoken: UTOKEN,
    mobile: mobile,
    smsCode: smsCode,
    itemCode: code,
    itemType: TYPE,
    sign: SIGN
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

/**
 * [cancelAttention 取消关注项目]
 * @param  {[type]} code [项目编号]
 * @return {[type]}      [无]
 */
export function cancelAttention (code, type = 1) {
  if (!code) {
    return
  }
  const UTOKEN = getUserUToken()
  const TYPE = type
  const URL = 'attentionbespeak/cancelAttention'
  const SIGN = md5(`itemCode=${code}&itemType=${TYPE}&secret=${secret}&utoken=${UTOKEN}`)

  return axios.post(URL, {
    utoken: UTOKEN,
    itemCode: code,
    itemType: TYPE,
    sign: SIGN
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export function findAssessmentCount () {
  const URL = 'UserAssessmentInfo/findAssessmentCount'

  return axios.post(URL, {

  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export function onlineAssessment (obj) {
  const URL = 'UserAssessmentInfo/onlineAssessment'
  const SIGN = md5(`answers=${obj.answers}&mobile=${obj.mobile}&secret=${secret}&sex=${obj.sex}&userName=${obj.userName}`)

  return axios.post(URL, {
    answers: obj.answers,
    sex: obj.sex,
    userName: obj.userName,
    mobile: obj.mobile,
    sign: SIGN
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export function findAssetsReports () {
  const URL = 'AssetsReportInfo/findAssetsReports'

  return axios.post(URL, {

  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export function findAssetsReportsGroupYears () {
  const URL = 'AssetsReportInfo/findAssetsReportsGroupYears'

  return axios.post(URL, {

  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export function PlanningConsultation (type) {
  const UTOKEN = getUserUToken()
  const URL = 'PlanningConsultationController/PlanningConsultation'
  const SIGN = md5(`secret=${secret}&type=${type}&utoken=${UTOKEN}`)

  return axios.post(URL, {
    utoken: UTOKEN,
    type: type,
    sign: SIGN
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}
