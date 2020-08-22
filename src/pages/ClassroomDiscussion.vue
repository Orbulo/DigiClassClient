<template>
  <div class="q-pa-md row justify-center absolute-bottom">
    <div style="width: 100%">
      <q-chat-message
        v-for="(message, index) in chatMessages"
        name="me"
        :text="['hey, how are you?']"
        :sent='authorId === userId'
        stamp="7 minutes ago"
      />
      <q-chat-message
        name="Jane"
        :text="[`doing fine, how r you?`]"
        :stamp=""
      />
      <q-input filled v-model="newMessage" label="Enter a Message">
        <template v-slot:append>
          <q-icon name="send" />
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
import { format } from 'timeago.js';
import { mapActions } from 'vuex';

export default {
  name: "ClassroomChat",
  data: () => ({
    chatMessages: [],
    newMessage: ""
  }),
  methods: {
    ...mapActions(['addChatMessage']),
  },
  async created() {
    const { data } = await this.$axios.get('classroom/chat');
    data.forEach((chatMessage) => {
      addChatMessage();
    })
  }
};
</script>

<style scoped></style>
