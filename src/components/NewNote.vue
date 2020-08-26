<template lang="html">
  <div class="new-note">
    <button type="button" @click="createDraftNote" :disabled="editMode">+ New note</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'NewNote',

  computed: {
    ...mapState(['editMode'])
  },

  methods: {
    ...mapActions(['createDraftNote'])
  }
}
</script>

<style lang="css">

.new-note button{
  background: blue;
  color: white;
  border: 1px solid black;
  box-shadow: 2px 2px black;
  font-weight: bold;
  padding: 3px 6px;
}

.new-note button[disabled]{
  background: dimgray;
  color: darkgray;
}
</style>
