import Vue from 'vue'
import Vuex from 'vuex'
import { getAllNotes, getDecryptedNoteById } from '@/assets/notesApi'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  state: {
    loading: true,
    notes: [],
    decryptedNote: null
  },

  getters: {
    selectedNoteId: state => {
      return state.decryptedNote === null ? null : state.decryptedNote.id
    }
  },

  actions: {
    async getAllNotes ({ commit }) {
      commit('loading', true)
      const notes = await getAllNotes()
      commit('loading', false)
      commit('populate', notes)
    },

    async getDecryptedNote ({ commit }, payload) {
      const decrypted = await getDecryptedNoteById(payload)
      commit('decryptNote', decrypted)
    }
  },

  mutations: {
    loading (state, payload) {
      state.loading = payload
    },

    populate (state, payload) {
      state.notes = payload
    },

    decryptNote (state, note) {
      state.decryptedNote = note
    }
  },

  strict: debug
})

export default store
