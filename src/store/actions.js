import axiosInstance from '../axios';

const actions = {
  setToken({ commit }, token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    commit('SET_TOKEN', token);
  },
  setClassrooms({ commit }, classrooms) {
    commit('SET_CLASSROOMS', classrooms);
  },
  addClassroom({commit}, {id, code, name}) {
    commit('ADD_CLASSROOM', {id, code, name});
  },
  async socketStudentJoined({ studentId }) {
    await axios.get(`classroom/${classroomId}/`)
  },
  async socketChatMessagePosted({ studentId, message }) {

  }
};

export default actions;