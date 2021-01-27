<template>
  <form aria-label="Create NewsItem" @submit.prevent="submitTitle">
    <input class="border border-grey-light" aria-label="CreateTitle" type="text" v-model="title" placeholder="Type title here">
    <button class="text-white bg-green-500 hover:bg-green-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium" type="submit">Create</button>
  </form>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'nuxt-property-decorator';

@Component
export default class NewsForm extends Vue {
  public title: string = '';

  @Emit('sendTitle')
  public submitTitle(): string {
    const newTitle = this.title;
    this.title = '';
    return newTitle;
  }
}
</script>

<style scoped></style>
