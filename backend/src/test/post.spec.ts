import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server'
import { createServer } from "../server";
import { InMemoryDatasource } from "../database/InMemoryDatasource";

let db: InMemoryDatasource = new InMemoryDatasource();
const server = createServer(db);
const {query, mutate} = createTestClient(server);

const getDummyUsers = () => [
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

const getDummyPosts = () => [
    {
        id: '0',
        title: 'Test1',
        votes: 0,
        author: getDummyUsers()[0],
        lastVoted: []
    },
    {
        id: '1',
        title: 'Test2',
        votes: 0,
        author: getDummyUsers()[1],
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

    describe('WRITE_POST', () => {
        const action = () => mutate({ mutation: WRITE_POST, variables: {
            post: {
                title: 'Some post',
                author: {
                       name: getDummyUsers()[0].name
                }
            }
        }});
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
    })

    describe('UPVOTE_POST', () => {
        const action = () => mutate({ mutation: UPVOTE_POST, variables: {id: getDummyPosts()[0].id,
                voter: {name: getDummyUsers()[0].name}}});
        const UPVOTE_POST = gql`
            mutation ($id: ID!, $voter: UserInput!) {
                upvote(id: $id, voter: $voter) {
                    id
                    title
                    votes
                }
            }
        `;

        beforeEach(() => {
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
    })
})

