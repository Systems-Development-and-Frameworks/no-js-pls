<template>
  <form aria-label="Create NewsItem" @submit.prevent="submitTitle">
    <input v-model="title" aria-label="CreateTitle" type="text" placeholder="Type title here">
    <button type="submit">Create</button>
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
