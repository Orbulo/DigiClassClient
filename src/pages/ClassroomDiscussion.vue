<template>
  <div class="q-pa-md row justify-center absolute-bottom">
    <div style="width: 100%">
      <q-chat-message
        name="me"
        avatar="https://cdn.quasar.dev/img/avatar4.jpg"
        :text="['hey, how are you?']"
        sent
        stamp="7 minutes ago"
      />
      <q-chat-message
        name="Jane"
        avatar="https://cdn.quasar.dev/img/avatar3.jpg"
        :text="[`doing fine, how r you?`]"
        stamp="4 minutes ago"
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
import { send } from "@quasar/extras/material-icons";
export default {
  name: "ClassroomChat",
  data: () => ({
    chatMessages: [],
    newMessage: ""
  }),
  created() {
    this.$axios.get("");
  }
};
</script>

<style scoped></style>
