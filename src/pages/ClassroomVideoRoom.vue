<template>
  <div
    class='video-grid'
    ref='videoGrid'
  >

  </div>
</template>

<script>
import Peer from 'peerjs';

const peer = new Peer(undefined, {
  host: '/',
  port: '5000'
});

export default {
  name: 'ClassroomVideoRoom',
  data: () => ({
    peers: {}
  }),
  sockets: {

  },
  async created() {
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

    this.$socket.on('user-connected', (userId) => {
      this.connectToNewUser(userId, stream)
    })

    this.$socket.on('user-disconnected', (userId) => {
      if (this.peers[userId]) this.peers[userId].close()//removes the stream of the person who left
    })

    peer.on('open', id => {
      this.$socket.emit('join-room', this.$route.params.roomId, id)
    })
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
