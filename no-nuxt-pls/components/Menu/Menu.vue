<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button @click="burgerShow = !burgerShow" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="absolute inset-y-auto right-0 hidden sm:block sm:ml-6">
          <template v-if="token">
            <button class="text-gray-300 bg-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" @click="logout">Logout</button>
          </template>
          <template v-else>
            <span class="text-gray-300 p-3">You are not logged in.</span>
              <button class="text-gray-300 bg-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"><nuxt-link to="/Login">Login</nuxt-link></button>
          </template>
        </div>
      </div>
    </div>
    <transition name="burger">
      <div v-show="burgerShow" class="visible md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <div v-if="token">
            <button class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" @click="logout">Logout</button>
          </div>
          <div v-else>
            <button class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"><nuxt-link to="/Login">Login</nuxt-link></button>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script>

export default {
  data() {
    return {
      token: '',
      burgerShow: false,
    }
  },

  mounted() {
    this.setupMenu();
  },

  methods: {
    setupMenu(){
      this.token = this.$apolloHelpers.getToken();
    },
    logout() {
      this.token = null;
      this.$apolloHelpers.onLogout();
      window.location.reload(false);
    },
  },
};
</script>

<style>
.burger-enter-active, .burger-leave-active {
  transition: all 0.5s;
}

.burger-enter, .burger-leave-to {
  opacity: 0;
}
</style>
