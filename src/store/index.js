import Vue from 'vue'
import Vuex from 'vuex'
import { getAllNotes } from '@/assets/notesApi'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  state: {
    notes: []
  },

  actions: {
    async getAllNotes ({ commit }) {
      const notes = await getAllNotes()
      commit('populate', notes)
    }
  },

  mutations: {
    populate (state, payload) {
      state.notes = payload
    }
  },

  strict: debug
})

export default store
