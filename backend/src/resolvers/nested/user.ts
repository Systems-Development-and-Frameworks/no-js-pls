import {UserResolvers} from '../../generated/graphqlgen';

export const User: UserResolvers.Type = {
    ...UserResolvers.defaultResolvers,

    // @ts-ignore
    posts: (parent, _args, { dataSources }) => {
        return dataSources.databaseAPI.getAllPostsOfOneUser(parent.name);
    },
};
