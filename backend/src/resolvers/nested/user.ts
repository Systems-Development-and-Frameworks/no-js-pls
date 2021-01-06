import {UserResolvers} from '../../generated/graphqlgen';

export const User: UserResolvers.Type = {
    ...UserResolvers.defaultResolvers,

    posts: (parent, _args, ctx) => {
        return ctx.dataSources.databaseAPI.getAllPostsOfOneUser(parent.id);
    },
};
