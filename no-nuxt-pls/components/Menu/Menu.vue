<template>
  <nav class="nav-bar">
    <div>
      <nuxt-link to="/Login">Login</nuxt-link>
    </div>
    <div>
      <template v-if="token">
        <button @click="logout">Logout</button>
      </template>
      <template v-else> You are not logged in. </template>
    </div>
  </nav>
</template>

<script>

export default {
  data() {
    return {
      token: ''
    }
  },

  mounted() {
    this.token = this.$apolloHelpers.getToken();
  },

  methods: {
    logout() {
      this.token = null;
      this.$apolloHelpers.onLogout();
    },
  },
};
</script>

<style>
.nav-bar {
  top: 0;
  position: fixed;
  width: 100%;
  height: 6rem;
  padding: 2rem;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-between;
}
</style>
