<template>
  <div>
    <h1>News List</h1>
    <br>
    <NewsItem v-for="item in newsItems" :key="item.id" :news="item" @update="vote" @remove="removeItem"></NewsItem>
    <br>
    <NewsForm @sendTitle="addItem"></NewsForm>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import NewsItem from './NewsItem.vue';
import NewsForm from './NewsForm.vue';
import { Item } from '@/interface/item';

@Component({
  components: {
    NewsItem,
    NewsForm,
  },
})
export default class NewsList extends Vue {
  public newsItems: Item[] = [
    {
      id: 0,
      title: 'JS-Sucks',
      votes: 2,
    },
    {
      id: 1,
      title: 'TS-Wins',
      votes: 1,
    },
  ];
  private index: number = this.newsItems.length;

  public vote(): void {
    this.sortNews();
  }

  public removeItem(item: Item): void {
    this.newsItems = this.newsItems.filter((elem) => elem.id !== item.id);
  }

  public addItem(title: string): void {
    if (title && title.length < 64) {
      const item: Item = {title, votes: 0, id: this.index++};
      this.newsItems.push(item);
      this.sortNews();
    }
  }

  private sortNews(): void {
    this.newsItems = this.newsItems.sort((a, b) => b.votes - a.votes);
  }
}
</script>

<style scoped>

</style>
