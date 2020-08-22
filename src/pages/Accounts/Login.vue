<template>
  <div>
    <div v-if="!signedIn">
      <!-- <amplify-authenticator /> -->
      <input v-model="email" type="text" name="" placeholder="Email" />
      <br />
      <input
        v-model="password"
        type="password"
        name=""
        placeholder="Password"
      />
      <br />
      <button @click="signIn">Sign In</button>
      <br />
      <button @click="signUp">Sign Up</button>
    </div>
    <div v-if="signedIn">
      <button @click="signOut">Sign Out</button>
      <h3>Username: {{ user.username }}</h3>
    </div>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify';
import { AmplifyEventBus } from 'aws-amplify-vue';
export default {
  name: 'Login',
  data() {
    return {
      signedIn: false,
      user: null,
      email: '',
      password: ''
    };
  },
  created() {
    this.findUser();
    AmplifyEventBus.$on('authState', info => {
      console.log('auth', info);
      if (info === 'signedIn') {
        this.findUser();
      } else {
        this.signedIn = false;
      }
    });
  },
  methods: {
    signIn() {
      Auth.signIn(this.email, this.password)
        .then(user => {
          this.signedIn = !!user;
          this.user = user;
        })
        .catch(err => console.log('signIn Error:', err));
    },
    signOut() {
      Auth.signOut()
        .then(data => {
          console.log(data);
          this.signedIn = !!data;
          this.user = null;
        })
        .catch(err => console.log('signOut Error:', err));
    },
    signUp() {
      this.$router.push('/signup');
    },
    async findUser() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        this.user = user;
        this.signedIn = true;
        console.log('user', user);
        const jwt = user
          .getSignInUserSession()
          .getIdToken()
          .getJwtToken();
        console.log('jwt', jwt);
      } catch (err) {
        console.log('Error in findUser', err);
        this.signedIn = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>