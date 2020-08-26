<template lang="html">
  <div class="note-list">
    <div class="loading" v-if="loadingNotes">
      <p>loading...</p>
    </div>
    <note-preview
      v-else-if="notes.length > 0"
      v-for="note in notes"
      :key="note.id"
      :id="note.id"
      :title="note.title"
      />
    <div
      v-else
      class="nothing-to-do">
      <p>To create a note click on the New note button</p>
    </div>
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
    ...mapState(['notes']),
    ...mapState('loading', ['loadingNotes'])
  },

  created () {
    this.$store.dispatch('getAllNotes')
  }
}
</script>

<style lang="css">
  .note-list{
    width: 100%;
    position: relative;
    height: 100%;
  }

  .note-list .nothing-to-do{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
