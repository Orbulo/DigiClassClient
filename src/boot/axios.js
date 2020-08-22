import Vue from 'vue';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_SERVER_URL
});

Vue.prototype.$axios = axiosInstance;
