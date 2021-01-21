<template>
  <div>
    <h2>{{news.title}} ({{news.votes}})</h2>
    <br>
    <button v-if="token" @click="updateNews(1)">Upvote</button>
    <button v-if="token" @click="updateNews(-1)">Downvote</button>
    <button v-if="authorId === news.author.id" @click="deleteNews">Delete</button>
    <button v-if="authorId === news.author.id">Edit</button>
  </div>
</template>

<script>

export default {
  props: {
    news: Object,
    token: String,
    authorId: String,
  },

  methods: {
    updateNews(value) {
      this.$emit('update', this.news);
    },
    deleteNews() {
      this.$emit('remove', this.news);
    }
  }
}
/*
import { Vue, Component, Prop, Emit } from 'nuxt-property-decorator';
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
*/
</script>

<style scoped>

</style>
