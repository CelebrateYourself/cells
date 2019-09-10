import { apiURL } from '../../config'
import apiCall from '../../util/api'

import { LOAD_MAP, LOAD_MAP_LIST } from '../actions/squares'


const URL = `${ apiURL }/squares`

export default {
  strict: true,
  namespaced: true,

  state: {
    maps: [],
    current: null,
  },

  getters: {
    mapList: (state) => state.maps,
    currentMap: (state) => state.current,
  },

  mutations: {
    [LOAD_MAP_LIST]: (state, payload) => {
      state.maps = payload
    },
    [LOAD_MAP]: (state, payload) => {
      state.current = payload
    }
  },

  actions: {
    [LOAD_MAP_LIST]: async ({ commit }) => {
      const maps = await apiCall.get(`${ URL }/maps/`)
        .then(result => result.data)
      commit(LOAD_MAP_LIST, maps)
    },
    [LOAD_MAP]: async ({ commit }, slug) => {
      const current = await apiCall.get(`${ URL }/maps/${ slug }/`)
        .then(result => result.data)
      commit(LOAD_MAP, current)
    }
  },
}
