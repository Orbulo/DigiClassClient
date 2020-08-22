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
  ADD_USER(state, { userId, user }) {
    Vue.set(state.users, userId, user);
  },
  ADD_CHAT_MESSAGE(state, { message, userId }) {
    state.chatMessages.push({ message, userId });
  },
  ADD_QUESTION(state, { questionId, question, userId }) {
    Vue.set(state.questions, questionId, { question, userId });
  },
  ADD_ANSWER(state, { answerId, answer, userId }) {
    Vue.set(state.answers, answerId, { answer, userId });
  },
  SET_USER_ID(state, userId) {
    state.userId = userId;
  }
};

export default mutations;
