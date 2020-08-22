import { boot } from 'quasar/wrappers';

import Amplify, * as AmplifyModules from 'aws-amplify';
import { AmplifyPlugin } from 'aws-amplify-vue';
import aws_exports from '../../aws-exports'; // AWS Config File

Amplify.configure(aws_exports);

export default boot(({ Vue }) => {
  Vue.use(AmplifyPlugin, AmplifyModules);
});