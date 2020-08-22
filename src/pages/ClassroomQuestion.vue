<template>
  <div>
    <AppQuestion />
    <NewAnswer />
  </div>
</template>

<script>
import AppQuestion from "../components/AppQuestion";
import NewAnswer from "../components/NewAnswer";

export default {
  name: "ClassroomQuestionList",
  components: {
    AppQuestion,
    NewAnswer
  }
};
</script>

<style scoped></style>
