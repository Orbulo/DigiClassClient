<template>
  <div>
    <AppQuestion
      v-for="({ upvotes, title, content, userId }, index) in questions"
      :upvotes="upvotes"
      :title="title"
      :content="content"
      :userId="userId"
      :key="index"
    />
  </div>
</template>

<script>
import AppQuestion from "../components/AppQuestion";
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: "ClassroomQuestionList",
  components: {
    AppQuestion
  },
  computed: {
    ...mapState(["currentClassroomId", "questions"]),
  },
  methods: {
    ...mapActions(['addQuestion']),
  },
  async created() {
    const classroomId = this.currentClassroomId;
    const { data: questions } =
      await this.$axios.get(`classrooms/${classroomId}/questions`);
    await Promise.all(questions.map(async (question) => {
      await this.addQuestion(question);
    }));
  }
};
</script>

<style scoped></style>
