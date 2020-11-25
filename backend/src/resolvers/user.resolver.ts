import { QueryResolvers, MutationResolvers } from '../generated/graphqlgen';
import { createToken } from "../authorization/authorization";
import { generateSHA512Hash } from "../authorization/cryptography";

export const UserQueryResolver: Pick<QueryResolvers.Type
    , 'users'
    > = {
    // @ts-ignore
    users: (parent, _args, { dataSources }) => {
        return dataSources.databaseAPI.getAllUsers();
    }
};

export const UserMutationResolver: Pick<MutationResolvers.Type
    , 'login'
    | 'signup'
    > = {
    // @ts-ignore
    login: (parent, {email, password}, {dataSources}) => {
        const user = dataSources.databaseAPI.getUserPerEmail(email);
        if (!user) throw Error("User dosn't exsist")
        if (user.password !== generateSHA512Hash(password)) throw Error("Wrong password")
        return createToken(user.id);
    },
    // @ts-ignore
    signup: (parent, {name, email, password}, { dataSources }) => {
        const userId = dataSources.databaseAPI.createUser(name, email, password);
        return createToken(userId);
    }
};
