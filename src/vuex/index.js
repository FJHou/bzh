import Vue from 'vue'
import Vuex from 'vuex'
import creatLogger from 'vuex/dist/logger'

Vue.use(Vuex)
// 需要维护的状态
// 初始化 state
const state = {
  isLogin: false,
  showLoginView: false,
  gloListCurrentIndex: 0,
  gloList: [],
  enjoyListCurrentIndex: 0,
  enjoyList: []
  // attentionStatus: gloList[gloListCurrentIndex]
}
// 初始化 mutations
const mutations = {
  IS_LOGIN (state, isLogin = false) {
    state.isLogin = isLogin
  },

  SHOW_LOGIN_VIEW (state, isShow = false) {
    state.showLoginView = isShow
  },

  SET_GLO_LIST_INDEX (state, index) {
    state.gloListCurrentIndex = index
  },

  SET_GLO_LIST (state, list) {
    state.gloList = list
  },
  // 全球资产配置的关注状态
  SET_ATTENTION_STATUS (state, value) {
    if (!state.gloList) {
      return
    }
    state.gloList[state.gloListCurrentIndex]['attention'] = value
  },

  SET_ENJOY_LIST_INDEX (state, index) {
    state.enjoyListCurrentIndex = index
  },

  SET_ENJOY_LIST (state, list) {
    state.enjoyList = list
  },

  SET_ENJOY_ATTENTION_STATUS (state, value) {
    if (!state.gloList) {
      return
    }
    state.enjoyList[state.enjoyListCurrentIndex]['attention'] = value
  }
}
// 初始化 actions
const actions = {
  gloStatusChange ({commit, state}, {index, status}) {
    commit('SET_GLO_LIST_INDEX', index)
    commit('SET_ATTENTION_STATUS', status)
  },

  enjoyStatusChange ({commit, state}, {index, status}) {
    commit('SET_ENJOY_LIST_INDEX', index)
    commit('SET_ENJOY_ATTENTION_STATUS', status)
  }
}

const getters = {
  isLogin: (state) => {
    return state.isLogin
  },
  showLoginView: (state) => {
    return state.showLoginView
  },
  gloList: (state) => {
    return state.gloList
  },
  currentStatus: (state) => {
    return state.gloList[state.gloListCurrentIndex]
  },
  enjoyList: (state) => {
    return state.enjoyList
  },
  enjoyCurrentStatus: (state) => {
    return state.enjoyList[state.enjoyListCurrentIndex]
  }
}

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  strict: debug,
  plugins: debug ? [creatLogger()] : []
})
