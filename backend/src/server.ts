import {ApolloServer, gql} from "apollo-server";
import {readFileSync} from "fs";
import {resolvers} from "./resolvers/resolvers";
import {InMemoryDatasource} from "./database/InMemoryDatasource";

const databaseAPI = new InMemoryDatasource();
databaseAPI.Users = [
    {
        name: 'Stefan'
    },
    {
        name: 'Daniel'
    },
    {
        name: 'Robin'
    }
];
databaseAPI.Posts = [
    {
        id: '0',
        title: 'Test1',
        votes: 4,
        author: databaseAPI.users[0],
        lastVoted: []
    },
    {
        id: '1',
        title: 'Test2',
        votes: 1,
        author: databaseAPI.users[1],
        lastVoted: []
    }
];

export const createServer = (db?: InMemoryDatasource) => {
    const dbAPI =  db ? db : databaseAPI;
   return new ApolloServer({
        typeDefs: gql`${readFileSync('src/schema.graphql')}`,
        // @ts-ignore
        resolvers,
        dataSources: () => {
            return {
                databaseAPI: dbAPI
            };
        },
        playground: true,
        introspection: true
    });
};

