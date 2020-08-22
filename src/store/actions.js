import axios from 'axios';

const actions = {
  async addClassroom({commit}, {code, name}) {
    commit('ADD_CLASSROOM', {code, name});
  },
  async socketStudentJoined({ studentId }) {
    await axios.get(`classroom/${classroomId}/`)
  },
  async socketChatMessagePosted({ studentId, message }) {

  }
};

export default actions;
