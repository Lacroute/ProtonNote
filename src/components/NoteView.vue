<template lang="html">
  <div class="note-view">
    <p v-if="draftNote === null">
      Welcome to ProtonNote
    </p>
    <div
    v-else
    class="display">
    <div class="editor">
      <input
      type="text"
      :readonly="!editMode"
      ref="titleEditor"
      v-model="draftNoteTitle"
      class="note-title"/>
      <textarea
      :readonly="!editMode"
      ref="contentTextEditor"
      v-model="draftNoteContent"
      rows="8"
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
    ...mapState(['draftNote', 'editMode', 'creationMode']),
    ...mapGetters(['draftNoteId']),

    draftNoteTitle: {
      get () {
        return this.$store.state.draftNote.title
      },
      set (value) {
        this.$store.commit('updateDraftNoteTitle', value)
      }
    },

    draftNoteContent: {
      get () {
        return this.$store.state.draftNote.encrypted.content
      },
      set (value) {
        this.$store.commit('updateDraftNoteContent', value)
      }
    }
  },

  watch: {
    draftNoteId: function (value) {
      this.initInputs()
    },

    editMode: function (value) {
      if (value) {
        // wait for the inputs to be rendered (if first action is new note)
        if (this.creationMode) this.$nextTick(() => this.$refs.titleEditor.focus())
        else this.$refs.contentTextEditor.focus()
      } else {
        this.initInputs()
      }
    }
  },

  methods: {
    initInputs () {
      if (this.editMode || this.draftNote !== null) {
        this.noteTitle = this.draftNote.title
        this.noteContent = this.draftNote.encrypted.content
      } else {
        this.noteTitle = null
        this.noteContent = null
      }
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

.note-view .note-title{
  border: none;
  border-bottom: 2px solid black;
  padding: 10px 20px;
  background: white;
  font-weight: bold;
  font-size: 1.2em;
  width: 100%;
  box-sizing: border-box;
}

.note-view textarea{
  box-sizing: border-box;
  width: 100%;
  background: white;
  border: none;
}
</style>
