<template>
  <q-layout view="hhh lpr lFf">
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
        <q-btn
          label="logout"
          color="white"
          text-color="primary"
          @click="logout"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
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
      <q-page>
        <router-view />
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-fab
            color="light-blue-5"
            text-color="white"
            icon="keyboard_arrow_left"
            direction="left"
          >
            <q-fab-action
              color="light-blue-5"
              text-color="white"
              icon="mail"
            />
            <q-fab-action
              color="light-blue-5"
              text-color="white"
              icon="notifications"
            />
          </q-fab>
        </q-page-sticky>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import DrawerLink from 'components/DrawerLink';

const drawerLinks = [
  {
    title: 'Discussion',
    icon: 'forum',
    route: '/discussion'
  },
  {
    title: 'Questions',
    icon: 'mdi-comment-question',
    route: '/questions'
  },
  {
    title: 'Room',
    icon: 'mdi-video',
    route: '/room'
  }
];

export default {
  name: 'MainLayout',
  components: { DrawerLink },
  created() {
    this.$axios.get(`classrooms/${this.currentClassroomId}`);
  },
  data() {
    return {
      leftDrawerOpen: false,
      drawerLinks
    };
  },
  computed: {
    ...mapState(['currentClassroomId']),
    ...mapGetters(['currentClassroom'])
  },
  sockets: {
    connect() {
      console.log('Socket connected.');
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('login');
    }
  }
};
</script>
