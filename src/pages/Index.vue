<template lang="html">
  <section class="page-index">
    <header>
      <new-note />
    </header>
    <section class="container-flex">
      <div class="scrollable">
        <NoteList />
      </div>
      <div class="container-editor">
        <NoteView />
      </div>
    </section>
  </section>
</template>

<script>
import NoteList from '@/components/NoteList'
import NoteView from '@/components/NoteView'
import NewNote from '@/components/NewNote'

export default {
  name: 'Index',

  components: {
    NoteList,
    NoteView,
    NewNote
  }
}
</script>

<style lang="css">
.page-index header{
  border: 2px solid black;
  border-bottom: none;
  background: lightgray;
  padding: 10px;
}

.container-flex{
  background: lightgray;
  display: flex;
  flex: 1;
  border: 2px solid black;
}

.container-flex .scrollable{
  overflow-y: scroll;
  width: 100%;
  min-height: 300px;
}

.container-flex .container-editor{
  width: 100%;
  border-left: 2px solid black;
}
</style>
