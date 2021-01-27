<template>
  <div class="p-24">
    <h1 class="text-2xl text-center font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate p-12">News List</h1>
    <div class="flex items-center justify-center">
      <NewsForm v-if="token" @sendTitle="addItem($event)"></NewsForm>
    </div>
    <br />
    <button
      class="text-gray-300 bg-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
      v-if="showOrderByDesc()" type="button" @click="sortAsc()">
      Sort &#x2B06;
    </button>
    <button
      class="text-gray-300 bg-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
      v-else-if="showOrderByAsc()" type="button" @click="sortDesc()">
      Sort &#x2B07;
    </button>
    <br />
    <h3 v-if="isEmpty()">The list is empty :(</h3>
    <div class="grid md:grid-cols-3 gap-5 gap-y-10">
      <NewsItem
        v-for="item in newsItems"
        :key="item.id"
        :news="item"
        :token="token"
        :authorId="authorId"
        @update="vote($event)"
        @remove="removeItem($event)"
      ></NewsItem>
    </div>
    <footer class="container bg-grey-lighter p-8">
      <hr class="p-4">
      <div class="sm:flex mb-4">
        <div class="sm:w-1/4 h-auto">
          <div class="text-orange-500 mb-2">Orange</div>
          <ul class="list-reset leading-normal">
            <li class="hover:text-orange text-grey-darker">One</li>
            <li class="hover:text-orange text-grey-darker">Two</li>
            <li class="hover:text-orange text-grey-darker">Three</li>
            <li class="hover:text-orange text-grey-darker">Four</li>
            <li class="hover:text-orange text-grey-darker">Five</li>
            <li class="hover:text-orange text-grey-darker">Six</li>
            <li class="hover:text-orange text-grey-darker">Seven</li>
            <li class="hover:text-orange text-grey-darker">Eight</li>
          </ul>
        </div>
        <div class="sm:w-1/4 h-auto sm:mt-0 mt-8">
          <div class="text-blue-500 mb-2">Blue</div>
          <ul class="list-reset leading-normal">
            <li class="hover:text-blue text-grey-darker">One</li>
            <li class="hover:text-blue text-grey-darker">Two</li>
            <li class="hover:text-blue text-grey-darker">Three</li>
          </ul>

          <div class="text-blue-300 mb-2 mt-4">Blue-light</div>
          <ul class="list-reset leading-normal">
            <li class="hover:text-blue-light text-grey-darker">One</li>
            <li class="hover:text-blue-light text-grey-darker">Two</li>
            <li class="hover:text-blue-light text-grey-darker">Three</li>
          </ul>

        </div>
        <div class="sm:w-1/4 h-auto sm:mt-0 mt-8">
          <div class="text-green-900 mb-2">Green-dark</div>
          <ul class="list-reset leading-normal">
            <li class="hover:text-green-dark text-grey-darker">One</li>
            <li class="hover:text-green-dark text-grey-darker">Two</li>
            <li class="hover:text-green-dark text-grey-darker">Three</li>
          </ul>

          <div class="text-green-400 mb-2 mt-4">Green-light</div>
          <ul class="list-reset leading-normal">
            <li class="hover:text-green-light text-grey-darker">One</li>
            <li class="hover:text-green-light text-grey-darker">Two</li>
            <li class="hover:text-green-light text-grey-darker">Three</li>
          </ul>


        </div>
        <div class="sm:w-1/2 sm:mt-0 mt-8 h-auto">
          <div class="text-red-500 mb-2">Newsletter</div>
          <p class="text-gray-700 leading-normal">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, consectetur. </p>
          <div class="mt-4 flex">
            <input type="text" class="p-2 border border-grey-light round text-grey-dark text-sm h-auto" placeholder="Your email address">
            <button class="bg-orange-500 text-white rounded-sm h-auto text-xs p-3">Subscribe</button>
          </div>
        </div>

      </div>
    </footer>
  </div>
</template>

<script>
import gql from "graphql-tag";
import jwtDecode from "jwt-decode";
import NewsItem from "~/components/NewsItem/NewsItem";

const SortingOrder = {
  Desc: 0,
  Asc: 1
};

const FETCH_ITEMS = gql`query {posts {id,title,votes,author {id,name,email}} }`;
const UPVOTE_MUTATION = gql`mutation ($id: ID!){upvote(id: $id) {id, title, votes, author {id, name, email}}}`;
const WRITE_MUTATION = gql`mutation ($title: String!){write(post: {title: $title}) {id, title, votes, author {id, name, email}}}`;

export default {
  components: {
    NewsItem
  },
  data() {
    return {
      newsItems: [],
      token: "",
      authorId: "",
      currentSortingOrder: SortingOrder.Desc
    };
  },

  async mounted() {
    await this.setupNewsList();
  },

  methods: {
    async setupNewsList() {
      this.token = this.$apolloHelpers.getToken();
      if (this.token) {
        this.authorId = jwtDecode(this.token).userId;
      }
      const { data } = await this.$apollo.query({ query: FETCH_ITEMS });
      this.newsItems = data.posts;
    },

    async vote(item) {
      const { data } = await this.$apollo.mutate({ mutation: UPVOTE_MUTATION, variables: { id: item.id } });
      if (data.upvote) {
        this.newsItems = this.newsItems.filter((elem) => elem.id !== item.id);
        this.newsItems.push(data.upvote);
      }
      this.sortNews();
    },

    isEmpty() {
      return this.newsItems.length < 1;
    },

    showOrderByDesc() {
      if (this.newsItems.length < 2) {
        return false;
      }

      return this.currentSortingOrder === SortingOrder.Desc;
    },

    showOrderByAsc() {
      if (this.newsItems.length < 2) {
        return false;
      }

      return this.currentSortingOrder === SortingOrder.Asc;
    },

    removeItem(item) {
      this.newsItems = this.newsItems.filter((elem) => elem.id !== item.id);
    },

    async addItem(title) {
      if (title && title.length < 64) {
        const item = { title, votes: 0, id: this.index++ };
        const { data } = await this.$apollo.mutate({ mutation: WRITE_MUTATION, variables: { title } });
        if (data.write) {
          this.newsItems.push(item);
          this.sortNews(this.currentSortingOrder);
        }
      }
    },

    sortDesc() {
      this.newsItems = this.newsItems.sort((a, b) => b.votes - a.votes);
      this.currentSortingOrder = SortingOrder.Desc;
    },

    sortAsc() {
      this.newsItems = this.newsItems.sort((a, b) => a.votes - b.votes);
      this.currentSortingOrder = SortingOrder.Asc;
    },

    sortNews(order = SortingOrder.Desc) {
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
};

/*
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
*/
</script>

<style scoped></style>
