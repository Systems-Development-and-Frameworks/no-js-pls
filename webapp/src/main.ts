import Vue from 'vue';
import App from './App.vue';
import * as path from 'path';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

export default {
  stories: ['../src/**/*.stories.ts'],
  addons: [
    {
      name: '@storybook/preset-typescript',
      options: {
        tsLoaderOptions: {
          configFile: path.resolve(__dirname, './tsconfig.json'),
        },
        forkTsCheckerWebpackPluginOptions: {
          colors: false, // disables built-in colors in logger messages
        },
        include: [path.resolve(__dirname, '../src')],
        transpileManager: true,
      },
    },
  ],
};
