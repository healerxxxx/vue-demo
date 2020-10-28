/* eslint-disable */

var Scroller = function(ele, callback, options) {
  this.callback = callback
  if (!ele) {
    throw new Error('no element can bind event')
  }
  var defaultOptions = {
    isMove: false,
    startX: 0, // 初始X坐标
    startY: 0, // 初始Y坐标
    maxScrollLeft: 0, // 最大左滚动
    maxScrollTop: 0, // 最大上滚动
    scrollLeft: 0, // 左滚动值
    scrollTop: 0, // 上滚动值
    lastScrollLeft: 0, // 记录上次左滚动
    lastScrollTop: 0, // 记录上次上滚动
    scrollingX: false, // 是否可左右滑动
    scrollingY: true, // 是否可上下滑动
    start: null, // touchstart 回调函数
    move: null, // touchmove 回调函数
    end: null, // touchend 回调函数
    startTime: null, // 按下的时间
    diffX: 0, // 当前X坐标移动量
    diffY: 0, // 当前Y坐标移动量
    time: null, // 用于
    easeFun: null,
    isEasIng: false
  }
  for (var key in defaultOptions) {
    this[key] = defaultOptions[key]
  }
  for (var key in options) {
    this[key] = options[key]
  }
  ele.addEventListener('touchstart', this.touchStart.bind(this), false)
  ele.addEventListener('touchmove', this.touchMove.bind(this), false)
  ele.addEventListener('touchend', this.touchEnd.bind(this), false)
  ele.addEventListener('touchcancle', this.touchEnd.bind(this), false)
}

function isFunction(obj) {
  return Object.prototype.toString.call(obj) === '[object Function]'
}

// requestAnimationFrame的兼容处理
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = function(fn) {
    return setTimeout(fn, 17)
  }
}
if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = function(id) {
    clearTimeout(id)
  }
}

function animation(beginX, endX, beginY, endY, during, callback) {
  if (beginX === endX && beginY === endY) {
    return false
  }

  var start = 0
  var beginX = beginX
  var endX = endX
  var beginY = beginY
  var endY = endY
  var during = Math.floor(during / 16)
  var req
  var tween = function(t, b, c, d) {
    if (b === c) {
      return c
    }
    return -c * ((t = t / d - 1) * t * t * t - 1) + b
  }
  var step = function() {
    var valueX = tween(start, beginX, endX - beginX, during)
    var valueY = tween(start, beginY, endY - beginY, during)
    start++
    if (start <= during) {
      callback(valueX, valueY)
      req = requestAnimationFrame(step)
    } else {
      callback(endX, endY)
      cancelAnimationFrame(req)
    }
  }
  step()
  return function() {
    return req
  }
}

var members = {
  touchStart: function(event) {
    var self = this
    self.time = event.timeStamp
    if (self.easeFun) {
      self.isEasIng = false
      cancelAnimationFrame(self.easeFun())
    }
    if (self.start && isFunction(self.start)) {
      self.start(event)
    }
    var touches = event.targetTouches[0] || event.touches[0]
    self.startX = touches.pageX
    self.startY = touches.pageY
    self.lastScrollLeft = self.scrollLeft
    self.lastScrollTop = self.scrollTop
  },
  touchMove: function(event) {
    var self = this
    self.isMove = true
    if (self.move && isFunction(self.move)) {
      self.move(event)
    }
    var touches = event.targetTouches[0] || event.touches[0]
    self.diffX = touches.pageX - self.startX
    self.diffY = touches.pageY - self.startY
    if (self.scrollingX) {
      if (self.lastScrollLeft - self.diffX > self.maxScrollLeft) {
        self.scrollLeft = self.maxScrollLeft
      } else if (self.lastScrollLeft - self.diffX < 0) {
        self.scrollLeft = 0
      } else {
        self.scrollLeft = self.lastScrollLeft - self.diffX
      }
    } else {
      self.startX = touches.pageX
    }
    if (self.scrollingY) {
      if (self.lastScrollTop - self.diffY > self.maxScrollTop) {
        self.scrollTop = self.maxScrollTop
      } else if (self.lastScrollTop - self.diffY < 0) {
        self.scrollTop = 0
      } else {
        self.scrollTop = self.lastScrollTop - self.diffY
      }
    } else {
      self.startY = touches.pageY
    }
    self.callback(self.scrollLeft, self.scrollTop, event)
  },
  touchEnd: function(event) {
    var self = this
    if (self.end && isFunction(self.end)) {
      self.end(event)
    }
    var timeDiff = event.timeStamp - self.time

    function easeMove(moveX, moveY, time) {
      time = time || 0
      var toX = Math.round(self.scrollLeft - moveX)
      var toY = Math.round(self.scrollTop - moveY)
      var _x = toX > self.maxScrollLeft ? self.maxScrollLeft : toX < 0 ? 0 : toX
      var _y = toY > self.maxScrollTop ? self.maxScrollTop : toY < 0 ? 0 : toY
      self.isEasIng = true
      self.easeFun = animation(
        self.scrollLeft,
        _x,
        self.scrollTop,
        _y,
        time,
        function(left, top) {
          self.scrollLeft = Math.round(left)
          self.scrollTop = Math.round(top)
          self.callback(self.scrollLeft, self.scrollTop)
        }
      )
    }
    if (self.isMove) {
      self.isMove = false
      if (timeDiff < 300) {
        if (Math.abs(self.diffX) > Math.abs(self.diffY)) {
          if (self.scrollingX) {
            easeMove((self.diffX * 800) / timeDiff, 0, 700)
          }
        } else {
          if (self.scrollingY) {
            easeMove(0, (self.diffY * 800) / timeDiff, 700)
          }
        }
      } else if (timeDiff < 5000) {
        var diffX = (self.diffX * 100) / timeDiff
        var diffY = (self.diffY * 100) / timeDiff
        easeMove(self.scrollingX ? diffX : 0, self.scrollingY ? diffY : 0, 200)
      }
    }
  },
  setMaxScroll: function(left, top) {
    var self = this
    self.maxScrollLeft = left >= 0 ? left : 0
    self.maxScrollTop = top >= 0 ? top : 0
    if (self.scrollLeft > self.maxScrollLeft) {
      self.scrollLeft = self.maxScrollLeft
    }
    if (self.scrollTop > self.maxScrollTop) {
      self.scrollTop = self.maxScrollTop
    }
    this.callback(self.scrollLeft, self.scrollTop)
  },
  scrollTo: function(left, top) {
    var self = this
    self.scrollLeft = left < self.maxScrollLeft ? left : self.maxScrollLeft
    self.scrollTop = top < self.maxScrollTop ? top : self.maxScrollTop
    this.callback(self.scrollLeft, self.scrollTop)
  },
  getValues: function() {
    var self = this
    return {
      left: self.scrollLeft,
      top: self.scrollTop
    }
  }
}

for (var key in members) {
  Scroller.prototype[key] = members[key]
}

export default Scroller
