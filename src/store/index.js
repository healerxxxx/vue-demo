import Vue from 'vue'
import Vuex from 'vuex'
import service from '../util/service'
import Common from '../util/api/Common'
import jsBridge from '../util/jsBridge'

Vue.use(Vuex)

const state = {
  userInfo: '',
  appUserInfo: ''
}

const getter = {}

const mutations = {
  setUserInfo (state, userInfo) {
    state.userInfo = userInfo
  },
  setAppUserInfo (state, res) {
    state.appUserInfo = res
  }
}

const actions = {
  getAppUserInfo ({commit, rootState}) {
    jsBridge.call('h5Login', (res) => {
      commit('setAppUserInfo', res)
    })
  },
  getUserInfo ({commit, rootState}) {
    service(Common.userInfo).then((res) => {
      if (res.code === 200) {
        commit('setUserInfo', res.data)
      }
    })
  }
}

export default new Vuex.Store({
  state,
  getter,
  mutations,
  actions
})
