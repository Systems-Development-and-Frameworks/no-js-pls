<template>
  <div id="index">
    <NewsList></NewsList>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import NewsList from '~/components/NewsList/NewsList.vue';
import { apolloProvider } from "~/plugins/apollo.client";

@Component({
  components: {
    NewsList,
  },
})
export default Vue.extend({})
</script>
