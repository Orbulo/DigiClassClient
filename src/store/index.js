import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  return new Vuex.Store({
    state: {
      currentClassroomId: null,
      classrooms: [],
      students: {},
      token: '',
    },
    getters: {
      currentClassroom: state => id => {
        return state.classrooms.filter((classroom) => id === classroom.id)[0];
      }
    },
    mutations: ,
    actions,
  })
}

