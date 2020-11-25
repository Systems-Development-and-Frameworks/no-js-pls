import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { Post } from '../interfaces/Post';
import { User } from '../interfaces/User';
import { MutationResolvers } from '../generated/graphqlgen';
import { randomBytes } from 'crypto';
import PostInput = MutationResolvers.PostInput;
import { Context } from "../types";
import {generateSHA512Hash} from "../authorization/cryptography";

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

    createUser(name: string, email: string, password: string): string {
        const newUser: User = {
            id: randomBytes(16).toString('hex'),
            name,
            email,
            password: generateSHA512Hash(password)
        };
        this.users.push(newUser);
        return newUser.id;
    }

    getUserPerId(id: string): User {
        return this.users.find(e => e.id === id);
    }

    getUserPerEmail(email: string): User {
        return this.users.find(e => e.email === email);
    }

    getAllPosts(): Post[] {
        return this.posts;
    }

    getAllUsers(): User[] {
        return this.users;
    }

    getAuthor(postId: string): User {
        const authorId = this.posts.find(post => post.id === postId).author;
        return this.users.find(user => user.id === authorId);
    }

    getAllPostsOfOneUser(userId: string): Post[] {
        return this.posts.filter(post => post.author === userId);
    }

    upVotePost(id: string, voterId: string): Post {
        return this.votePost(id, voterId, true);
    }

    downVotePost(id: string, voter: User): Post {
        return this.votePost(id, voter.name, false);
    }

    writePost(post: PostInput, author: string): Post {
        const newPost: Post = {
            ...post,
            id: randomBytes(16).toString('hex'),
            votes: 0,
            author,
            lastVoted: []
        };

        this.posts.push(newPost);
        return newPost;
    }

    private votePost(postId: string, voterId: string, isUpvote: boolean): Post {
        const index = this.posts.findIndex(e => e.id === postId);
        if (index < 0)
            return null;

        const voteIndex = this.posts[index].lastVoted.findIndex(e => e.voterId === voterId);

        if (voteIndex < 0) { // has not voted yet
            this.posts[index].lastVoted.push({voterId, isUpvote: isUpvote});
            ++this.posts[index].votes;
        } else if (this.posts[index].lastVoted[voteIndex].isUpvote != isUpvote) { // change vote
            this.posts[index].lastVoted[voteIndex].isUpvote = isUpvote;
            ++this.posts[index].votes;
        }

        return this.posts[index];
    }
}
