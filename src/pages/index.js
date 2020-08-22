import { LocalStorage } from 'quasar';
import {mapActions} from 'vuex';
import { nanoid } from 'nanoid';

export default {
  methods: {
    ...mapActions(['setToken', 'setUserId']),
  },
  async created() {
    const token = LocalStorage.getItem('token');
    const userId = LocalStorage.getItem('userId');
    this.setToken(token);
    this.setUserId(userId);
    if (!token) {
      // TODO: Redirect user to login/register screen
      const {data} = await this.$axios.post('auth/register', {
        email: nanoid(),
        password: nanoid(),
      });
      LocalStorage.set('token', data.token);
      LocalStorage.set('userId', data.userId);
    }
    await this.$router.push('/classrooms');
  },
  render(h) {
    h('div');
  }
}
