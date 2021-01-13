<template>
  <form class="login-form" @submit.prevent="submitLogin">
    <fieldset>
      <legend>
        Login
      </legend>
      <div>
        <label for="email">E-Mail:</label>
        <input
          id="email"
          v-model="email"
          type="email"
          name="email"
          size="25"
        />
      </div>
      <div>
        <label for="password">Password:</label>
        <input
          id="password"
          v-model="password"
          type="password"
          name="password"
          size="25"
        />
      </div>
      <div v-if="error" class="error">
        {{ error.message }}
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </fieldset>
  </form>
</template>

<script>
import gql from "graphql-tag";
import { mapActions } from 'vuex'

const LOGIN_MUTATION = gql`mutation ($email: String!, $password: String!){ login(email: $email, password: $password) }`

export default {
  data() {
    return {
      error: null,
      email: '',
      password: '',
    }
  },

  methods: {
    ...mapActions('auth', ['login']),
    async submitLogin() {
      const { email, password} = this
      const { login } = await this.$apollo.mutate({mutation: LOGIN_MUTATION, variables:{ email, password }})
      await this.$apolloHelpers.onLogin(login);
      this.login(this);
    }
  }
};
</script>

<style scoped>

</style>
