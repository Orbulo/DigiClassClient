<template>
  <div>
    <div style="background-color: #1976D2">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="mdi-arrow-left"
          color="white"
          @click="backToClassList"
        />
        <p
          class="col text-center"
          style="padding-top: 5px; color: white; font-size: 16px"
        >
          <span class="text-weight-bold">
            Paste the following ID into the Room ID input box on
            http://localhost:8080/room: </span
          ><br />
          {{ $route.params.roomId }}
        </p>
      </q-toolbar>
    </div>
    <div class="video-grid" ref="videoGrid"></div>
  </div>
</template>

<script>
let peer;

export default {
  name: 'ClassroomVideoRoom',
  data: () => ({
    roomName: '',
    peers: {}
  }),
  computed: {
    roomUrl() {
      return `${process.env.VUE_APP_SERVER_URL}/room/${this.$route.params.roomId}`;
    }
  },
  async created() {
    const roomId = this.$route.params.roomId;
    // If room doesn't exist, request will fail and peer will not be loaded
    try {
      const { data } = await this.$axios.get(`rooms/${roomId}`);
      await this.$loadScript(
        'https://unpkg.com/peerjs@1.2.0/dist/peerjs.min.js'
      );
      peer = new window.Peer();

      this.sockets.subscribe('userDisconnected', userId => {
        if (this.peers[userId]) {
          this.peers[userId].close();
        } //removes the stream of the person who left
      });

      peer.on('open', id => {
        console.log('meow');
        this.$socket.emit('joinRoom', roomId, id);
      });

      this.roomName = data.name;
      this.roomCode = data.code;
      const myVideo = document.createElement('video');
      myVideo.style.borderStyle = 'solid';
      myVideo.style.borderColor = '#90ee90';
      myVideo.style.borderRadius = '25px';
      myVideo.muted = true;

      //telling browser that mic and cam are needed
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      this.addVideoStream(myVideo, stream);
      //allows a user to "pick up" a call and adds their other's video to theirs
      peer.on('call', call => {
        call.answer(stream);
        const video = document.createElement('video');
        video.style.borderStyle = 'solid';
        video.style.borderColor = '#90ee90';
        video.style.borderRadius = '25px';
        call.on('stream', userVideoStream => {
          this.addVideoStream(video, userVideoStream);
        });
      });

      this.sockets.subscribe('userConnected', userId => {
        this.connectToNewUser(userId, stream);
      });
    } catch (e) {
      alert(`Room with id ${roomId} not found.`);
      await this.$router.push('/room');
    }
  },
  methods: {
    addVideoStream(video, stream) {
      video.srcObject = stream;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
      this.$refs.videoGrid.append(video);
    },
    connectToNewUser(userId, stream) {
      const call = peer.call(userId, stream);
      const video = document.createElement('video');
      call.on('stream', userVideoStream => {
        this.addVideoStream(video, userVideoStream);
      });
      call.on('close', () => {
        video.remove();
      });
      this.peers[userId] = call;
    },
    backToClassList() {
      this.$router.push('/discussion');
    }
  }
};
</script>

<style>
.video-grid {
  display: grid;
  grid-template-columns: repeat(750px);
  grid-auto-rows: 500px;
  justify-content: center;
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
