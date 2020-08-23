import { LocalStorage } from 'quasar';
import {mapActions} from 'vuex';
import { nanoid } from 'nanoid';

export default {
  methods: {
    ...mapActions(['setToken', 'setUserId']),
  },
  async created() {
    const token = LocalStorage.getItem('token');
    if (!token) {
      await this.$router.push('/signup');
      return;
    }
    await this.$router.push('/classrooms');
  },
  render(h) {
    h('div');
  }
}
