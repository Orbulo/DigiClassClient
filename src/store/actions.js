import axiosInstance from '../axios';

const actions = {
  setToken({ commit }, token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    commit('SET_TOKEN', token);
  },
  setUserId({ commit }, userId) {
    commit('SET_USER_ID', userId);
  },
  setCurrentClassroomId({ commit }, classroomId) {
    commit('SET_CURRENT_CLASSROOM_ID', classroomId);
  },
  setClassrooms({ commit }, classrooms) {
    commit('SET_CLASSROOMS', classrooms);
  },
  addClassroom({commit}, {id, code, name}) {
    commit('ADD_CLASSROOM', {id, code, name});
  },
  async socketChatMessagePosted({ dispatch }, { userId, message }) {
    await dispatch('addChatMessage', { userId, message });
  },
  async addChatMessage({ commit, state, dispatch }, { userId, message }) {
    await dispatch('addUser', userId);
    commit('ADD_CHAT_MESSAGE', { userId, message });
  },
  async addUser({ commit }, userId) {
    if (!state.users[userId]) {
      const { data: user } = await axiosInstance.get(`classrooms/${this.currentClassroomId}/user/${userId}`);
      commit('ADD_USER', { userId, user });
    }
  },
};

export default actions;
