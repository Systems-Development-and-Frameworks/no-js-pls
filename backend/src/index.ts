import { ApolloServer, gql } from 'apollo-server';
import { InMemoryDatasource } from './database/InMemoryDatasource';
import { resolvers } from './resolvers/resolvers';
import { readFileSync } from 'fs';

const databaseAPI = new InMemoryDatasource();

const server = new ApolloServer({
    typeDefs: gql`${readFileSync('src/schema.graphql')}`,
    // @ts-ignore
    resolvers,
    dataSources: () => {
        return {
            databaseAPI
        };
    },
    playground: true,
    introspection: true
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
