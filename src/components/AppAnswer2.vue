<template>
  <div>
    <q-card class="app-question" flat bordered>
      <q-item>
        <q-item-section class="author">
          <q-item-label>Bob Ross</q-item-label>
          <q-item-label caption>
            5 Reputation
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-card-section horizontal>
        <q-card-section>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porta,
          odio sodales malesuada consectetur, nulla nulla hendrerit dolor, non
          aliquet velit metus ut lectus. Curabitur suscipit augue lorem, nec
          bibendum est volutpat at. Morbi mattis non nunc ut pulvinar. Aenean
          vitae vestibulum nibh, sed placerat ligula. Nulla dignissim lorem
          felis. Aenean in purus id massa lobortis rhoncus non porttitor ligula.
          Duis sapien libero, finibus et arcu eu, luctus suscipit risus.
          Curabitur luctus rhoncus ligula ac egestas. Suspendisse potenti. Fusce
          vestibulum sem diam, sed aliquet massa luctus sit amet. Fusce commodo,
          orci sed pharetra egestas, orci risus eleifend libero, sit amet
          eleifend magna quam a est. Ut vel erat non diam mattis eleifend.
          Quisque tincidunt tellus ut egestas efficitur. Suspendisse elementum
          venenatis rutrum. Praesent risus tortor, semper eget posuere ut,
          auctor blandit ex. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Class aptent taciti sociosqu ad litora torquent per conubia
          nostra, per inceptos himenaeos. Vivamus et tristique mi. Maecenas
          egestas elit vehicula mauris ornare malesuada. Vestibulum ante ipsum
          primis in faucibus orci luctus et ultrices posuere cubilia curae;
          Mauris dictum nisl lacus, non fermentum elit rhoncus quis. Nam quis
          nunc nibh. Donec ac maximus nibh. Integer venenatis dignissim dolor,
          euismod laoreet ex fermentum in. Phasellus gravida, ex in feugiat
          iaculis, massa elit ornare enim, vitae varius augue elit vel dolor.
          Aenean vitae volutpat arcu. Praesent nec auctor nisi. Nam tellus sem,
          semper pulvinar dolor at, vulputate molestie eros. Pellentesque
          sodales libero in nisi pulvinar, quis porta magna finibus. Curabitur
          ligula eros, convallis sit amet vulputate et, auctor ac mi. Praesent
          blandit eget dolor eu pulvinar.
        </q-card-section>

        <q-card-actions vertical class="justify-around">
          <div class="upvote">
            <q-btn
              flat
              round
              color="blue"
              icon="expand_less"
              :class="{ 'light-dimmed': !upvoted }"
              @click="upvote"
            />
            <p>{{ upvotes }}</p>
          </div>
          <q-separator />

          <q-btn flat round color="accent" icon="bookmark" />

          <q-separator />

          <q-btn
            flat
            round
            color="secondary"
            icon="verified"
            :class="{ 'light-dimmed': !verified }"
          />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'AppAnswer2',
  data() {
    return {
      upvoted: false,
      upvotes: 1,
      verified: true
    };
  },
  methods: {
    async upvote() {
      if (this.upvoted) {
        this.upvoted = false;
        this.upvotes = this.upvotes - 1;
      } else {
        this.upvoted = true;
        this.upvotes = this.upvotes + 1;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.app-question {
  margin-top: 2%;
  margin-left: 10%;
  width: 80%;
  justify-content: center;
  align-items: center;
}

.upvote {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
