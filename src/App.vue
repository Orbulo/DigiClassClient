<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { SessionStorage } from 'quasar';
import { mapActions } from 'vuex';

export default {
  name: 'App',
  created() {
    const token = SessionStorage.getItem('token');
    const userId = SessionStorage.getItem('userId');
    const currentClassroomId = SessionStorage.getItem('currentClassroomId');
    if (token) {
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
