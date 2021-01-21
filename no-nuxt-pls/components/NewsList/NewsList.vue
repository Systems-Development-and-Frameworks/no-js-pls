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
      :token="token"
      :authorId="authorId"
      @update="vote($event)"
      @remove="removeItem($event)"
    ></NewsItem>
    <br />
    <NewsForm v-if="token" @sendTitle="addItem($event)"></NewsForm>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import jwtDecode from "jwt-decode";

const SortingOrder = {
  Desc: 0,
  Asc: 1,
}

const FETCH_ITEMS = gql`query {posts {id,title,votes,author {id,name,email}} }`;
const UPVOTE_MUTATION = gql`mutation ($id: ID!){upvote(id: $id) {id, title, votes, author {id, name, email}}}`;
const WRITE_MUTATION = gql`mutation ($title: String!){write(post: {title: $title}) {id, title, votes, author {id, name, email}}}`;

export default {
  data() {
    return {
      newsItems: [],
      token: '',
      authorId: '',
      currentSortingOrder: SortingOrder.Desc,
    }
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
}

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
