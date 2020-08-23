<template>
  <div>
    <div style="background-color: #1976D2" class='column'>
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
    </div>
    <div class='q-ma-md items-center column'>
      <div class='text-h6 text-center'>Upload a file to Tabulo</div>
      <p class='text-center'>
        We've integrated with an Tabulo, an online whiteboard app that allows
        you to effortlessly make edits on the same image with others in
        real-time!
      </p>
      <q-file
        outlined
        v-model='file'
        label='Select an image'
        accept='.jpg, image/*'
      />
      <q-btn
        v-if='file'
        class='q-mt-md'
        label='Upload Image to Tabulo'
        @click='onUploadClick'
      />
    </div>
    <div class="video-grid" ref="videoGrid"></div>
  </div>
</template>

<script>
let peer;
import { mapState } from 'vuex';
import { nanoid } from 'nanoid';

export default {
  name: 'ClassroomVideoRoom',
  data: () => ({
    roomName: '',
    file: null,
    fileUrl: '',
    peers: {}
  }),
  computed: {
    ...mapState(['currentClassroomId']),
    roomUrl() {
      return window.location.href;
    },
    tabuloUrl() {
      return `https://tabulo.app/create-with-image?roomCode=${nanoid()}&roomPassword=${nanoid()}&imageUrl=${this.fileUrl}`;
    },
    serverUploadUrl() {
      return `${process.env.VUE_APP_SERVER_URL}/${this.currentClassroomId}/upload`;
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
    async onUploadClick() {
      const formData = new FormData();
      formData.append('file', this.file);
      const { data } = await this.$axios({
        method: 'post',
        url: `classrooms/${this.currentClassroomId}/upload`,
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'}
      });
      this.fileUrl = data.s3URL;
      window.open(this.tabuloUrl, '_blank');
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
