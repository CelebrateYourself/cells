import Vue from 'vue'
import Vuex from 'vuex'

import squares from './modules/squares'


Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {},
  getters: {},
  mutations: {},
  modules: {
    squares,
  },
})