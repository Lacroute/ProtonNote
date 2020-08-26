export default {
  namespaced: true,

  state: () => ({
    loadingNotes: true,
    loadingCreate: false,
    loadingDelete: false
  }),

  mutations: {
    setLoadingNotes (state, payload) {
      state.loadingNotes = payload
    },

    setLoadingCreate (state, payload) {
      state.loadingCreate = payload
    },

    setLoadingDelete (state, payload) {
      state.loadingDelete = payload
    }
  }
}
