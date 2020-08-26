<template lang="html">
  <div class="note-list">
    {{ notes }}
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NoteList',

  computed: {
    ...mapState(['notes'])
  },

  created () {
    this.$store.dispatch('getAllNotes')
  }
}
</script>

<style lang="css">
</style>
