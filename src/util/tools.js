export const getUrlQuery = (name, url) => {
  url = url || window.location.href
  let reg = url.match(new RegExp('[?&]' + name + '=([^?&#]*)', 'i'))
  return reg ? reg[1] : null
}

/**
 * @description: 百分比转化
 * @param {type} val 要转化的小数 number 小数点后保留几位小数
 * @return: 百分数
 */
export const toPercent = ([val, number]) => {
  let n = number || 0
  return (val * 100).toFixed(n) + '%'
}

/**
 * @description: 获取红彩版本号
 * @return: 版本号
 */
export const getHongCaiVersion = () => {
  const _hong = window.navigator.userAgent.match(/hongcai\((.*)\)/)
  if (_hong && _hong[1]) {
    return parseInt(_hong[1].replace(/\./g, '')) || null
  } else {
    return null
  }
}

/**
 * @description 格式化时间
 * @date 2018-12-24
 * @param {String} dt 时间
 * @param {*} fmt 格式
 * @returns {String} 格式化后的时间
 */
export const formatDate = (dt, fmt, symbol) => {
  if (!dt) return symbol || ''
  let date = new Date(dt)
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}

export function rem2px () {
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  return width / 750
}
