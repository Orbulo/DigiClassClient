<template>
  <div>
    <q-btn
      label='Post a Question'
      @click='isPostQuestionDialogVisible = true'
    />
    <AppQuestion
      v-for="({ upvotes, title, content, userId, id }, index) in questions"
      :id='id'
      :upvotes="upvotes"
      :title="title"
      :content="content"
      :userId="userId"
      :key="index"
    />
    <q-dialog
      v-model='isPostQuestionDialogVisible'

    >
      <q-card>
        <q-input
          label='Question Title'
          v-model='questionTitle'
        />
        <q-input
          label='Question Details'
          v-model='questionDetails'
          placeholder='Provide all the details needed for others to understand your question...'
        />
        <q-btn
          label='Post Question'
          @click='postQuestion'
        />
      </q-card>
    </q-dialog>
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
  data: () => ({
    isPostQuestionDialogVisible: false,
    questionTitle: '',
    questionDetails: '',
  }),
  computed: {
    ...mapState(["currentClassroomId", "questions"]),
  },
  methods: {
    ...mapActions(['addQuestion']),
    async postQuestion() {
      const classroomId = this.currentClassroomId;
      await this.$axios.post(`classrooms/${classroomId}/questions`, {
        title: this.questionTitle,
        content: this.questionDetails,
      });
    }
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
