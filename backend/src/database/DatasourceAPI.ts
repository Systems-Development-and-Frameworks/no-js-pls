import {DataSourceConfig} from "apollo-datasource";
import {Context} from "../types";
import {User} from "../interfaces/User";
import {Post} from "../interfaces/Post";
import {MutationResolvers} from "../generated/graphqlgen";
import PostInput = MutationResolvers.PostInput;

export interface DatasourceAPI {
    initialize(config: DataSourceConfig<Context>): void | Promise<void>;

    createUser(name: string, email: string, password: string): Promise<string>;

    getUserPerId(id: string): Promise<User>;

    getUserPerEmail(email: string): Promise<User | undefined>;

    getAllPosts(): Promise<Post[]>;

    getAllUsers(): Promise<User[]>;

    getAuthor(postId: string): Promise<User>;

    getAllPostsOfOneUser(userId: string): Promise<Post[]>;

    upVotePost(id: string, voterId: string): Promise<Post>;

    downVotePost(id: string, voterId: string): Promise<Post>;

    writePost(post: PostInput, author: string): Promise<Post>;
}
