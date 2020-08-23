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
    const userId = LocalStorage.getItem('userId');
    const currentClassroomId = LocalStorage.getItem('currentClassroomId');
    if (token && userId) {
      this.setToken(token);
      this.setUserId(userId);
    }
    if (currentClassroomId) {
      this.setCurrentClassroomId(currentClassroomId);
    }
  },
  methods: {
    ...mapActions(['setToken', 'setUserId', 'setCurrentClassroomId'])
  }
}
</script>
