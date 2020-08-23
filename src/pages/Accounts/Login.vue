<template>
  <q-card class="q-pa-md column items-center">
    <h3 class="text-weight-bold">Login</h3>
    <q-card class='column items-center'>
      <q-input
        label="Email"
        class="q-mb-md q-card"
        v-model="email"
        outlined
      >
        <template v-slot:prepend>
          <q-icon name="email" />
        </template>
      </q-input>
      <q-input
        label="Password"
        type="password"
        class="q-mb-md q-card"
        v-model="password"
        outlined
      >
        <template v-slot:prepend>
          <q-icon name="lock" />
        </template>
      </q-input>
      <q-btn
        color="primary"
        class="q-my-md q-card"
        label="Login"
        @click="onLogin"
      />
      <router-link to='/signup'>Don't have an account?</router-link>
    </q-card>
  </q-card>

</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(['setToken', 'setUserId']),
    async onLogin() {
      const { data } = await this.$axios.post("auth/login", {
        email: this.email,
        password: this.password
      });
      const { userId, token } = data;
      this.setToken(token);
      this.setUserId(userId);
      await this.$router.push('/classrooms');
    }
  }
};
</script>

<style lang="scss" scoped>
.q-card {
  min-width: 400px;
}
.parent {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
