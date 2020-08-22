<template>
  <div class="q-pa-md">
    <div class='column'>
      <h3 class='text-center text-weight-bold q-mb-md'>Create Room</h3>
      <q-input
        class='q-mb-lg'
        filled
        v-model="createRoomName"
        label="Room Name"
      />
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
        bottom-slots
        :error='joinRoomError'
        error-message='Room ID not found.'
        class='q-mb-md'
      />
      <q-btn
        label="Join Room"
        @click='joinRoom'
        @input='joinRoomError = false'
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "ClassroomMeet",
  data: () => ({
    createRoomName: '',
    joinRoomId: '',
    joinRoomError: false,
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
      try {
        const { data } = await
          this.$axios.get(`rooms/${this.joinRoomId}`)
        await this.$router.push(`/room/${this.joinRoomId}`);
      } catch (e) {
        this.joinRoomError = true;
      }
    }
  }
};
</script>

<style scoped></style>
