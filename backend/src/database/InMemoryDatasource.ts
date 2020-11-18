import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { Post } from '../interfaces/Post';
import { User } from '../interfaces/User';
import { MutationResolvers } from '../generated/graphqlgen';
import { randomBytes } from 'crypto';
import PostInput = MutationResolvers.PostInput;
import UserInput = MutationResolvers.UserInput;
import { Context } from "../types";

export class InMemoryDatasource extends DataSource {
    users: User[] = [];

    posts: Post[] = [];

    constructor() {
        super();
    }

    initialize(config: DataSourceConfig<Context>): void | Promise<void> {
        //return super.initialize(config);
    }

    set Posts(posts: Post[]) {
        this.posts = posts;
    }

    set Users(users: User[]) {
        this.users = users;
    }

    getAllPosts(): Post[] {
        return this.posts;
    }

    getAllUsers(): User[] {
        return this.users;
    }

    getAllPostsOfOneUser(name: string): Post[] {
        return this.posts.filter(e => e.author.name === name);
    }

    getAuthor(id: string): User {
        return this.posts.filter(e => e.id === id)[0].author;
    }

    upvotePost(id: string, voter: UserInput): Post {
        return this.votePost(id, voter.name, true);
    }

    downVotePost(id: string, voter: UserInput): Post {
        return this.votePost(id, voter.name, true);
    }

    writePost(post: PostInput): Post {
        const newPost: Post = {
            ...post,
            id: randomBytes(16).toString('hex'),
            votes: 0,
            lastVoted: []
        };

        this.posts.push(newPost);
        return newPost;
    }

    private votePost(postId: string, username: string, isUpvote: boolean): Post {
        const index = this.posts.findIndex(e => e.id === postId);
        if (index < 0)
            return null;

        const voteIndex = this.posts[index].lastVoted.findIndex(e => e.username === username);

        if (voteIndex < 0) { // has not voted yet
            this.posts[index].lastVoted.push({username: username, isUpvote: isUpvote});
            ++this.posts[index].votes;
        } else if (this.posts[index].lastVoted[voteIndex].isUpvote != isUpvote) { // change vote
            this.posts[index].lastVoted[voteIndex].isUpvote = isUpvote;
            ++this.posts[index].votes;
        }

        return this.posts[index];
    }
}
