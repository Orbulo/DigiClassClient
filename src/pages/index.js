import { LocalStorage } from 'quasar';
import {mapActions} from 'vuex';
import { nanoid } from 'nanoid';

export default {
  methods: {
    ...mapActions(['setToken']),
  },
  async created() {
    const token = LocalStorage.getItem('token');
    this.setToken(token);
    if (!token) {
      // TODO: Redirect user to login/register screen
      const {data} = await this.$axios.post('auth/register', {
        email: nanoid(),
        password: nanoid(),
      });
      LocalStorage.set('token', data.token);
    }
    await this.$router.push('/classrooms');
  },
  render(h) {
    h('div');
  }
}
