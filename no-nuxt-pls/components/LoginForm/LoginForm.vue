<template>
  <div>
    <form aria-label="Login User" @submit.prevent="submitLogin">
      <input v-model="email" placeholder="Geben Sie Ihre E-Mail ein">
      <input v-model="password" type="password" placeholder="Geben Sie Ihr Passwort ein">
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'nuxt-property-decorator';

@Component
export default class LoginForm extends Vue{
  email: string;
  password: string;

  async submitLogin(): void {

  }
};
</script>

<style scoped>

</style>
