import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';
import store from '../store';

Vue.use(new VueSocketIO({
  debug: true,
  connection: process.env.VUE_APP_SERVER_URL,
  vuex: {
    store,
    actionPrefix: 'socket',
  },
}))
