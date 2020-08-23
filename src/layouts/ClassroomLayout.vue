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
          {{ currentClassroom.name }}
        </q-toolbar-title>
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
    icon: 'chat',
    route: '/discussion',
  },
  {
    title: 'Questions',
    route: '/questions',
  },
  {
    title: 'Room',
    route: '/room',
  }
];

export default {
  name: 'MainLayout',
  components: { DrawerLink },
  created() {
    this.$axios.get(`classrooms/${this.currentClassroomId}`);
  },
  data () {
    return {
      leftDrawerOpen: false,
      drawerLinks,
    }
  },
  computed: {
    ...mapState(['currentClassroomId']),
    ...mapGetters(['currentClassroom']),
  },
  sockets: {
    connect() {
      console.log('Socket connected.');
    },
  }
}
</script>
