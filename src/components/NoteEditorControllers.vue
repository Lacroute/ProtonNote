<template lang="html">
  <div class="note-editor-controllers">
    <div
      v-if="editMode"
      class="editing-controllers">
      <button type="button" @click="cancelEdition()" :disabled="disabled">Cancel</button>
      <button type="button" @click="saveNote()" :disabled="disabled">Save</button>
      <button type="button" @click="deleteNote()" :disabled="disabled">Delete</button>
    </div>
    <div
      v-else
      class="non-editing-controllers">
      <button type="button" @click="setEditMode(true)">Edit</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'NoteEditorControllers',

  computed: {
    ...mapState(['editMode']),
    ...mapState('loading', ['loadingCreate', 'loadingDelete']),

    disabled () {
      return this.loadingCreate || this.loadingDelete
    }
  },

  methods: {
    ...mapMutations(['setEditMode']),
    ...mapActions(['cancelEdition', 'saveNote', 'deleteNote'])
  }
}
</script>

<style lang="css">
.note-editor-controllers{
  border-top: solid 2px black;
}
</style>
