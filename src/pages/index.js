import { LocalStorage } from 'quasar';

export default {
  async created() {
    const token = LocalStorage.getItem('token');
    if (!token) {
      // TODO: Redirect user to login/register screen
      const {data} = await this.$axios.post('auth/register', {
        email: 'leonzalion@gmail.com',
        password: 'vue'
      });
      LocalStorage.set('token', data.token);
    }
    await this.$router.push('/classrooms');
  },
  render(h) {
    h('div');
  }
}
