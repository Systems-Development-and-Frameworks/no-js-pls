import {DataSourceConfig} from "apollo-datasource";
import {Context} from "../types";
import {User} from "../interfaces/User";
import {Post} from "../interfaces/Post";
import {MutationResolvers} from "../generated/graphqlgen";
import PostInput = MutationResolvers.PostInput;

export interface DatasourceAPI {
    initialize(config: DataSourceConfig<Context>): void | Promise<void>;

    createUser(name: string, email: string, password: string): string;

    getUserPerId(id: string): User;

    getUserPerEmail(email: string): User;

    getAllPosts(): Post[];

    getAllUsers(): User[];

    getAuthor(postId: string): User;

    getAllPostsOfOneUser(userId: string);

    upVotePost(id: string, voterId: string);

    downVotePost(id: string, voter: User);

    writePost(post: PostInput, author: string): Post;
}
