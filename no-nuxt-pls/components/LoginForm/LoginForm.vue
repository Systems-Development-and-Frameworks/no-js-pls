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
import gql from 'graphql-tag';
import { mapActions } from 'vuex';

const LOGIN_MUTATION = gql`mutation ($email: String!, $password: String!){ login(email: $email, password: $password) }`;

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
      const { email, password } = this;
      const { data } = await this.$apollo.mutate({mutation: LOGIN_MUTATION, variables: { email, password }});
      if (data.login) {
        await this.$apolloHelpers.onLogin(data.login);
        await this.$router.push('/');
      } else {
        this.error = { message: 'Oops! Something went wrong.' };
      }
    }
  }
}

/*
@Component
export default class LoginForm extends Vue {
  @Prop() public token: string = this.$store.state.auth.token;
  public email: string = '';
  public password: string = '';


  @Action('auth')
  async submitLogin(): Promise<void> {
    const { login } = await this.$a
    const res = await this.$apollo.mutate({mutation: gql`mutation ($email: String!, $password: String!){
          login(email: $email, password: $password)
        }`, variables: {email: this.email, password: this.password}}).then((data: any) => data.login as string);
    await this.$app.$apolloHelpers.onLogin(res);
    this.$store.commit('login', { email: this.email, password: this.password });
  }
}; */
</script>

<style scoped>

</style>
