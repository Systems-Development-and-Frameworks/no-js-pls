import { QueryResolvers, MutationResolvers } from '../generated/graphqlgen';

export const PostQueryResolver: Pick<QueryResolvers.Type
    , 'posts'
    > = {
    // @ts-ignore
    posts: (parent, _args, { dataSources }) => {
        return dataSources.databaseAPI.getAllPosts();
    }
};

export const PostMutationResolver: Pick<MutationResolvers.Type
    , 'write'
    | 'upvote'
    > = {
    // @ts-ignore
    write: (parent, { post }, { dataSources }) => {
        return dataSources.databaseAPI.writePost(post);
    },
    // @ts-ignore
    upvote: (parent, {id, voter}, { dataSources }) => {
        return dataSources.databaseAPI.upvotePost(id, voter);
    }
};
