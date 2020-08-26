<template lang="html">
  <div class="note-view">
    <p v-if="decryptedNote === null || decryptedNote === undefined">
      Welcome to ProtonNote
    </p>
    <div
      v-else
      class="display">
      <h1>{{ decryptedNote.title }}</h1>
      <div class="editor">
        <textarea
          :readonly="!editMode"
          ref="textareaEditor"
          rows="8"
          v-model="noteContent"
          >
        </textarea>
        <note-editor-controllers />
      </div>
    </div>
  </div>

</template>

<script>
import { mapState, mapGetters } from 'vuex'
import NoteEditorControllers from '@/components/NoteEditorControllers'

export default {
  name: 'NoteView',

  components: {
    NoteEditorControllers
  },

  data () {
    return {
      noteContent: null
    }
  },

  computed: {
    ...mapState(['decryptedNote', 'editMode']),
    ...mapGetters(['decryptedNoteId'])
  },

  watch: {
    decryptedNoteId: function (value) {
      this.noteContent = this.decryptedNote.encrypted.content
    },

    editMode: function (value) {
      if (value) this.$refs.textareaEditor.focus()
      else this.noteContent = this.decryptedNote.encrypted.content
    }
  }
}
</script>

<style lang="css">

.note-view{
  width: 100%;
  display: flex;
  flex-direction: column;
}

.note-view h1{
  border-bottom: 2px solid black;
  padding: 10px 20px;
  background: white;
}
.note-view .editor{
}

.note-view textarea{
  box-sizing: border-box;
  width: 100%;
  background: white
}
</style>
