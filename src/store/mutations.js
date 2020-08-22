const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_CLASSROOMS(state, classrooms) {
    state.classrooms = classrooms;
  },
  ADD_CLASSROOM(state, classroom) {
    state.classrooms.push(classroom);
  },
  ADD_CHAT_MESSAGE(state, { message, userId }) {

  },
  ADD_QUESTION(state, { questionId, userId }) {

  },
  ADD_ANSWER(state, { answerId, userId }) {

  },
};

export default mutations;