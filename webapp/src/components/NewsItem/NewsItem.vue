<template>
  <div>
    <h2>{{news.title}} ({{news.votes}})</h2>
    <br>
    <button @click="updateNews(1)">Upvote</button>
    <button @click="updateNews(-1)">Downvote</button>
    <button @click="deleteNews">Remove</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { Item } from '@/interface/item';

@Component
export default class NewsItem extends Vue {
  @Prop() public news!: Item;

  @Emit('update')
  public updateNews(value: number): void {
    this.news.votes += value;
  }

  @Emit('remove')
  public deleteNews(): Item {
    return this.news;
  }

}
</script>

<style scoped>

</style>
