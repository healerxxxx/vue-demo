<template>
  <div class="lottery-popup">
    <transition name="lottery-popup-fade">
      <div
        class="lottery-popup__overlay"
        v-show="overlay && visible"
        @click="closeOnClickOverlay && (visible = false)"
        @touchmove.prevent
        @mousewheel.prevent
        :style="_overlayStyle">
      </div>
    </transition>
    <transition :name="'lottery-popup-slide-' + position">
      <div
        class="lottery-popup__content"
        ref="conent"
        v-show="visible"
        :class="[`lottery-popup__content--${position}`, popClass, {'round': round}]"
        :style="_styles">
        <slot></slot>
        <div
          v-if="closeable"
          @click="visible = false"
          class="lottery-popup__content--close-icon"
          :class="[closeIconPosition, closeClass]"
          :style="_closeStyle">
          <img v-if="closeIcon" :src="closeIcon" />
          <i v-else></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
let context = 2000
export default {
  name: 'lottery-popup',
  props: {
    value: Boolean, // 双向绑定 v-model
    overlay: { // 是否需要遮罩层
      type: Boolean,
      default: true
    },
    overlayStyle: { // 遮罩层自定义样式
      type: Object
    },
    closeOnClickOverlay: { // 是否允许遮罩层点击关闭
      type: Boolean,
      default: true
    },
    popClass: { // 内容层自定义Class
      type: String
    },
    popStyle: { // 内容层样式
      type: Object
    },
    position: { // 出现的方向 center/top/right/bottom/left
      type: String
    },
    closeable: { // 是否出现关闭按钮
      type: Boolean,
      default: false
    },
    closeIconPosition: { // 关闭按钮位置 'top-right', 'top-left', 'bottom-left', 'bottom-right'
      type: String,
      default: 'top-right'
    },
    closeClass: { // 关闭按钮自定义class
      type: String,
      default: ''
    },
    closeStyle: { // 关闭按钮样式
      type: Object
    },
    closeIcon: { // 关闭按钮图片链接
      type: String,
      default: ''
    },
    round: { // 是否圆角，默认10px，不符合要求可在styles自定义设置
      type: Boolean,
      default: false
    },
    container: [String, Object] // 挂载节点，id 或者 class名 不传默认为body
  },
  data () {
    return {
      zIndex: 2000
    }
  },
  created () {
    context++
    this.zIndex = context
  },
  mounted () {
    if (!this.position) return
    this.$nextTick(() => {
      let ele = document.body
      if (this.container) {
        if (typeof this.container === 'string') {
          const _ele = this.getElement(this.container)
          if (_ele) {
            ele = _ele
          }
        } else {
          ele = this.container
        }
      }
      if (ele.append) {
        ele.append(this.$el)
      } else {
        ele.appendChild(this.$el)
      }
    })
  },
  computed: {
    visible: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    _overlayStyle () {
      const { overlayStyle, zIndex } = this
      let style = {
        opacity: this.opacity / 10,
        zIndex: zIndex - 1
      }
      if (Object.prototype.toString.call(overlayStyle) === '[object Object]') {
        style = { ...overlayStyle, ...style }
      }
      return style
    },
    _styles () {
      const { popStyle, zIndex } = this
      let style = {
        zIndex: zIndex
      }
      if (Object.prototype.toString.call(popStyle) === '[object Object]') {
        style = { ...popStyle, ...style }
      }
      return style
    },
    _closeStyle () {
      const { closeStyle } = this
      let style = {}
      if (Object.prototype.toString.call(closeStyle) === '[object Object]') {
        style = { ...closeStyle, ...style }
      }
      return style
    }
  },
  methods: {
    getElement (str) {
      if (/^\./.test(str)) {
        return document.querySelector(str)
      } else if (/^#/.test(str)) {
        return document.getElementById(str.replace('#', ''))
      } else {
        if (document.getElementById(str)) {
          return document.getElementById(str)
        } else if (document.querySelector(`.${str}`)) {
          return document.querySelector(`.${str}`)
        } else {
          return document.querySelector(str)
        }
      }
    }
  }
}
</script>

<style lang="scss">
.lottery-popup {
  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .7);
    transition: opacity .3s;
    opacity: 1;
  }
  &__content {
    position: fixed;
    max-height: 100%;
    overflow: hidden;
    background-color: #fff;
    opacity: 1;
    transition: transform .3s, opacity .3s;
    &--center {
      top: 50%;
      left: 50%;
      -webkit-transform: translate3d(-50%, -50%, 0);
      transform: translate3d(-50%, -50%, 0);
      opacity: 1;
      &.round {
        border-radius: 10px;
      }
    }
    &--top {
      top: 0;
      left: 0;
      width: 100%;
      &.round {
        border-radius: 0 0 10px 10px;
      }
    }
    &--bottom {
      bottom: 0;
      left: 0;
      width: 100%;
      &.round {
        border-radius: 10px 10px 0 0;
      }
    }
    &--left {
      top: 50%;
      left: 0;
      -webkit-transform: translate3d(0, -50%, 0);
      transform: translate3d(0, -50%, 0);
      &.round {
        border-radius: 0 10px 10px 0;
      }
    }
    &--right {
      top: 50%;
      right: 0;
      -webkit-transform: translate3d(0, -50%, 0);
      transform: translate3d(0, -50%, 0);
      &.round {
        border-radius: 10px 0 0 10px;
      }
    }
    &--close-icon {
      position: absolute;
      cursor: pointer;
      width: .8rem;
      height: .8rem;
      i {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -.1rem;
        margin-left: -.1rem;
        width: .2rem;
        height: .2rem;
        background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjOTk5OTk5IiBzdHJva2Utd2lkdGg9IjEuNSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2UtbGluZWNhcD0icm91bmQiPjxwYXRoIGQ9Ik0uNzU3Ljc1N0w5LjI0MyA5LjI0M00uNzU3IDkuMjQzTDkuMjQzLjc1NyIvPjwvZz48L3N2Zz4=');
        background-repeat: no-repeat;
        background-size: contain;
      }
      img {
        width: 100%;
        height: 100%;
        display: inline-block;
      }
      &.top-right {
        top: 0;
        right: 0;
      }
      &.top-left {
        top: 0;
        left: 0;
      }
      &.bottom-right {
        top: 0;
        right: 0;
      }
      &.bottom-left {
        top: 0;
        left: 0;
      }
    }
  }
  &-fade {
    &-enter-active, &-leave-active {
      opacity: 0;
    }
  }
  &-slide {
    &-top {
      &-enter-active, &-leave-active {
        transform: translate3d(0, -100%, 0);
      }
    }
    &-bottom {
      &-enter-active, &-leave-active {
        transform: translate3d(0, 100%, 0);
      }
    }
    &-left {
      &-enter-active, &-leave-active {
        transform: translate3d(-100%, -50%, 0);
      }
    }
    &-right {
      &-enter-active, &-leave-active {
        transform: translate3d(100%, -50%, 0);
      }
    }
    &-center {
      &-enter-active, &-leave-active  {
        opacity: 0;
      }
    }
  }
}
</style>
