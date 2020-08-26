<template lang="html">
  <div class="container-flex">
    <NoteList />
    <NoteView />
  </div>
</template>

<script>
import NoteList from '@/components/NoteList'
import NoteView from '@/components/NoteView'

export default {
  name: 'Index',

  components: {
    NoteList,
    NoteView
  }
}
</script>

<style lang="css">
.container-flex{
  display: flex;
  flex: 1;
}
</style>
