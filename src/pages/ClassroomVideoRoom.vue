<template>
  <div
    class='video-grid'
    ref='videoGrid'
  >

  </div>
</template>

<script>
export default {
  name: 'ClassroomVideoRoom',
  data: () => ({
    roomName: '',
    roomCode: '',
    peers: {}
  }),
  async created() {
    const roomId = this.$route.params.roomId;
    // If room doesn't exist, request will fail and peer will not be loaded
    try {
      const {data} = await this.$axios.get(`rooms/${roomId}`);
      await this.$loadScript('https://unpkg.com/peerjs@1.2.0/dist/peerjs.min.js');
      const peer = new window.Peer();
      this.roomName = data.name;
      this.roomCode = data.code;
      const myVideo = document.createElement('video')
      myVideo.muted = true;
      //telling browser that mic and cam are needed
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      this.addVideoStream(myVideo, stream);
      //allows a user to "pick up" a call and adds their other's video to theirs
      peer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
          this.addVideoStream(video, userVideoStream)
        })
      })

      this.sockets.subscribe('userConnected', (userId) => {
        this.connectToNewUser(userId, stream)
      })

      this.sockets.subscribe('userDisconnected', (userId) => {
        if (this.peers[userId]) this.peers[userId].close()//removes the stream of the person who left
      })

      peer.on('open', id => {
        this.$socket.emit('joinRoom', roomId, id)
      })
    } catch(e) {
      alert(`Room with id ${roomId} not found.`);
      await this.$router.push('/room');
    }
  },
  methods: {
    addVideoStream(video, stream) {
      video.srcObject = stream;
      video.addEventListener('loadedmetadata', () => {
        video.play()
      })
      this.$refs.videoGrid.append(video);
    },
    connectToNewUser(userId, stream) {
      const call = peer.call(userId, stream)
      const video = document.createElement('video')
      call.on('stream', userVideoStream => {
        this.addVideoStream(video, userVideoStream)
      })
      call.on('close', () => {
        video.remove()
      })
      this.peers[userId] = call;
    }
  }
}

</script>

<style scoped>
.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-auto-rows: 300px;
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
