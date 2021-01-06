import {ApolloServer, gql} from "apollo-server";
import {readFileSync} from "fs";
import {resolvers} from "./resolvers/resolvers";
import {InMemoryDatasource} from "./database/InMemoryDatasource";
import {randomBytes} from "crypto";
import {generateSHA512Hash} from "./authorization/cryptography";
import {verifyToken} from "./authorization/authorization";
import {applyMiddleware} from "graphql-middleware";
import { makeExecutableSchema } from 'graphql-tools'
import {permission} from "./shield/shield";

const databaseAPI = new InMemoryDatasource();
databaseAPI.Users = [
    {
        id: '123',
        name: 'Stefan',
        email: 'test1@test.de',
        password: generateSHA512Hash('test123')
    },
    {
        id: '456',
        name: 'Daniel',
        email: 'test2@test.de',
        password: generateSHA512Hash('test123')
    },
    {
        id: '789',
        name: 'Robin',
        email: 'test3@test.de',
        password: generateSHA512Hash('test123')
    }
];
databaseAPI.Posts = [
    {
        id: '0',
        title: 'Test1',
        votes: 4,
        author: databaseAPI.users[0].id,
        lastVoted: []
    },
    {
        id: '1',
        title: 'Test2',
        votes: 1,
        author: databaseAPI.users[1].id,
        lastVoted: []
    }
];
const typeDefs = gql`${readFileSync('src/schema.graphql')}`;
// @ts-ignore
let schema = makeExecutableSchema({typeDefs, resolvers});
schema = applyMiddleware(schema, permission);

export const createServer = (db?: InMemoryDatasource) => {
    const dbAPI =  db ? db : databaseAPI;
   return new ApolloServer({
        schema,
        dataSources: () => {
            return {
                databaseAPI: dbAPI
            };
        },
       context: ({req}) => ({
           userId: verifyToken(req?.headers?.authorization),
       }),
        playground: true,
        introspection: true
    });
};

