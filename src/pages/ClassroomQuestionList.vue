<template>
  <div class='column items-center'>
    <q-btn
      class='q-mt-md'
      label='Post a Question'
      @click='isPostQuestionDialogVisible = true'
    />
    <div style='align-self: stretch'>
      <AppQuestion2
        v-for="({ upvotes, title, content, userId, id }, index) in questions"
        :id='id'
        :upvotes="upvotes"
        :title="title"
        :content="content"
        :userId="userId"
        :answered='false'
        :verified='false'
        :key="index"
      />
    </div>
    <q-dialog
      v-model='isPostQuestionDialogVisible'
    >
      <q-card class='q-pa-md'>
        <q-input
          outlined
          label='Question Title'
          v-model='questionTitle'
          class='q-mb-md'
        />
        <q-editor
          v-model="questionDetails"
          flat
          placeholder='Provide all the details needed for others to understand your question...'
          content-class="bg-amber-3"
          toolbar-text-color="white"
          toolbar-toggle-color="yellow-8"
          toolbar-bg="primary"
          :toolbar="[
        ['bold', 'italic', 'underline'],
        [
          {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: ['p', 'h3', 'h4', 'h5', 'h6']
          }
        ]
      ]"
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
import AppQuestion2 from "../components/AppQuestion2";
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: "ClassroomQuestionList",
  components: {
    AppQuestion2
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
