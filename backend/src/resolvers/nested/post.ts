import { PostResolvers } from '../../generated/graphqlgen';

export const Post: PostResolvers.Type = {
    ...PostResolvers.defaultResolvers,
    // @ts-ignore
    author: (parent, _args, { dataSources }) => {
        return dataSources.databaseAPI.getAuthor(parent.id);
    },
};
