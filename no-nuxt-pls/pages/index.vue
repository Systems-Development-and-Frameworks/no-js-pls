<template>
  <div>
    <div>
      <Menu></Menu>
    </div>
    <div id="index">
      <NewsList></NewsList>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import NewsList from '~/components/NewsList/NewsList.vue';
import Menu from '~/components/Menu/Menu.vue';

@Component({
  components: {
    Menu,
    NewsList,
  },
})
// export default Vue.extend({})
export default class App extends Vue {}
</script>
