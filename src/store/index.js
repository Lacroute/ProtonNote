import Vue from 'vue'
import Vuex from 'vuex'
import loadingModule from '@/store/modules/loading'
import { getAllNotes, getDecryptedNoteById, getNoteModel, createNote, updateNoteById, deleteNoteById } from '@/assets/notesApi'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    loading: loadingModule
  },

  state: {
    notes: [], // all the stored notes
    editMode: false, // flag for edit mode
    creationMode: false, // flag for creation mode
    draftNote: null // the note object manipulated by the viewer / editor
  },

  getters: {
    // helper to get the id of the draft note
    draftNoteId: state => {
      return state.draftNote === null ? null : state.draftNote.id
    },

    // helper to get the index of the draft note inside the notes array
    draftNoteIndex: state => {
      return state.notes.findIndex(n => n.id === state.draftNote.id)
    }
  },

  actions: {
    // feed the notes array with stored notes
    async getAllNotes ({ commit }) {
      commit('loading/setLoadingNotes', true)
      const notes = await getAllNotes()
      commit('loading/setLoadingNotes', false)
      commit('populate', notes)
    },

    // decrypt a note by its id
    async getDecryptedNote ({ commit, state }, payload) {
      if (state.editMode) return
      const decrypted = await getDecryptedNoteById(payload)
      commit('setDraftNote', decrypted) // remove dependency because of Array.find
    },

    // Abort edition
    cancelEdition ({ commit }) {
      commit('setDraftNote', null)
      commit('setCreationMode', false)
      commit('setEditMode', false)
    },

    // Create an empty note
    createDraftNote ({ commit }) {
      const newNote = getNoteModel()
      commit('setDraftNote', newNote)
      commit('setCreationMode', true)
      commit('setEditMode', true)
    },

    // Create or update a note and send it to the API
    async saveNote ({ commit, state, getters }) {
      commit('loading/setLoadingCreate', true)
      let note, create
      if (state.creationMode) {
        note = await createNote(state.draftNote)
        commit('setDraftNote', note) // update the draft note with the id from the API
        create = true
      } else {
        note = await updateNoteById(state.draftNote)
        create = false
      }
      commit('updateNotes', {create: create, index: getters.draftNoteIndex, data: note})
      commit('setEditMode', false)
      commit('setCreationMode', false)
      commit('loading/setLoadingCreate', false)
    },

    // Delete a note in the API and locally
    async deleteNote ({ commit, getters }) {
      commit('loading/setLoadingDelete', true)
      await deleteNoteById(getters.draftNoteIndex)
      commit('removeNote', getters.draftNoteIndex)
      commit('setDraftNote', null)
      commit('setEditMode', false)
      commit('setCreationMode', false)
      commit('loading/setLoadingDelete', false)
    }
  },

  mutations: {
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
