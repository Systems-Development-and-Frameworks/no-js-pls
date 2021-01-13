<template>
  <div>
    <h1>News List</h1>
    <br />
    <button v-if="showOrderByDesc()" type="button" @click="sortAsc()">
      Sort &#x2B06;
    </button>
    <button v-else-if="showOrderByAsc()" type="button" @click="sortDesc()">
      Sort &#x2B07;
    </button>
    <br />
    <h3 v-if="isEmpty()">The list is empty :(</h3>
    <NewsItem
      v-for="item in newsItems"
      :key="item.id"
      :news="item"
      @update="vote"
      @remove="removeItem"
    ></NewsItem>
    <br />
    <NewsForm @sendTitle="addItem"></NewsForm>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Item } from '@/interface/item'
import NewsItem from '../NewsItem/NewsItem.vue'
import NewsForm from '../NewsForm/NewsForm.vue'

const enum SortingOrder {
  Desc,
  Asc,
}

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

  private currentSortingOrder: SortingOrder = SortingOrder.Desc;

  private index: number = this.newsItems.length;

  public vote(): void {
    this.sortNews();
  }

  public isEmpty(): boolean {
    return this.newsItems.length < 1;
  }

  public showOrderByDesc(): boolean {
    if (this.newsItems.length < 2) {
      return false;
    }

    return this.currentSortingOrder === SortingOrder.Desc;
  }

  public showOrderByAsc(): boolean {
    if (this.newsItems.length < 2) {
      return false;
    }

    return this.currentSortingOrder === SortingOrder.Asc;
  }

  public removeItem(item: Item): void {
    this.newsItems = this.newsItems.filter((elem) => elem.id !== item.id);
  }

  public addItem(title: string): void {
    if (title && title.length < 64) {
      const item: Item = { title, votes: 0, id: this.index++ };
      this.newsItems.push(item);
      this.sortNews(this.currentSortingOrder);
    }
  }

  public sortDesc(): void {
    this.newsItems = this.newsItems.sort((a, b) => b.votes - a.votes);
    this.currentSortingOrder = SortingOrder.Desc;
  }

  public sortAsc(): void {
    this.newsItems = this.newsItems.sort((a, b) => a.votes - b.votes);
    this.currentSortingOrder = SortingOrder.Asc;
  }

  private sortNews(order: SortingOrder = SortingOrder.Desc): void {
    switch (order) {
      case SortingOrder.Desc:
        this.sortDesc();
        break;
      case SortingOrder.Asc:
        this.sortAsc();
        break;
    }
  }
}
</script>

<style scoped></style>
