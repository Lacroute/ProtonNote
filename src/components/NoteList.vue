<template lang="html">
  <div class="note-list">
    <div class="loading" v-if="loading">
      <p>loading...</p>
    </div>
    <note-preview
      v-else
      v-for="note in notes"
      :key="note.id"
      :id="note.id"
      :title="note.title"
      />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NotePreview from '@/components/NotePreview'

export default {
  name: 'NoteList',

  components: {
    NotePreview
  },

  computed: {
    ...mapState(['notes', 'loading'])
  },

  created () {
    this.$store.dispatch('getAllNotes')
  }
}
</script>

<style lang="css">
  .note-list{
    width: 100%;
  }
</style>
