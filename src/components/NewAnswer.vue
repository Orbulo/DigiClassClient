<template>
  <div class="container">
    <q-editor v-model="editor" min-height="10rem" />
    <q-btn color="primary" label="Submit Answer" id="edit" />
  </div>
</template>

<script>
export default {
  name: "NewAnswer",
  data() {
    return { editor: "" };
  },
  created() {}
};
</script>

<style scoped>
#edit {
  margin-top: 10px;
  margin-left: 10px;
}
</style>
