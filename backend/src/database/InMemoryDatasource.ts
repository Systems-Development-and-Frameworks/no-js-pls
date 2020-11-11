import { DataSource } from 'apollo-datasource';
import { Post } from '../interfaces/Post';
import { User } from '../interfaces/User';
import { MutationResolvers } from '../generated/graphqlgen';
import PostInput = MutationResolvers.PostInput;
import UserInput = MutationResolvers.UserInput;

export class InMemoryDatasource extends DataSource {
    users: User[] = [
        {
            name: 'Stefan'
        },
        {
            name: 'Daniel'
        },
        {
            name: 'Robin'
        }
    ];

    posts: Post[] = [
        {
            id: '0',
            title: 'Test1',
            votes: 4,
            author: this.users[0]
        },
        {
            id: '1',
            title: 'Test2',
            votes: 1,
            author: this.users[1]
        }
    ];

    constructor() {
        super();
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
        const index = this.posts.findIndex(e => e.id === id && e.author.name === voter.name);
        ++this.posts[index].votes;
        return this.posts[index];
    }

    writePost(post: PostInput): Post {
        const newPost: Post = {
            ...post,
            id: this.posts.length.toString(),
            votes: 0
        };

        this.posts.push(newPost);
        return newPost;
    }
}
