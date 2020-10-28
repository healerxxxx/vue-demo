
if (typeof window.YixinEvent === 'undefined') {
  window.YixinEvent = function (type, detail) {
    let ev = document.createEvent('Event')
    ev.initEvent(type, true, true, detail)
    ev.detail = detail
    return ev
  }
}
let jsonRPCTag = 'jsonrpc'
let jsonRPCResultTag = 'result'
let jsonRPCErrorTag = 'error'
let jsonRPCIdTag = 'id'
let jsonRPCVer = '2.0'
let currentId = 0
let _callbacks = {}
export const jsonRPC = {}
window.jsonRPC = jsonRPC
let nativeReady = false
let base64encodechars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
function base64encode (str) {
  if (str === undefined) {
    return str
  }
  let out = ''
  let i = 0
  let len = str.length
  let c1
  let c2
  let c3
  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff
    if (i === len) {
      out += base64encodechars.charAt(c1 >> 2)
      out += base64encodechars.charAt((c1 & 0x3) << 4)
      out += '=='
      break
    }
    c2 = str.charCodeAt(i++)
    if (i === len) {
      out += base64encodechars.charAt(c1 >> 2)
      out += base64encodechars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4))
      out += base64encodechars.charAt((c2 & 0xf) << 2)
      out += '='
      break
    }
    c3 = str.charCodeAt(i++)
    out += base64encodechars.charAt(c1 >> 2)
    out += base64encodechars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4))
    out += base64encodechars.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6))
    out += base64encodechars.charAt(c3 & 0x3f)
  }
  return out
}
let UTF8 = {
  encode: function (string) {
    string = string.replace(/\r\n/g, '\n')
    let utftext = ''
    for (let n = 0; n < string.length; n++) {
      let c = string.charCodeAt(n)
      if (c < 128) {
        utftext += String.fromCharCode(c)
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192)
        utftext += String.fromCharCode((c & 63) | 128)
      } else {
        utftext += String.fromCharCode((c >> 12) | 224)
        utftext += String.fromCharCode(((c >> 6) & 63) | 128)
        utftext += String.fromCharCode((c & 63) | 128)
      }
    }
    return utftext
  },
  decode: function (utftext) {
    let string = ''
    let i = 0
    let c = 0
    let c2 = 0
    let c3 = 0
    while (i < utftext.length) {
      c = utftext.charCodeAt(i)
      if (c < 128) {
        string += String.fromCharCode(c)
        i++
      } else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1)
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63))
        i += 2
      } else {
        c2 = utftext.charCodeAt(i + 1)
        c3 = utftext.charCodeAt(i + 2)
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
        i += 3
      }
    }
    return string
  }
}

function CommandQueue () {
  this.backQueue = []
  this.queue = []
}

CommandQueue.prototype.dequeue = function () {
  if (this.queue.length <= 0 && this.backQueue.length > 0) {
    this.queue = this.backQueue.reverse()
    this.backQueue = []
  }
  return this.queue.pop()
}

CommandQueue.prototype.enqueue = function (item) {
  this.backQueue.push(item)
}

Object.defineProperty(CommandQueue.prototype, 'length', {
  get: function () {
    return this.queue.length + this.backQueue.length
  }
})

let commandQueue = new CommandQueue()

function _nativeExec () {
  let command = commandQueue.dequeue()
  if (command) {
    nativeReady = false
    let jsoncommand = JSON.stringify(command)
    let _temp = prompt('yixinjsbridge://dispatch/' + base64encode(UTF8.encode(jsoncommand)), '')
    return _temp
  } else {
    return false
  }
}

function doCall (request, successCb, errorCb) {
  if (jsonRPCIdTag in request && typeof successCb !== 'undefined') {
    _callbacks[request.id] = {
      successCb: successCb,
      errorCb: errorCb
    }
  }
  commandQueue.enqueue(request)
  if (nativeReady) {
    _nativeExec()
  }
}

function doClose () {
  delete window.jsbridge
}

jsonRPC.call = function (method, params, successCb, errorCb) {
  let request = {
    jsonrpc: jsonRPCVer,
    method: method,
    params: params,
    id: currentId++
  }
  doCall(request, successCb, errorCb)
}

jsonRPC.notify = function (method, params) {
  let request = {
    jsonrpc: jsonRPCVer,
    method: method,
    params: params
  }
  doCall(request, null, null)
}

jsonRPC.close = function () {
  doClose()
}

jsonRPC.onMessage = function (message) {
  let response = message
  if (typeof response === 'object' &&
    jsonRPCTag in response &&
    response.jsonrpc === jsonRPCVer) {
    if (jsonRPCResultTag in response && _callbacks[response.id]) {
      let successCb = _callbacks[response.id].successCb
      delete _callbacks[response.id]
      successCb(response.result)
      return
    } else if (jsonRPCErrorTag in response && _callbacks[response.id]) {
      let errorCb = _callbacks[response.id].errorCb
      delete _callbacks[response.id]
      errorCb(response.error)
      return
    }
  }
}

jsonRPC.ready = function () {
  jsonRPC.nativeEvent.on('NativeReady', function (e) {
    nativeReady = false
    if (!_nativeExec()) {
      nativeReady = true
    }
  })
  jsonRPC.nativeEvent.Trigger('NativeReady')
  jsonRPC.nativeEvent.Trigger('NEJsbridgeReady')
}

jsonRPC.invokeFinish = function () {
  nativeReady = true
  _nativeExec()
}

jsonRPC.echo = function (message) {
  alert(message)
}

jsonRPC.nativeEvent = {}

jsonRPC.nativeEvent.Trigger = function (type, detail) {
  let ev = window.YixinEvent(type, detail)
  document.dispatchEvent(ev)
}

jsonRPC.nativeEvent.Trigger2 = function (type, detail) {
  let has = jsonRPC.nativeEvent.has(type)
  let ev = window.YixinEvent(type, detail)
  document.dispatchEvent(ev)
  if (!has) {
    let param = {
      type: type,
      detail: detail
    }
    jsonRPC.notify('trigger', JSON.stringify(param))
  }
}

let nativeEvent = {}

jsonRPC.nativeEvent.on = function (type, cb) {
  document.addEventListener(type, cb, false)
  if (!nativeEvent[type]) {
    nativeEvent[type] = 1
  }
}

jsonRPC.nativeEvent.once = function (type, cb) {
  document.addEventListener(type, function (e) {
    cb(e)
    document.removeEventListener(type)
  }, false)
}

jsonRPC.nativeEvent.off = function (type) {
  document.removeEventListener(type)
  delete nativeEvent[type]
}

jsonRPC.nativeEvent.off = function () {
  for (let key in nativeEvent) {
    jsonRPC.nativeEvent.off(key)
  }
  nativeEvent = {}
}

jsonRPC.nativeEvent.has = function (type) {
  return nativeEvent[type] === 1
}

export const NEJsbridge = {
  invoke: jsonRPC.call,
  call: jsonRPC.notify,
  on: jsonRPC.nativeEvent.on,
  off: jsonRPC.nativeEvent.off,
  emit: jsonRPC.nativeEvent.trigger
}
