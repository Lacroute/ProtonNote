<template lang="html">
  <div
    :class="['note-preview', {selected: isSelected}]"
    @click="getDecryptedNote(id)">
    <h2>{{ title }}</h2>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

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
    ...mapGetters(['selectedNoteId']),

    isSelected () {
      return this.selectedNoteId === this.id
    }
  },

  methods: {
    ...mapActions(['getDecryptedNote'])
  }
}
</script>

<style lang="css">
.note-preview{
  border: solid 2px black;
  padding: 10px 20px;
}
.note-preview + .note-preview{
  border-top: none;
}
.note-preview:hover, .note-preview.selected{
  background: lightblue;
  color: white;
}
.note-preview:hover{
  cursor: pointer;
}

</style>
