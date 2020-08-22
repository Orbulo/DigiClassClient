<template>
  <div>
    <AppQuestion />
  </div>
</template>

<script>
import AppQuestion from "../components/AppQuestion";
import { mapState } from 'vuex';

export default {
  name: "ClassroomQuestionList",
  components: {
    AppQuestion
  },
  computed: {
    ...mapState(['currentClassroomId'])
  },
  created() {
    const classroomId = this.currentClassroomId;
    const { data } = this.$axios.get(`classrooms/${classroomId}/questions`);
    console.log(data);
  }
};
</script>

<style scoped></style>
