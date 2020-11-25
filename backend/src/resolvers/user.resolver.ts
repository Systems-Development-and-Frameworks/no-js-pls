import { QueryResolvers, MutationResolvers } from '../generated/graphqlgen';

export const UserQueryResolver: Pick<QueryResolvers.Type
    , 'users'
    > = {
    // @ts-ignore
    users: (parent, _args, { dataSources }) => {
        return dataSources.databaseAPI.getAllUsers();
    }
};
