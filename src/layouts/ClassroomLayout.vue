<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          {{ currentClass }}
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>
        <DrawerLink
          v-for="link in drawerLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import DrawerLink from 'components/DrawerLink';

const drawerLinks = [
  {
    title: 'Discussion',
    route: '/discussion',
  },
  {
    title: 'Questions',
    route: '/questions',
  },
];

export default {
  name: 'MainLayout',
  components: { DrawerLink },
  created() {
    this.$axios.get(`classroom/${this.currentClassroomId}`);
  },
  data () {
    return {
      leftDrawerOpen: false,
      drawerLinks,
    }
  },
  computed: {
    ...mapState(['currentClassroomId']),
  },
  sockets: {
    connect() {
      console.log('Socket connected.');
    },
  }
}
</script>
