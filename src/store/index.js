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
    students: {},
    token: '',
  },
  getters: {
    currentClassroom: state => id => {
      return state.classrooms.filter((classroom) => id === classroom.id)[0];
    }
  },
  mutations,
  actions,
});

