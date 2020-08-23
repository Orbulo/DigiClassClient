<template>
  <q-card class="q-pa-md column items-center">
    <h3 class="text-weight-bold">Register</h3>
    <q-card class='column items-center'>
      <q-input
        label='Full Name'
        class='q-mb-md q-card'
        v-model='fullName'
        outlined
      >
        <template v-slot:prepend>
          <q-icon name='account_circle' />
        </template>
      </q-input>
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
        label="Register"
        @click="onRegister"
      />
      <router-link to='/login'>Already have an account?</router-link>
    </q-card>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "SignUp",
  data() {
    return {
      fullName: '',
      email: '',
      password: ''
    };
  },
  methods: {
    ...mapActions(['setToken', 'setUserId']),
    async onRegister() {
      const { data } = await this.$axios.post("auth/register", {
        fullName: this.fullName,
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
</style>
