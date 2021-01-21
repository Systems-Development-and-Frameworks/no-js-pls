import { config } from "@vue/test-utils";
import * as http from "http";

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'no-nuxt-pls',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/apollo',
  ],
  storybook: {
    addons: [
      '@storybook/addon-controls',
      '@storybook/addon-links',
      '@storybook/addon-essentials',
      '@storybook/addon-a11y',
      ]
  },

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  apollo: {
    clientConfigs: {
      default: { httpEndpoint: "http://localhost:4000" }
    },
    // Sets the authentication type for any authorized request.
    authenticationType: 'Bearer',

// Token name for the cookie which will be set in case of authentication
    tokenName: 'apollo-token',
  },

  pwa: {
    manifest: {
      name: 'Hacker News App',
      short_name: 'News',
      start_url: 	'/',
      display: 'standalone',
      theme_color: 'azure',
      lang: 'de',
      useWebmanifestExtension: false,
      icon: [],
    }
  }
}
