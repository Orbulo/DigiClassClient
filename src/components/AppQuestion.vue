<template>
  <div class="container">
    <div class="row" id="question">
      <div id="voting">
        <template>
          <q-icon name="mdi-chevron-up" id="upvote" />
        </template>
        <q-field borderless id="votes" stack-label>
          <template v-slot:control>
            <div class="self-center full-width text-center no-outline"
                 tabindex="0">
              <p style="font-size: 15px; margin-bottom: 0">{{ upvotes }}</p>
              <p style="font-size: 10px; margin-bottom: 0">upvotes</p>
            </div>
          </template>
        </q-field>
      </div>
      <div class="col-11">
        <h6>{{ title }}</h6>
        <br />
        <p>{{ content }}</p>
        <p id="author">Written by: {{ author }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppQuestion",
  props: {
    upvotes: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    }
  },
};
</script>

<style scoped>
h6 {
  margin-block-end: 0em;
  margin-block-start: 0em;
}
#question {
  padding-top: 10px;
  padding-bottom: 10px;
}
#voting {
  margin-right: 15px;
  margin-left: 15px;
  text-align: center;
}
#upvote {
  font-size: 25px;
}
#author {
  text-align: right;
}
</style>
