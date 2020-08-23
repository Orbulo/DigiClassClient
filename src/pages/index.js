import { SessionStorage } from 'quasar';
import {mapActions} from 'vuex';
import { nanoid } from 'nanoid';

export default {
  methods: {
    ...mapActions(['setToken', 'setUserId']),
  },
  async created() {
    const token = SessionStorage.getItem('token');
    const userId = SessionStorage.getItem('userId');
    if (!token) {
      // TODO: Redirect user to login/register screen
      const {data} = await this.$axios.post('auth/register', {
        email: nanoid(),
        password: nanoid(),
      });
      this.setToken(data.token);
      this.setUserId(data.userId);
    }
    await this.$router.push('/classrooms');
  },
  render(h) {
    h('div');
  }
}
