import Vue from 'vue'
import Vuex from 'vuex'
import { getAllNotes, getDecryptedNoteById, getNoteModel, createNote, updateNoteById, deleteNoteById } from '@/assets/notesApi'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  state: {
    loading: true,
    notes: [],
    editMode: false,
    creationMode: false,
    draftNote: null
  },

  getters: {
    draftNoteId: state => {
      return state.draftNote === null ? null : state.draftNote.id
    },

    draftNoteIndex: state => {
      return state.notes.findIndex(n => n.id === state.draftNote.id)
    }
  },

  actions: {
    async getAllNotes ({ commit }) {
      commit('loading', true)
      const notes = await getAllNotes()
      commit('loading', false)
      commit('populate', notes)
    },

    async getDecryptedNote ({ commit, state }, payload) {
      if (state.editMode) return
      const decrypted = await getDecryptedNoteById(payload)
      commit('setDraftNote', decrypted) // remove dependency because of Array.find
    },

    cancelEdition ({ commit }) {
      commit('setDraftNote', null)
      commit('setCreationMode', false)
      commit('setEditMode', false)
    },

    createDraftNote ({ commit }) {
      const newNote = getNoteModel()
      commit('setDraftNote', newNote)
      commit('setCreationMode', true)
      commit('setEditMode', true)
    },

    async saveNote ({ commit, state, getters }) {
      let note, create
      if (state.creationMode) {
        note = await createNote(state.draftNote)
        commit('setDraftNote', note) // to get back the id from the API
        create = true
      } else {
        note = await updateNoteById(state.draftNote)
        create = false
      }
      commit('updateNotes', {create: create, index: getters.draftNoteIndex, data: note})
      commit('setEditMode', false)
      commit('setCreationMode', false)
    },

    async deleteNote ({ commit, getters }) {
      await deleteNoteById(getters.draftNoteIndex)
      commit('removeNote', getters.draftNoteIndex)
      commit('setDraftNote', null)
      commit('setEditMode', false)
      commit('setCreationMode', false)
    }
  },

  mutations: {
    loading (state, payload) {
      state.loading = payload
    },

    populate (state, payload) {
      state.notes = payload
    },

    setDraftNote (state, payload) {
      state.draftNote = payload
    },

    setCreationMode (state, payload) {
      state.creationMode = payload
    },

    setEditMode (state, payload) {
      state.editMode = payload
    },

    updateDraftNoteTitle (state, payload) {
      state.draftNote.title = payload
    },

    updateDraftNoteContent (state, payload) {
      state.draftNote.encrypted.content = payload
    },

    updateNotes (state, { create, index, data }) {
      if (create) state.notes.unshift(data)
      else state.notes[index] = data
    },

    removeNote (state, payload) {
      state.notes.splice(payload, 1)
    }
  },

  strict: debug
})

export default store
