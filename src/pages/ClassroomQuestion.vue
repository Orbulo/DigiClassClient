<template>
  <div>
    <AppQuestion2
      :id='question.id'
      :upvotes="question.upvotes"
      :title="question.title"
      :content="question.content"
      :userId="question.userId"
      :answered='false'
      :verified='false'
    />
    <NewAnswer2
      v-for="({ upvotes, content, userId, id }, index) in answers"
      :id='id'
      :upvotes='upvotes'
      :content='content'
      :userId='userId'
      :key='index'
    />
  </div>
</template>

<script>
import AppQuestion2 from "../components/AppQuestion2";
import NewAnswer2 from "../components/NewAnswer2";
import { mapState, mapGetters } from 'vuex';

export default {
  name: "ClassroomQuestionList",
  components: {
    AppQuestion2,
    NewAnswer2
  },
  computed: {
    ...mapGetters(['questionById', 'questionAnswers']),
    question() {
      return this.questionById(this.$route.params.questionId);
    },
    answers() {
      return this.questionAnswers(this.$route.params.questionId).sort(
        (ans1, ans2) => ans1.upvotes = ans2.upvotes
      );
    }
  },
};
</script>

<style scoped></style>
