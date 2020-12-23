import {auth, driver} from "neo4j-driver";
import {NEO4J_PASSWORD, NEO4J_URI, NEO4J_USER} from "../config/env.config";
import {Neo4JDatasource} from "../database/Neo4JDatasource";
import {createServer} from "../server";
import {createTestClient} from "apollo-server-testing";
import {gql} from "apollo-server";
import {verifyToken} from "../authorization/authorization";

const drv = driver(NEO4J_URI, auth.basic(NEO4J_USER, NEO4J_PASSWORD));
const db: Neo4JDatasource = new Neo4JDatasource(drv);
const server = createServer(db);
const {query, mutate} = createTestClient(server);

beforeEach(async () => {
    await db.erase();
})

afterAll( async () => {
    await drv.close();
})

describe('mutations', () => {
    const SIGNUP_USER = gql`
        mutation ($name: String!, $email: String!, $password: String!) {
            signup(name: $name, email: $email, password: $password)
        }
    `;
    const action = () => mutate({mutation: SIGNUP_USER, variables: {
            name:"Guy", email:"GUY@GUY.de", password:"123456789"
        }})

    describe('sign up user', () => {
        it('should sign up a user successfully', async () => {
            await expect(action())
                .resolves
                .toMatchObject({
                    data: {
                        signup: expect.any(String)
                    }
                })
        })
    })

    describe('login a user', () => {
        beforeEach(async () => {
            await action();
        })

        const LOGIN = gql`
            mutation ($email: String!, $password: String!) {
                login(email: $email, password: $password)
            }
        `;

        it('should login a user successfully', async () => {
            await expect(mutate({mutation: LOGIN, variables: {
                email: 'GUY@GUY.de', password: '123456789'
                }}))
                .resolves
                .toMatchObject({
                    data: {
                        login: expect.any(String)
                    }
                })
        })
    })
})
