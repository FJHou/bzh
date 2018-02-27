import axios from 'axios'
import { secret } from 'assets/js/utils'
import md5 from 'md5'

export function sendSmsCode (num) {
  const URL = 'smscode/sendSmsCode'
  const SIGN = md5(`mobile=${num}&secret=${secret}`)

  return axios.post(URL, {
    mobile: num,
    sign: SIGN
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export function loginOrRegister (num, code) {
  const URL = 'login/loginOrRegister'
  const SIGN = md5(`mobile=${num}&secret=${secret}&smsCode=${code}`)
  // console.log('%c tel: ' + num + ' code: ' + code, 'color:red; font-size: 20px')
  // console.log(SIGN)
  return axios.post(URL, {
    mobile: num,
    smsCode: code,
    sign: SIGN
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}
