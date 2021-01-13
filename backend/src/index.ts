import {closeConnection, createServer} from "./server";



const server = createServer();

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
}).finally(async () => await closeConnection());
