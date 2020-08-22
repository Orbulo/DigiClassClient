<template>
  <div class="q-pa-md">
    <div class='column'>
      <h3 class='text-center text-weight-bold q-mb-md'>Create Room</h3>
      <q-input filled v-model="createRoomName" label="Room Name" />
      <q-btn
        label="Create Room"
        color="primary"
        @click='createRoom'
      />
      <q-separator />
      <h3 class='text-center text-weight-bold q-mb-md'>Join Room</h3>
      <q-input
        filled
        v-model="joinRoomId"
        label="Room ID"
        :bottom-slots='true'
        :error-message='joinRoomError'
      />
      <q-btn
        label="Join Room"
        @click='joinRoom'
      />
    </div>
  </div>
</template>

<script>
import { nanoid } from 'nanoid';

export default {
  name: "ClassroomMeet",
  data: () => ({
    createRoomName: '',
    joinRoomId: '',
    joinRoomError: '',
  }),
  methods: {
    async createRoom() {
      const { data } = await this.$axios.post('rooms/create', {
        name: this.roomName,
      });
      if (data.roomId) {
        await this.$router.push(`/room/${data.roomId}`);
      }
    },
    async joinRoom() {
      const { data: { exists } } = await
        this.$axios.get(`rooms/${this.joinRoomId}`)
      if (!exists) {
        this.joinRoomError = 'Room ID not found.'
      }
    }
  }
};
</script>

<style scoped></style>
