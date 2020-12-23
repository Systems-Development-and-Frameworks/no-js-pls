import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server'
import { createServer } from "../server";
import { InMemoryDatasource } from '../database/InMemoryDatasource';
import { generateSHA512Hash } from '../authorization/cryptography';
import { Post } from "../interfaces/Post";
import { User } from "../interfaces/User";
import { verifyToken } from "../authorization/authorization";
import {Neo4JDatasource} from "../database/Neo4JDatasource";
import {auth, driver} from "neo4j-driver";
import {NEO4J_PASSWORD, NEO4J_URI, NEO4J_USER} from "../config/env.config";

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

describe('queries', () => {
    describe('POSTS', () => {
        const POSTS = gql`
            query {
                posts {
                    id
                    title
                }
            }
        `

        it('returns empty array', async () => {
            await expect(query({ query: POSTS }))
                .resolves
                .toMatchObject({
                    errors: undefined,
                    data: { posts: [] }
                })
        })

        describe('given posts in the database', () => {
            beforeEach(async () => {
                const userId = await db.createUser('Stefan', 'test1@test.de', generateSHA512Hash('test123'));
                await db.writePost({title: 'Test1'}, userId);
                await db.writePost({title: 'Test2'}, userId);
            })

            it('returns posts', async () => {
                await expect(query({ query: POSTS }))
                    .resolves
                    .toMatchObject({
                        errors: undefined,
                        data: { posts:  [{
                                title: 'Test1',
                            },
                            {
                                title: 'Test2',
                            }]
                        }
                    })
            })
        })
    })
})

describe('mutations', () => {
    beforeEach(async () => {
        const SIGNUP_USER = gql`
            mutation ($name: String!, $email: String!, $password: String!) {
                signup(name: $name, email: $email, password: $password)
            }
        `;

        const data = await mutate({ mutation: SIGNUP_USER, variables: {
                name:"Guy", email:"GUY@GUY.de", password:"123456789"
            } });

        server.requestOptions.context = () => ({userId: verifyToken(data.data.signup)});
    })

    describe('WRITE_POST', () => {
        const action = () => mutate({ mutation: WRITE_POST, variables: {
            post: {
                title: 'Some post',
            }
        }},
        );
        const WRITE_POST = gql`
            mutation($post: PostInput!) {
                write(post: $post) {
                    id
                    title
                }
            }
        `;

        it('adds a post to db.posts', async () => {
            expect(await db.getAllPosts()).toHaveLength(0);
            await action();
            expect(await db.getAllPosts()).toHaveLength(1);
        })

        it('responds with created post', async () => {
            await expect(action())
                .resolves
                .toMatchObject({
                    errors: undefined,
                    data: { write: { title: 'Some post', id: expect.any(String) } }
                });
        })

        it('write a post without a token should fail', async () => {
            server.requestOptions.context = () => ({});
            await expect(action())
                .resolves
                .toMatchObject(
                    {
                        errors: [{message: 'Not Authorised!'}]
                    }
                );
        })
    })

    describe('UPVOTE_POST', () => {
        let post: Post;
        const action = () => mutate({ mutation: UPVOTE_POST, variables: {id: post.id}});
        const UPVOTE_POST = gql`
            mutation ($id: ID!) {
                upvote(id: $id) {
                    id
                    title
                    votes
                }
            }
        `;

        beforeEach(async () => {
            const userId = await db.createUser('Stefan', 'test1@test.de', generateSHA512Hash('test123'));
            post = await db.writePost({title: 'Test1'}, userId);
            await db.writePost({title: 'Test2'}, userId);
        })

        it('increment upvote in post', async () => {
            expect(await db.countVotesOfOnePost(post.id, true)).toBe(0);
            await action();
            expect(await db.countVotesOfOnePost(post.id, true)).toBe(1);
        })

        it('increment upvote in post only once per user', async () => {
            expect(await db.countVotesOfOnePost(post.id, true)).toBe(0);
            await action();
            await action();
            expect(await db.countVotesOfOnePost(post.id, true)).toBe(1);
        })

        it('upvote post without a token, should fail', async () =>{
            server.requestOptions.context = () => ({});
            await expect(action())
                .resolves
                .toMatchObject(
                    {
                        errors: [{message: 'Not Authorised!'}]
                    }
                );
        })
    })
})

