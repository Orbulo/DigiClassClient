<template>
  <q-card
    class='q-pa-md column items-center'
  >
    <h3 class='text-weight-bold'>Login</h3>
    <q-form>
      <q-input
        label='Email'
        class='q-mb-md'
        v-model='email'
        outlined
      />
      <q-input
        label='Password'
        type='password'
        class='q-mb-md'
        v-model='password'
        outlined
      >
        <template v-slot:prepend>
          <q-icon name='lock' />
        </template>
      </q-input>
      <q-btn
        class='q-my-md'
        label='Register'
        @click='onRegister'
      />
    </q-form>
    <router-link to='/register'>
      Don't have an account?
    </router-link>
  </q-card>
</template>

<script>
export default {
  name: 'SignUp',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async onRegister() {
      const { data } = await this.$axios.post('auth/register', {
        email: this.email,
        password: this.password,
      });
      const token = data.token;

    }
  }
};
</script>

<style lang="scss" scoped></style>
