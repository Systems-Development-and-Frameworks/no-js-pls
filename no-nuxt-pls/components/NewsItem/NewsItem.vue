<template>
  <div>
    <h2>{{news.title}} ({{news.votes}})</h2>
    <br>
    <button v-if="token" @click="updateNews(1)">Upvote</button>
    <button v-if="token" @click="updateNews(-1)">Downvote</button>
    <button v-if="authorId === news.author.id" @click="deleteNews">Remove</button>
  </div>
</template>

<script>
import jwtDecode from "jwt-decode";

export default {
  data() {
    return {
      token: '',
      authorId: ''
    }
  },

  mounted() {
    this.token = this.$apolloHelpers.getToken();
    if (this.token) {
      this.authorId = jwtDecode(this.token);
    }
  },

  props: {
    news: Object
  },

  methods: {
    updateNews(value) {
      this.news.votes += value;
      this.$emit('update');
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
