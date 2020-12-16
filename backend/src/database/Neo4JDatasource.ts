import {DataSource, DataSourceConfig} from "apollo-datasource";
import {Driver, session, Session} from "neo4j-driver";
import {Context} from "../types";
import {Post} from "../interfaces/Post";
import {User} from "../interfaces/User";
import {randomBytes} from "crypto";
import {generateSHA512Hash} from "../authorization/cryptography";
import {NEO4J_DATABASE} from "../config/env.config";
import {MutationResolvers} from "../generated/graphqlgen";
import PostInput = MutationResolvers.PostInput;
import {DatasourceAPI} from "./DatasourceAPI";

export class Neo4JDatasource extends DataSource implements DatasourceAPI {
    private driver: Driver;

    constructor(driver: Driver) {
        super();
        this.driver = driver;
    }

    initialize(config: DataSourceConfig<Context>): void | Promise<void> { }

    async createUser(name: string, email: string, password: string): Promise<string> {
        if (!name || name.length < 1 && name.length >= 32) throw Error('Name is invalid');
        if (!email || email.length > 1 && email.indexOf('@') < 1) throw Error('Email is invalid');
        if (!password || password.length < 8) throw Error('Password is invalid');

        const userId = randomBytes(16).toString('hex');
        const hPassword = generateSHA512Hash(password);
        const session = this.createSession();
        await session.writeTransaction(tx => {
            tx.run("CREATE (n:User {id: $id, name: $name, email: $email, password: $password }) RETURN n {.*}", {
                id: userId, name: name, email: email, password: hPassword
            })
                .catch(
                    err => console.log("Error in createUser: ", err)
                );
        })
            .catch(err => console.log(err))
            .finally(() => {
                    session.close();
                }
            );
        return userId;
    }

    async getUserPerId(id: string): Promise<User> {
        let user: User;
        const session = this.createSession();
        await session.readTransaction(tx => {
            tx.run(
                "MATCH (u:User) WHERE u.id =~ $id RETURN u {.*}", {id: id}
            ).then(result => {
                user = result.records[0].get('u')
            })
        })
            .catch(err => console.log(err))
            .finally(() => session.close());

        return user;
    }

    async getUserPerEmail(email: string): Promise<User> {
        let user: User;
        const session = this.createSession();
        await session.readTransaction(tx => {
            tx.run("MATCH (u:User) WHERE u.email =~ $email RETURN u {.*}", {email: email})
                .then(
                    result => {
                        user = result.records[0]?.get('u');
                    })
                .catch(
                    err => console.log("Error in getUserPerEmail: ", err))
        })
            .catch(err => console.log(err))
            .finally(() => session.close());
        return user;
    }

    async getAllPosts(): Promise<Post[]> {
        let posts: Post[];
        const session = this.createSession();
        await session.readTransaction(tx => {
            tx.run("MATCH (p:Post) RETURN p {.*}").then(result => {
                posts = result.records.map(result => result.get('p'));
            });
        })
            .catch(err => console.log(err))
            .finally(() => session.close())

        return posts;
    }

    async getAllUsers(): Promise<User[]> {
        let users: User[];
        const session = this.createSession();
        await session.readTransaction(tx => {
            tx.run("MATCH (u:User) RETURN u {.*}").then(result => {
                users = result.records.map(result => result.get('p'));
            })
                .catch(err => console.log(err));
        })
            .catch(err => console.log(err))
            .finally(() => session.close());

        return users;
    }

    async getAuthor(postId: string): Promise<User> {
        let user: User;
        const session = this.createSession();
        await session.readTransaction(tx => {
            tx.run("MATCH (p:Post)-[:AUTHORED_BY]->(u:User) RETURN u {.*}").then(result => {
                user = result.records[0].get('u');
            })
                .catch(err => console.log(err));
        })
            .catch(err => console.log(err))
            .finally(() => session.close());

        return user;
    }

    async getVoteCountOfPost(postId: string): Promise<number> {
        let count: number;
        const session = this.createSession();
        await session.readTransaction(tx => {
            tx.run("")
                .then()
                .catch(err => console.log(err))
        })
            .catch(err => console.log(err))
            .finally(() => session.close());

        return count;
    }

    async getAllPostsOfOneUser(userId: string): Promise<Post[]> {
        let posts: Post[];
        const session = this.createSession();
        await session.readTransaction(tx => {
            tx.run("MATCH (u:USER)<-[:AUTHORED_BY]-(p:Post) RETURN p {.*}").then(result => {
                posts = result.records.map(record => record.get('p'));
            })
                .catch(err => console.log(err));
        })
            .catch(err => console.log(err))
            .finally(() => session.close());

        return posts;
    }

    async upVotePost(id: string, voterId: string): Promise<Post> {
        return await this.votePost(id, voterId, true);
    }

    async downVotePost(id: string, voterId: string): Promise<Post> {
        return await this.votePost(id, voterId, false);
    }

    async writePost(post: PostInput, author: string): Promise<Post> {
        let newPost: Post;
        const postId = randomBytes(16).toString('hex');
        const session = this.createSession();
        await session.writeTransaction(tx => {
            tx.run("MATCH (u:User {id:$userId}) CREATE (p:Post {id: $id, title: $title })-[:AUTHORED_BY]->(u) RETURN p {.*}", {
                id: postId, title: post.title, userId: author
            }).then(result => {
                    newPost = result.records[0]?.get('p');
                }
            )
                .catch(err => console.log(err))
        })
            .catch(err => console.log(err))
            .finally(() => session.close());

        return newPost;
    }

    private async votePost(postId: string, voterId: string, isUpvote: boolean): Promise<Post> {
        let post: Post;
        const session = this.createSession();
        await session.writeTransaction(tx => {
            tx.run("MATCH (p:Post {id: $postId}), (u:User {id: $voterId}) " +
                "CREATE (p)<-[:VOTE {isUpVoted: $isUpVoted}]-(u) RETURN p {.*}", {
                postId: postId, voterId: voterId, isUpVoted: isUpvote
            }).then(result => {
                post = result.records[0].get('p')
            })
                .catch(err => console.log(err));
        })
            .catch(err => console.log(err))
            .finally(() => session.close());

        return post;
    }

    private createSession(): Session {
        return this.driver.session({
            database: NEO4J_DATABASE,
            defaultAccessMode: session.WRITE
        });
    }
}
