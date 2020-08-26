<template lang="html">
  <div
    :class="['note-preview', {selected: isSelected}, {disabled: editMode}]"
    @click="selectNote(id)">
    <h2>{{ title }}</h2>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'NotePreview',

  props: {
    title: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },

  computed: {
    ...mapState(['editMode', 'draftNote']),
    ...mapGetters(['draftNoteId']),

    isSelected () {
      return this.draftNoteId === this.id
    }
  },

  methods: {
    ...mapActions(['getDecryptedNote']),

    selectNote (id) {
      if (!this.editMode) {
        this.getDecryptedNote(id)
      }
    }
  }
}
</script>

<style lang="css">
.note-preview{
  padding: 10px 20px;
  border-right: 2px solid black;
  border-bottom: 2px solid black;
}
.note-preview, .note-preview.disabled:hover{
  background: white;
  color: black;
}
.note-preview:hover, .note-preview.selected, .note-preview.selected.disabled{
  background: lightblue;
  color: white;
}
.note-preview:hover{
  cursor: pointer;
}
.note-preview.disabled:hover{
  cursor: auto;
}

</style>
