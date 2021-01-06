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
        if (!user) return null;
        if (user.password !== generateSHA512Hash(password)) return null;
        return createToken(user.id);
    },
    // @ts-ignore
    signup: (parent, {name, email, password}, { dataSources }) => {
        email = email.toLocaleLowerCase();
        if (password.length < 8) throw Error('Password is too short!');
        if (email.indexOf('@') < 1) throw Error('Invalid email address!');
        if (dataSources.databaseAPI.getUserPerEmail(email) !== undefined) throw Error('Email address already taken!');
        const userId = dataSources.databaseAPI.createUser(name, email, password);
        return createToken(userId);
    }
};
