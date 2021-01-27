<template>
  <div>
    <h2 class="text-xl text-center font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate">{{news.title}} ({{news.votes}})</h2>
    <br>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consequat pulvinar convallis. Vivamus iaculis,
      odio ut ornare dignissim, dui nunc sollicitudin metus, quis pellentesque dui orci nec leo. Aliquam imperdiet
      quam sit amet orci molestie convallis. Nullam odio ex, ornare vel efficitur laoreet, suscipit eu odio. Aliquam
      ac nisi vitae leo fermentum mollis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur
      ridiculus mus. Sed suscipit nulla nisl, vel dictum ex blandit nec. Nunc interdum nunc risus, ut molestie lacus
      sollicitudin sit amet. Phasellus ut nibh tortor.
    </p>
    <br>
    <button class="text-black bg-gray-200 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" v-if="token" @click="updateNews(1)">Upvote</button>
    <button class="text-black bg-gray-200 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" v-if="token" @click="updateNews(-1)">Downvote</button>
    <button class="text-black bg-gray-200 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" v-if="authorId === news.author.id">Edit</button>
    <button class="text-black bg-red-300 hover:bg-red-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium" v-if="authorId === news.author.id" @click="deleteNews">Delete</button>
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
