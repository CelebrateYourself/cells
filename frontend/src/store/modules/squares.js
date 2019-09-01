import http from 'axios'
import { apiURL } from '../../config'


const URL = `${ apiURL }/squares`

export default {
  strict: true,
  namespaced: true,

  state: {
    maps: [],
    current: null,
  },

  getters: {
    mapList: (state) => {
      return state.maps
    },
    currentMap: (state) => {
      return state.current
    }
  },

  mutations: {
    SET_MAPS: (state, payload) => {
      state.maps = payload
    },
    SET_CURRENT: (state, payload) => {
      state.current = payload
    }
  },

  actions: {
    FETCH_MAPS: async ({ commit }) => {
      const maps = await http.get(`${ URL }/maps/`)
        .then(result => result.data)
      commit('SET_MAPS', maps)
    },
    FETCH_MAP: async ({ commit }, slug) => {
      const current = await http.get(`${ URL }/maps/${ slug }/`)
        .then(result => result.data)
      commit('SET_CURRENT', current)
    }
  },
}
