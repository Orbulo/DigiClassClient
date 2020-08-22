<template>
  <div class="q-pa-md absolute-center" style="max-width: 400px">
    <q-form @submit="createRoom" class="q-gutter-md">
      <q-input filled v-model="roomName" label="Room Name" />
      <q-field borderless label="Your Room Code" stack-label>
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            ROOM_ID
          </div>
        </template>
      </q-field>
      <div>
        <q-btn label="Create Room" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  name: "ClassroomMeet",
  data() {
    return {
      roomName: "My Room"
    };
  },

  methods: {
    createRoom() {
      console.log("asdf");
    }
  }
};
</script>

<style scoped></style>
