import axiosInstance from '../axios';
import { LocalStorage } from 'quasar';
import Vue from 'vue';

const actions = {
  setToken({ commit }, token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    LocalStorage.set('token', token);
    commit('SET_TOKEN', token);
  },
  setUserId({ commit }, userId) {
    commit('SET_USER_ID', userId);
    LocalStorage.set('userId', userId);
  },
  setCurrentClassroomId({ commit }, classroomId) {
    LocalStorage.set('currentClassroomId', classroomId);
    Vue.prototype.$socket.emit('connectToClassroom', classroomId);
    commit('SET_CURRENT_CLASSROOM_ID', classroomId);
  },
  setClassrooms({ commit }, classrooms) {
    commit('SET_CLASSROOMS', classrooms);
  },
  addClassroom({commit}, {id, courseCode, name}) {
    commit('ADD_CLASSROOM', {id, courseCode, name});
  },
  async socketChatMessagePosted({ dispatch, state }, { userId, message }) {
    await dispatch('addChatMessage', { userId, message });
  },
  async addChatMessage({ commit, state, dispatch }, { userId, message }) {
    await dispatch('populateUser', userId);
    commit('ADD_CHAT_MESSAGE', { userId, message });
  },
  async populateUser({ state, commit }, userId) {
    if (!state.userMap[userId]) {
      const { data: user } = await axiosInstance.get(`classrooms/${state.currentClassroomId}/user/${userId}`);
      commit('POPULATE_USER', { userId, user });
    }
  },
  async addQuestion({ commit, dispatch }, question) {
    await dispatch('populateUser', question.userId);
    commit('ADD_QUESTION', question);
  },
  async setQuestions({ commit, dispatch }, questions) {
    commit('CLEAR_QUESTIONS');
    await Promise.all(questions.map(async(question) => {
      dispatch('addQuestion', question);
    }));
  },
  async addAnswer({ commit }, answer) {
    commit('ADD_ANSWER', answer);
  }
};

export default actions;
