import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default new Vuex.Store({
  state: {
    currentClassroomId: 0,
    classrooms: [],
    chatMessages: [],
    questionAnswers: {},
    questions: [{ upvotes: 1, title: "Question 1", content: "Question 1 Content", userId: "userId1"}],
    userIds: [],
    userMap: {},
    token: '',
    userId: '',
  },
  getters: {
    currentClassroom: state => id => {
      return state.classrooms.find((classroom) => id === classroom.id);
    },
    questionById: state => questionId => {
      return state.questions.find((question) => question.id === questionId);
    },
    questionAnswers: state => questionId => {
      return state.questionAnswers[questionId];
    },
    populatedQuestions: state => {
      return state.questions.map((question) => {
        return {
          ...question,
          user: state.userMap[question.userId],
        };
      });
    },
  },
  mutations,
  actions,
});

