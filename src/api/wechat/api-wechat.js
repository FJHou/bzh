import axios from 'axios'

export function wxSign () {
  const URL = 'weChat/wxSign'
  let url = location.href.split('#')[0]
  return axios.post(URL, {
    url: url
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}
