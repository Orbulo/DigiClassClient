import Vue from 'vue';
import axios from 'axios';
import store from '../store';

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_SERVER_URL,
  headers: {
    Authorization: `Bearer ${store.token}`
  }
});

Vue.prototype.$axios = axiosInstance;
