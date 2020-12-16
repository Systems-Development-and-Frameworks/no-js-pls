import { PostResolvers } from '../../generated/graphqlgen';

export const Post: PostResolvers.Type = {
    ...PostResolvers.defaultResolvers,
    author: (parent, _args, ctx) => {
        return ctx.dataSources.databaseAPI.getAuthor(parent.id);
    },
    votes: (parent, args, ctx) => {
        // TODO: Anfrage an die Datenbank
        return null;
    }
};
