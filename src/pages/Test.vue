<template>
  <div>
    <AppQuestion2 />
    <NewAnswer2 />
    <AppAnswer2 />
    <NewQuestion2 />
  </div>
</template>

<script>
import AppQuestion2 from '../components/AppQuestion2.vue';
import NewAnswer2 from '../components/NewAnswer2.vue';
import AppAnswer2 from '../components/AppAnswer2.vue';
import NewQuestion2 from '../components/NewQuestion2.vue';

export default {
  name: 'Question',
  components: {
    AppQuestion2,
    NewAnswer2,
    AppAnswer2,
    NewQuestion2
  }
};
</script>

<style lang="scss" scoped></style>
