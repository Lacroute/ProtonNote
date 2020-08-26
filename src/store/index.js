import Vue from 'vue'
import Vuex from 'vuex'
import { getAllNotes, getDecryptedNoteById, createEmptyNote, createNote, updateNote } from '@/assets/notesApi'
import clonedeep from 'lodash.clonedeep'

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
      commit('setDraftNote', clonedeep(decrypted)) // remove dependency because of Array.find
    },

    cancelEdition ({ commit }) {
      commit('setDraftNote', null)
      commit('setCreationMode', false)
      commit('setEditMode', false)
    },

    createDraftNote ({ commit }) {
      const newNote = createEmptyNote()
      commit('setDraftNote', newNote)
      commit('setCreationMode', true)
      commit('setEditMode', true)
    },

    async saveNote ({ commit, state }) {
      let note, create
      if (state.creationMode) {
        note = await createNote(state.draftNote)
        create = true
      } else {
        note = await updateNote(state.draftNote)
        create = false
      }
      commit('updateNotes', {create: create, data: note})
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

    updateNotes (state, payload) {
      if (payload.create) state.notes.unshift(payload.data)
      else state.notes[state.notes.findIndex(n => n.id === payload.data.id)] = payload.data
    }
  },

  strict: debug
})

export default store
