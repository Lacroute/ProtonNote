<template lang="html">
  <div class="note-editor-controllers">
    <div
      v-if="editMode"
      class="editing-controllers">
      <button  type="button" @click="setEditMode(false)">Cancel</button>
    </div>
    <div
      v-else
      class="non-editing-controllers">
      <button type="button" @click="setEditMode(true)">Edit</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'NoteEditorControllers',

  computed: {
    ...mapState(['editMode'])
  },

  methods: {
    ...mapMutations(['setEditMode'])
  }
}
</script>

<style lang="css">
.note-editor-controllers button{
  cursor: pointer;
}
</style>
