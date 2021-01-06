import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server'
import { createServer } from "../server";
import { InMemoryDatasource } from '../database/InMemoryDatasource';
import { generateSHA512Hash } from '../authorization/cryptography';
import { Post } from "../interfaces/Post";
import { User } from "../interfaces/User";
import { verifyToken } from "../authorization/authorization";

let db: InMemoryDatasource = new InMemoryDatasource();
const server = createServer(db);
const {query, mutate} = createTestClient(server);

const getDummyUsers = (): User[] => [
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

const getDummyPosts = (): Post[] => [
    {
        id: '0',
        title: 'Test1',
        votes: 0,
        author: '123',
        lastVoted: []
    },
    {
        id: '1',
        title: 'Test2',
        votes: 0,
        author: '456',
        lastVoted: []
    }
];

beforeEach(() => {
    db = new InMemoryDatasource();
    server.requestOptions.dataSources = () => {return {databaseAPI: db}};
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
            beforeEach(() => {
                db.posts = getDummyPosts();
            })

            it('returns posts', async () => {
                await expect(query({ query: POSTS }))
                    .resolves
                    .toMatchObject({
                        errors: undefined,
                        data: { posts:  [{
                                id: '0',
                                title: 'Test1',
                            },
                            {
                                id: '1',
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
            expect(db.posts).toHaveLength(0);
            await action();
            expect(db.posts).toHaveLength(1);
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
        const action = () => mutate({ mutation: UPVOTE_POST, variables: {id: getDummyPosts()[0].id,
                voter: {name: getDummyUsers()[0].name}}});
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
            db.posts = getDummyPosts();
        })

        it('increment upvote in post', async () => {
            expect(db.posts.find(e => e.id === getDummyPosts()[0].id).votes).toBe(0);
            await action();
            expect(db.posts.find(e => e.id === getDummyPosts()[0].id).votes).toBe(1);
        })

        it('increment upvote in post only once per user', async () => {
            expect(db.posts.find(e => e.id === getDummyPosts()[0].id).votes).toBe(0);
            await action();
            await action();
            expect(db.posts.find(e => e.id === getDummyPosts()[0].id).votes).toBe(1);
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

