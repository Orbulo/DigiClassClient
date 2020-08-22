<template>
  <div class="q-pa-md row justify-center">
    <div style="width: 100%; max-width: 400px">
      <q-chat-message

      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClassroomChat',
  data: () => ({
    chatMessages: [],
  }),
  created() {
    this.$axios.get('')
  }
}
</script>

<style scoped>

</style>
