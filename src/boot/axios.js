import Vue from 'vue';
import axiosInstance from '../axios';

Vue.prototype.$axios = axiosInstance;

export default axiosInstance;
