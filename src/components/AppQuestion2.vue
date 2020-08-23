<template>
  <div>
    <q-card class="app-question" flat bordered>
      <q-card-section class="col-5 flex flex-center">
        <q-icon
          name="verified"
          color="secondary"
          size="md"
          :class="{ 'light-dimmed': !verified }"
        />
        <q-item>
          <q-item-section>
            <q-item-label>{{ title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>

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
            icon="question_answer"
            :class="{ 'light-dimmed': !answered }"
          />
        </q-card-actions>
      </q-card-section>

      <q-item>
        <q-item-section class="author">
          <q-item-label>{{ user.name }}</q-item-label>
          <q-item-label caption>
            {{ user.reputation }} Reputation
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'AppQuestion2',
  props: {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    upvotes: {
      type: Number,
      required: true,
    },
    verified: {
      type: Boolean,
      required: true,
    },
    answered: {
      type: Boolean,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      upvoted: false,
      currentUpvotes: 0,
      user: {},
    };
  },
  computed: {
    ...mapState(['userMap']),
  },
  async created() {
    this.currentUpvotes = this.upvotes;
    await this.populateUser(this.userId);
    this.user = this.userMap[this.userId];
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
