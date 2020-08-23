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
      label="Submit Response"
      @click="submit"
    />
  </div>
</template>

<script>
export default {
  name: 'NewAnswer2',
  data() {
    return {
      editor: 'Hello'
    };
  },
  methods: {
    async submit() {
      console.log('editor:', this.editor);
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
