<template>
  <div>
    <div v-if="!onConfirm">
      <h1>Sign Up</h1>
      <input v-model="email" type="text" placeholder="Email" /><br />
      <input v-model="password" type="text" placeholder="Password" /><br />
      <button @click="submit">Submit</button>
    </div>

    <div v-if="onConfirm">
      <h2>Confirm Sign Up</h2>
      <p>
        We have emailed you a verification code to confirm your account. Please
        check your email and type in the verification code.
      </p>
      <input v-model="code" type="text" placeholder="Code" /><br />
      <button @click="confirm">Submit</button>
    </div>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify';
export default {
  name: 'SignUp',
  data() {
    return {
      password: '',
      email: '',
      onConfirm: false,
      code: ''
    };
  },
  methods: {
    submit() {
      Auth.signUp({
        username: this.email,
        password: this.password,
        attributes: {
          email: this.email
        }
      })
        .then(data => {
          console.log('Submit data:', data);
          this.onConfirm = true;
        })
        .catch(err => console.log('Submit Error:', err));
    },
    confirm() {
      // After retrieveing the confirmation code from the user
      Auth.confirmSignUp(this.email, this.code, {
        // Optional. Force user confirmation irrespective of existing alias. By default set to True.
        forceAliasCreation: true
      })
        .then(data => {
          this.$router.push('/login');
        })
        .catch(err => console.log('Confirm Error:', err));
    }
  }
};
</script>

<style lang="scss" scoped></style>