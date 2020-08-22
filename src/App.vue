<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { LocalStorage } from 'quasar';
import { mapActions } from 'vuex';

export default {
  name: 'App',
  created() {
    const token = LocalStorage.getItem('token');
    if (token) {
      this.setToken(token);
    }
  },
  methods: {
    ...mapActions(['setToken'])
  }
}
</script>
