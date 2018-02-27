import axios from 'axios'
// import { secret } from 'assets/js/utils'

/**
 * [findActivityBanners 乐享首页banner图]
 * @param  {[type]} code    [项目编号]
 * @param  {String} mobile  [手机号,可为'']
 * @param  {String} smsCode [验证码,可为'']
 * @return {[type]}         [无]
 */
export function findFeaturedBanner () {
  const URL = 'banner/findFeaturedBanner'
  return axios.post(URL, {
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

/**
 * [findFeaturedPopulars 精选页_热门精选]
 * @param  {[type]} code    [项目编号]
 * @param  {String} mobile  [手机号,可为'']
 * @param  {String} smsCode [验证码,可为'']
 * @return {[type]}         [无]
 */
export function findFeaturedPopulars () {
  const URL = 'banner/findFeaturedPopulars'
  return axios.post(URL, {
  }).then((res) => {
    // console.log('findFeaturedPopulars')
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}
