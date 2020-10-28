/*
 * @Description: 与红彩APP桥接函数，Android借用YiXinBridge，iOS采用iframe scheme形式桥接
 * @Company: Netease
 * @Author: lijida@corp.netease.com
 * @Date: 2018-07-31 12:04:36
 * @LastEditors: lijida
 * @LastEditTime: 2019-11-18 11:16:40
 */

import { NEJsbridge } from './YiXinBridge'

window.NEJsbridge = NEJsbridge

const bridge = (type, redirectType, data, callback) => {
  const ua = window.navigator.userAgent
  const setupWebViewJavascriptBridge = (cb) => {
    if (window.WebViewJavascriptBridge && cb) {
      return cb(window.WebViewJavascriptBridge)
    }
    if (window.WVJBCallbacks && cb) {
      return window.WVJBCallbacks.push(cb)
    }
    window.WVJBCallbacks = [cb]
    let WVJBIframe = document.createElement('iframe')
    WVJBIframe.style.display = 'none'
    WVJBIframe.src = 'https://__bridge_loaded__'
    document.documentElement.appendChild(WVJBIframe)
    setTimeout(() => {
      document.documentElement.removeChild(WVJBIframe)
    }, 0)
  }
  const initAndroidBridge = (bridge) => {
    if (type === 'call') {
      bridge.invoke(redirectType, data, function (res) {
        if (callback) {
          callback(res)
        }
      })
    }
    if (type === 'register') {
      bridge.call(redirectType, function (res) {
        if (callback) {
          callback(res)
        }
      })
    }
  }
  if (/iphone|ipad/i.test(ua)) {
    setupWebViewJavascriptBridge((bridge) => {
      if (type === 'call') {
        bridge.callHandler(redirectType, data, function (res) {
          if (callback) {
            callback(res)
          }
        })
      }
      if (type === 'register') {
        bridge.registerHandler(redirectType, function (res) {
          if (callback) {
            callback(res)
          }
        })
      }
    })
  }
  if (/android/gi.test(ua)) {
    initAndroidBridge(window.NEJsbridge)
  }
}

export default {
  call: (redirectType, data, callback) => {
    if (!redirectType) return
    let _data = typeof data !== 'function' ? data : ''
    callback = typeof data === 'function' ? data : callback
    bridge('call', redirectType, _data, callback)
  },
  register: (redirectType, callback) => {
    if (!redirectType) return
    bridge('register', redirectType, '', callback)
  }
}
