<template>
  <div class="container">
    <div class="row" id="question">
      <div id="voting">
        <template>
          <q-btn name="mdi-chevron-up" @click="upvote">
            <template v-slot>
              <q-icon name="mdi-chevron-up" id="upvote" />
            </template>
          </q-btn>
        </template>
        <q-field borderless id="votes" stack-label>
          <template v-slot:control>
            <div
              class="self-center full-width text-center no-outline"
              tabindex="0"
            >
              <p style="font-size: 15px; margin-bottom: 0">{{ upvotes }}</p>
              <p style="font-size: 10px; margin-bottom: 0">upvotes</p>
            </div>
          </template>
        </q-field>
      </div>
      <div class="col-11">
        <h6>{{ title }}</h6>
        <br />
        <p>{{ content }}</p>
        <p id="author">
          <!-- Written by: {{ user.name }} (Rep: {{ user.reputation }}) -->
          Written by: Yours Truly (Rep: 10)
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AppQuestion',
  props: {
    id: {
      type: String,
      required: true
    },
    upvotes: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(['userMap', 'currentClassroomId']),
    user() {
      return this.userMap[this.userId];
    }
  },
  methods: {
    async upvote() {
      await this.$axios.post(
        `classroom/${this.currentClassroomId}/questions/${this.id}/upvote`
      );
    }
  }
};
</script>

<style scoped>
h6 {
  margin-block-end: 0em;
  margin-block-start: 0em;
}
#question {
  padding-top: 10px;
  padding-bottom: 10px;
}
#voting {
  margin-right: 15px;
  margin-left: 15px;
  text-align: center;
}
#upvote {
  font-size: 25px;
}
#author {
  text-align: right;
}
</style>
