<template>
  <p v-if="token">token</p>
  <form v-else class="login-form" @submit.prevent="submitLogin">
    <fieldset>
      <legend>
        Login (
        <span v-if="valid">valid</span>
        <span v-if="loading">loading</span>
        )
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
        <button :disabled="loading || !valid" type="submit">Login</button>
      </div>
    </fieldset>
  </form>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import gql from "graphql-tag";

@Component
export default class LoginForm extends Vue {
  @Prop() public token: string = this.$store.state.auth.token;
  public email: string = '';
  public password: string = '';



  submitLogin(): Promise<void> {
    /* const res = await this.$apollo.mutate({mutation: gql`mutation ($email: String!, $password: String!){
          login(email: $email, password: $password)
        }`, variables: {email: this.email, password: this.password}}).then((data: any) => data.login as string);
    await this.$app.$apolloHelpers.onLogin(res); */
    this.$store.commit('login', { email: this.email, password: this.password });
  }
};
</script>

<style scoped>

</style>
