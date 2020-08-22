<template>
  <div class="q-pa-md row justify-center absolute-bottom">
    <div style="width: 100%">
      <q-chat-message
        v-for="(message, index) in chatMessages"
        :name="users[message.userId]"
        :text="[message.content]"
        :sent='message.userId === userId'
        :key="index"
      />
      <q-input filled v-model="message" label="Enter a Message">
        <template v-slot:append>
          <q-btn
            flat
            icon='send'
            @click='sendMessage'
          />
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: "ClassroomChat",
  data: () => ({
    message: ""
  }),
  computed: {
    ...mapState(['chatMessages', 'userId', 'currentClassroomId']),
    ...mapGetters(['populatedQuestions']),
  },
  methods: {
    ...mapActions(['addChatMessage']),
    async sendMessage() {
      await this.$axios.post(`classrooms/${this.currentClassroomId}/chat`, {
        message: this.message,
      });
      this.message = '';
    }
  },
  async created() {
    const { data } = await
      this.$axios.get(`classrooms/${this.currentClassroomId}/chat`);
    await Promise.all(data.map(async (chatMessage) => {
      await this.addChatMessage(chatMessage);
    }));
  }
};
</script>

<style scoped></style>
