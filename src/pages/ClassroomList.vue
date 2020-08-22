<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar-title>DigiClass</q-toolbar-title>
    </q-header>
    <q-page-container>
      <q-page>
        <q-card v-for="(classroom, index) in classrooms" :key="index">
          <img src="https://cdn.quasar.dev/img/mountains.jpg" />
          <q-card-section>
            <div class='text-h6'>{{ classroom.name }}</div>
            <div class='text-subtitle2'>{{ classroom.code }}</div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'ClassroomList',
  data: () => ({
    classrooms: [
      {
        code: 'ENG3D7',
        name: 'Grade 11 English',
      },
      {
        code: 'FSF3D7',
        name: 'Grade 11 French',
      }
    ]
  })
}
</script>

<style scoped></style>
