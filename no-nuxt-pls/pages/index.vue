<template>
  <div id="index">
    <NewsList></NewsList>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import NewsList from '~/components/NewsList/NewsList.vue';

@Component({
  components: {
    NewsList,
  },
})
export default Vue.extend({})
</script>
