import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { Post } from '../interfaces/Post';
import { User } from '../interfaces/User';
import { MutationResolvers } from '../generated/graphqlgen';
import { randomBytes } from 'crypto';
import PostInput = MutationResolvers.PostInput;
import { Context } from "../types";
import {generateSHA512Hash} from "../authorization/cryptography";
import {DatasourceAPI} from "./DatasourceAPI";

export class InMemoryDatasource extends DataSource implements DatasourceAPI{
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

    createUser(name: string, email: string, password: string): Promise<string> {
        const newUser: User = {
            id: randomBytes(16).toString('hex'),
            name,
            email,
            password: generateSHA512Hash(password)
        };
        this.users.push(newUser);
        return new Promise<string>(resolve => {resolve(newUser.id)});
    }

    getUserPerId(id: string): Promise<User> {
        return new Promise<User>(resolve => {
            resolve(this.users.find(e => e.id === id));
        });
    }

    getUserPerEmail(email: string): Promise<User | undefined> {
        return new Promise<User>(resolve => {
            resolve(this.users.find(e => e.email === email));
        });
    }

    getAllPosts(): Promise<Post[]> {
        return new Promise<Post[]>(resolve => {
            resolve(this.posts);
        });
    }

    getAllUsers(): Promise<User[]> {
        return new Promise<User[]>(resolve => {
            resolve(this.users);
        });
    }

    getAuthor(postId: string): Promise<User> {
        const authorId = this.posts.find(post => post.id === postId).author;
        return new Promise<User>(resolve => {
            resolve(this.users.find(user => user.id === authorId));
        });
    }

    getAllPostsOfOneUser(userId: string): Promise<Post[]> {
        return new Promise<Post[]>(resolve => {
            resolve(this.posts.filter(post => post.author === userId));
        });
    }

    upVotePost(id: string, voterId: string): Promise<Post> {
        return new Promise<Post>(resolve => {
            resolve(this.votePost(id, voterId, true));
        });
    }

    downVotePost(id: string, voterId: string): Promise<Post> {
        return new Promise<Post>(resolve => {
            resolve(this.votePost(id, voterId, false));
        });
    }

    writePost(post: PostInput, author: string): Promise<Post> {
        const newPost: Post = {
            ...post,
            id: randomBytes(16).toString('hex'),
            votes: 0,
            author,
            lastVoted: []
        };

        this.posts.push(newPost);
        return new Promise<Post>(resolve => {
            resolve(newPost);
        });
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
