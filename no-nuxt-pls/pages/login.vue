<template>
  <LoginForm></LoginForm>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator';
import LoginForm from '~/components/LoginForm/LoginForm';

@Component({
  components: {
    LoginForm
  },
})
export default {
  name: "login"
};
</script>

<style scoped>

</style>
