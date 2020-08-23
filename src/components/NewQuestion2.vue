<template>
  <div class="q-pa-md q-gutter-sm answer">
    <q-editor
      v-model="editor"
      flat
      content-class="bg-amber-3"
      toolbar-text-color="white"
      toolbar-toggle-color="yellow-8"
      toolbar-bg="primary"
      :toolbar="[
        ['bold', 'italic', 'underline'],
        [
          {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: ['p', 'h3', 'h4', 'h5', 'h6']
          }
        ]
      ]"
    />

    <q-btn
      color="primary"
      icon="send"
      label="Submit Question"
      @click="submit"
    />

    <q-btn
      color="primary"
      icon="insert_photo"
      label="Upload Image"
      @click="uploadImage"
    />
  </div>
</template>

<script>
export default {
  name: 'NewQuestion2',
  data() {
    return {
      editor: 'Hello question'
    };
  },
  methods: {
    async submit() {
      console.log('editor:', this.editor);
    },
    async uploadImage() {
      console.log('Wants to upload an image');
    }
  }
};
</script>

<style lang="scss" scoped>
.answer {
  margin-top: 2%;
  margin-left: 5%;
  width: 90%;
  justify-content: center;
  align-items: center;
}
</style>
