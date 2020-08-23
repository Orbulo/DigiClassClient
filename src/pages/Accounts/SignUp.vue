<template>
  <q-card class="q-pa-md column items-center">
    <h3 class="text-weight-bold">Register</h3>
    <q-form>
      <q-input label="Email" class="q-mb-md q-card" v-model="email" outlined />
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
    </q-form>
  </q-card>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async onRegister() {
      const { data } = await this.$axios.post("auth/register", {
        email: this.email,
        password: this.password
      });
      const token = data.token;
    }
  }
};
</script>

<style lang="scss" scoped>
.q-card {
  min-width: 400px;
}
</style>
