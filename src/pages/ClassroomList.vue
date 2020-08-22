<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>DigiClass</q-toolbar-title>
        <q-space />
        <q-btn
          flat
          round
          dense
          icon='add'
          @click='isCreateClassroomDialogVisible = true'
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page>
        <div class='classrooms__container'>
          <q-card
            v-for="(classroom, index) in classrooms"
            :key="index"
            @click='enterClassroom(classroom.id)'
          >
            <img src="https://cdn.quasar.dev/img/mountains.jpg" />
            <q-card-section>
              <div class='text-h6'>{{ classroom.name }}</div>
              <div class='text-subtitle2'>{{ classroom.code }}</div>
            </q-card-section>
          </q-card>
        </div>

        <q-dialog v-model='isCreateClassroomDialogVisible'>
          <q-card class='items-center q-pa-md'>
            <div class='text-h4'>Create Classroom</div>
            <q-input
              outlined
              placeholder="Mr. Xu's Biology Class"
              v-model='classroomName'
            />
            <q-input
              placeholder='BIO3D7'
              v-model='courseCode'
            />
          </q-card>
        </q-dialog>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ClassroomList',
  data: () => ({
    isCreateClassroomDialogVisible: false,
    classroomName: '',
    classroomCode: '',
    classrooms: [
      {
        id: 0,
        code: 'ENG3D7',
        name: 'Grade 11 English',
      },
      {
        id: 1,
        code: 'FSF3D7',
        name: 'Grade 11 French',
      }
    ]
  }),
  async created() {
    const { data } = await this.$axios.get('classrooms');
    this.setClassrooms(data);
  },
  methods: {
    ...mapActions(['addClassroom', 'setClassrooms']),
    async enterClassroom(id) {
      const { data } = await this.$axios.get(`classrooms/${id}`);
      console.log(data);
    },
    async addClassroom() {
      const { data } = await this.$axios.post('classrooms', {
        code: this.classroomCode,
        name: this.classroomName,
      });
      await this.addClassroom({
        id: data.classroomId,
        code: this.classroomCode,
        name: this.classroomName
      });
    }
  }
}
</script>

<style scoped>
.classrooms__container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  padding: 20px;
}

.q-card {
  cursor: pointer;
}
</style>
