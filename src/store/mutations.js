import Vue from 'vue';

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_CURRENT_CLASSROOM_ID(state, classroomId) {
    state.currentClassroomId = classroomId;
  },
  SET_CLASSROOMS(state, classrooms) {
    state.classrooms = classrooms;
  },
  ADD_CLASSROOM(state, classroom) {
    state.classrooms.push(classroom);
  },
  POPULATE_USER(state, { userId, user }) {
    Vue.set(state.userMap, userId, user);
  },
  ADD_CHAT_MESSAGE(state, { message, userId }) {
    state.chatMessages.push({ message, userId });
  },
  ADD_QUESTION(state, question) {
    state.questions.push(question);
  },
  ADD_ANSWER(state, answer) {
    if (!state.questionAnswers[answer.questionId]) {
      Vue.set(state.questionAnswers, answer.questionId, []);
    }
    state.questionAnswers[answer.questionId].push(answer);
  },
  SET_USER_ID(state, userId) {
    state.userId = userId;
  }
};

export default mutations;
