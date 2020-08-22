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
              <div class='text-subtitle2'>{{ classroom.courseCode }}</div>
            </q-card-section>
          </q-card>
        </div>

        <q-dialog v-model='isCreateClassroomDialogVisible'>
          <q-card class='column items-stretch q-pa-md'>
            <div class='text-h4 q-mb-md'>Create Classroom</div>
            <q-input
              outlined
              placeholder="Mr. Xu's Biology Class"
              v-model='classroomName'
              class='q-mb-md'
            />
            <q-input
              outlined
              placeholder='BIO3D7'
              v-model='courseCode'
            />
            <q-btn
              class='q-mx-auto q-mt-md'
              label='Create Classroom'
              @click='createClassroom'
            />
          </q-card>
        </q-dialog>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ClassroomList',
  data: () => ({
    isCreateClassroomDialogVisible: false,
    classroomName: '',
    courseCode: '',
  }),
  async created() {
    const { data } = await this.$axios.get('classrooms');
    this.setClassrooms(data);
  },
  computed: {
    ...mapState(['classrooms']),
  },
  methods: {
    ...mapActions(['addClassroom', 'setClassrooms', 'setCurrentClassroomId']),
    async enterClassroom(id) {
      const { data } = await this.$axios.get(`classrooms/${id}`);
      this.setCurrentClassroomId(id);
      await this.$router.push('/discussion');
    },
    async createClassroom() {
      const { data } = await this.$axios.post('classrooms', {
        courseCode: this.courseCode,
        name: this.classroomName,
      });
      await this.addClassroom({
        id: data.classroomId,
        courseCode: this.courseCode,
        name: this.classroomName
      });
      this.isCreateClassroomDialogVisible = false;
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
