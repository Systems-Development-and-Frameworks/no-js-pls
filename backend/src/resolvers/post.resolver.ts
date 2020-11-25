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
    write: (parent, { post }, ctx) => {
        return ctx.dataSources.databaseAPI.writePost(post, ctx.userId);
    },
    // @ts-ignore
    upvote: (parent, { id}, ctx) => {
        return ctx.dataSources.databaseAPI.upVotePost(id, ctx.userId);
    }
};
