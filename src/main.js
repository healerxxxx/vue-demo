// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import './assets/scss/reset.css'
import './assets/scss/common.scss'
import './assets/scss/icon.scss'

import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import store from './store'
import service from './util/service'

Vue.config.productionTip = false
fastclick.attach(document.body)

import Toast from './components/Toast'
import Loading from './components/Loading'
import NoData from './components/NoData'
import Error from './components/Error'

Vue.$toast = Vue.prototype.$toast = Toast
Vue.$service = Vue.prototype.$service = service
Vue.component('loading', Loading)
Vue.component('no-data', NoData)
Vue.component('error', Error)

const EventBus = new Vue()
Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
})
