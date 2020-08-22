<template>
  <div>
    <AppQuestion />
  </div>
</template>

<script>
import AppQuestion from "../components/AppQuestion";
<<<<<<< HEAD
=======
import { mapState } from 'vuex';
>>>>>>> 18ade55cfea2a1373d24162631d334f172c9e66a

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
