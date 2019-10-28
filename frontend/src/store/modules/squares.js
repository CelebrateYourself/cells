import apiCall from '../../util/api'

import { LOAD_MAP, LOAD_MAP_LIST, MAKE_DRAFT } from '../actions/squares'


const URL = `/squares`

export default {
  strict: true,
  namespaced: true,

  state: {
    maps: [],
    current: null,
    draft: null,
  },

  getters: {
    mapList: state => state.maps,
    currentMap: state => state.current,
    myDraft: state => state.draft,
  },

  mutations: {
    [LOAD_MAP_LIST]: (state, payload) => {
      state.maps = payload
    },
    [LOAD_MAP]: (state, payload) => {
      state.current = payload
    },
    [MAKE_DRAFT]: (state, payload) => {
      state.draft = payload
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
    },
    [MAKE_DRAFT]: async ({ commit }, draft) => {
      commit(MAKE_DRAFT, draft)
    }
  },
}
