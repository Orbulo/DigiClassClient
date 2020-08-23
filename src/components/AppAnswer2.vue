<template>
  <div>
    <q-card class="app-question" flat bordered>
      <q-item>
        <q-item-section class="author">
          <q-item-label>{{ user.name }}</q-item-label>
          <q-item-label caption>
            {{ user.reputation }} Reputation
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-card-section horizontal>
        <q-card-section style='width: 100%'>
          {{ content }}
        </q-card-section>

        <q-card-actions vertical class="justify-around">
          <div class="upvote">
            <q-btn
              flat
              round
              color="blue"
              icon="expand_less"
              :class="{ 'light-dimmed': !upvoted }"
              @click="upvote"
            />
            <span>{{ currentUpvotes }}</span>
          </div>
          <q-separator />

          <q-btn flat round color="accent" icon="bookmark" />

          <q-separator />

          <q-btn
            flat
            round
            color="secondary"
            icon="verified"
            :class="{ 'light-dimmed': !verified }"
          />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'AppAnswer2',
  props: {
    verified: {
      type: Boolean,
      default: false,
    },
    upvotes: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      upvoted: false,
      currentUpvotes: 0,
      user: {}
    };
  },
  created() {
    this.currentUpvotes = this.upvotes;
    this.user = this.populateUser(this.userId)
  },
  methods: {
    ...mapActions(['populateUser']),
    async upvote() {
      if (this.upvoted) {
        this.upvoted = false;
        this.currentUpvotes = this.currentUpvotes - 1;
      } else {
        this.upvoted = true;
        this.currentUpvotes = this.currentUpvotes + 1;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.app-question {
  margin-top: 2%;
  margin-left: 10%;
  width: 80%;
  justify-content: center;
  align-items: center;
}

.upvote {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
