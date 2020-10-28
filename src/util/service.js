import axios from 'axios'
import store from '../store/index'

function template (temp, data) {
  return data ? temp.replace(/\{\{([^}]+)\}\}/g, function ($1, $2) {
    return data[$2] !== null || data[$2] !== undefined ? data[$2] : $1
  }) : temp
}

function getBrowserInfo () {
  let ua = window.navigator.userAgent
  let tem
  let M = ua.match(/(opera|chrome|safari|micromessenger|qq|firefox|msie|NewsApp|UCBrowser|YiXin|trident(?=\/))\/?\s*([.\d]+)/i) || []
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+([.\d]+)/g.exec(ua) || []
    return {name: 'IE ', version: (tem[1] || '')}
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\bOPR\/([.\d]+)/)
    if (tem !== null) {
      return {name: 'Opera', version: tem[1]}
    }
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?']
  if ((tem = ua.match(/version\/([.\d]+)/i)) !== null) {
    M.splice(1, 1, tem[1])
  }
  if (!/^[0-9.]{1,}$/.test(M[1])) {
    let _temp = M[1].match(/^[0-9.]{1,}/)
    M[1] = _temp[0] || M[1]
  }
  return {
    name: M[0],
    version: M[1]
  }
}

export default (url, param) => {
  if (!url) return Promise.reject(new Error('请求接口路径错误'))
  param = !param ? {} : param
  param.method = param.method || 'get'
  param.url = url
  if (param.urlParams) {
    param.url = template(param.url, param.urlParams)
  }
  /*
   * 初始化header
   */
  param.headers = param.headers || {}
  /*
   * 默认的HONGCAI-UA, 如果param中带有则跳过，否则设置为appInfo内的User-Agent 或默认
   */
  let browser = getBrowserInfo()
  let browserUA = 'RelotteryApp/9.2 WAP/2.0 (' + browser.name + '/' + browser.version + ')'
  param.headers['HONGCAI-UA'] = param.headers['HONGCAI-UA'] || store.state.appUserInfo['User-Agent'] || browserUA
  /*
   * 客户端H5Login回调返回的信息，User-id, User-tk
   */
  if (store.state.appUserInfo['User-id']) {
    param.headers['User-id'] = store.state.appUserInfo['User-id']
    param.headers['User-tk'] = store.state.appUserInfo['User-tk'] || store.state.appUserInfo['token']
  }
  /*
   * 客户端手机号登录
   */
  if (store.state.appUserInfo['Login-Type']) {
    param.headers['Login-Type'] = store.state.appUserInfo['Login-Type']
  }
  /*
   * iOS匿名账号登录
   */
  if (store.state.appUserInfo['A-Id']) {
    param.headers['A-Id'] = store.state.appUserInfo['A-Id']
  }
  /*
   * 设置设备号
   */
  if (!param.headers['Device-Id'] && store.state.appUserInfo['Device-Id']) {
    param.headers['Device-Id'] = /iphone/g.test(window.navigator.userAgent) ? store.state.appUserInfo['Device-Id'] : encodeURIComponent(store.state.appUserInfo['Device-Id'])
  }
  /*
   * 设置数据格式
   */
  axios.defaults.headers.post['Content-Type'] = param.headers['Content-Type'] || 'application/x-www-form-urlencoded;charset=UTF-8'
  /*
   * 数据格式转换
   */
  param['transformRequest'] = function (data) {
    if (!data || typeof data !== 'object' || param.headers['Content-Type']) {
      return data
    }
    let arr = []
    for (let key in data) {
      arr.push(key + '=' + encodeURIComponent(typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key]))
    }
    return arr.join('&')
  }
  // 设置超时15秒
  axios.defaults.timeout = 15000
  // Promise返回axios获取的数据对象
  return axios(param).then(resp => {
    if (resp.status && resp.status === 200) {
      return Promise.resolve(resp.data)
    } else {
      return Promise.reject(resp)
    }
  }, err => {
    return Promise.reject(err)
  })
}
