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
        {{ decryptedNote.encrypted.content}}
      </div>
    </div>
  </div>

</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NoteView',

  computed: {
    ...mapState(['decryptedNote'])
  }
}
</script>

<style lang="css">

.note-view{
  background: lightgray;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.note-view h1{
  border: 2px solid black;
  border-bottom: none;
  padding: 10px 20px;
  background: white;
}
.note-view .editor{
  border: 2px solid black;
  background: white;
}
</style>
