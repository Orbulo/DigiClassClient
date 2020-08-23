<template>
  <div class="items-center" style="height:100%; width:100%">
    <div v-if="!signedIn" class="row items-center justify-center parent" style="height:100%">
      <!-- <amplify-authenticator /> -->
      <q-form class="q-gutter-md q-my-auto">
        <q-input
          class="q-card"
          filled
          v-model="email"
          type="text"
          name
          placeholder="Email"
          lazy-rules
          :rules="[ val => !validEmail('@') || 'Please enter a valid email']"
        />
        <q-input
          class="q-card"
          filled
          v-model="password"
          type="password"
          name
          placeholder="Password"
        />
        <q-btn class="q-card" color="primary" @click="signIn" label="Sign In" />
        <q-btn class="q-card" color="primary" @click="signUp" label="Sign Out" />
      </q-form>
    </div>
    <div v-if="signedIn">
      <q-btn @click="signOut" label="Sign Out" style />
      <h3>Username: {{ user.username }}</h3>
    </div>
  </div>
</template>

<script>
import { Auth } from "aws-amplify";
import { AmplifyEventBus } from "aws-amplify-vue";
export default {
  name: "Login",
  data() {
    return {
      signedIn: false,
      user: null,
      email: "",
      password: "",
    };
  },
  created() {
    this.findUser();
    AmplifyEventBus.$on("authState", (info) => {
      console.log("auth", info);
      if (info === "signedIn") {
        this.findUser();
      } else {
        this.signedIn = false;
      }
    });
  },
  methods: {
    validEmail(email) {
      return email.includes("@");
    },
    signIn() {
      Auth.signIn(this.email, this.password)
        .then((user) => {
          this.signedIn = !!user;
          this.user = user;
        })
        .catch((err) => console.log("signIn Error:", err));
    },
    signOut() {
      Auth.signOut()
        .then((data) => {
          console.log(data);
          this.signedIn = !!data;
          this.user = null;
        })
        .catch((err) => console.log("signOut Error:", err));
    },
    signUp() {
      this.$router.push("/signup");
    },
    async findUser() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        this.user = user;
        this.signedIn = true;
        console.log("user", user);
        const jwt = user.getSignInUserSession().getIdToken().getJwtToken();
        console.log("jwt", jwt);
      } catch (err) {
        console.log("Error in findUser", err);
        this.signedIn = false;
      }
    },
  },
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