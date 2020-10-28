import Vue from 'vue'
import toastComponent from './Toast.vue'
const ToastConstructor = Vue.extend(toastComponent)
let isShow = false
const instances = []

function Toast (options = {}) {
  const duration = options.duration || 2000
  const icon = options.icon || null
  const instance = new ToastConstructor({
    el: document.createElement('div')
  })
  instance.message = typeof options === 'string' ? options : options.message
  instance.duration = duration
  instance.icon = icon
  instance.overlay = options.overlay || false
  instances.push(instance)
  const show = (instanceObj) => {
    if (!instanceObj) return
    isShow = true
    document.body.appendChild(instanceObj.$el)
    Vue.nextTick(function () {
      instanceObj.visible = true
      setTimeout(() => {
        document.body.removeChild(instanceObj.$el)
        instances.splice(instances.findIndex(item => item === instanceObj), 1)
        next()
      }, instanceObj.duration)
    })
  }
  const next = () => {
    if (instances.length === 0) {
      isShow = false
      return
    }
    show(instances[0])
  }
  if (!isShow) {
    next()
  }
}

export default Toast
