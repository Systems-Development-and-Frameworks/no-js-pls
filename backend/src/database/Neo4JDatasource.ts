import {DataSource, DataSourceConfig} from "apollo-datasource";
import {Driver, Session} from "neo4j-driver";
import {Context} from "../types";
import {Post} from "../interfaces/Post";
import {User} from "../interfaces/User";
import {randomBytes} from "crypto";
import {generateSHA512Hash} from "../authorization/cryptography";
import {NEO4J_DATABASE} from "../config/env.config";
import {MutationResolvers} from "../generated/graphqlgen";
import PostInput = MutationResolvers.PostInput;
import {DatasourceAPI} from "./DatasourceAPI";

export class Neo4JDatasource extends DataSource implements DatasourceAPI{
    private driver: Driver;

    constructor(driver: Driver) {
        super();
        this.driver = driver;
    }

    initialize(config: DataSourceConfig<Context>): void | Promise<void> {
        //return super.initialize(config);
    }

    createUser(name: string, email: string, password: string): string {
        if (!name || name.length > 1 && name.length < 32) throw Error('Name is invalid');
        if (!email || email.length > 1 && email.indexOf('@') < 1) throw Error('Email is invalid');
        if (!password || password.length < 8) throw Error('Password is invalid');

        const userId = randomBytes(16).toString('hex');
        const hPassword = generateSHA512Hash(password);
        const session = this.createSession();
        session.writeTransaction(tx => {
            tx.run("CREATE (n:User {id: $id, name: $name, email: $email, password: $password }) RETURN n", {
                id: userId, name: name, email: email, password: hPassword
            }).catch(
                err => console.log("Error in createUser: ",err)
            ).finally(() => {
                session.close();
                }
            );
        })
        return userId;
    }

    getUserPerId(id: string): User {
        let user: User;
        const session = this.createSession();
        session.readTransaction(tx => {
            tx.run(
                "MATCH (u:User) WHERE u.id == $id RETURN u", {id: id}
            ).then(result => {
                user = result.records[0].get('u')
            }).finally(() => session.close());
        });

        return user;
    }

    getUserPerEmail(email: string): User {
        let user: User;
        const session = this.createSession();
        session.readTransaction(tx => {
            tx.run("MATCH (u:User) WHERE u.email =~ $email RETURN u", {email: email}).then(
                result => { user = result.records[0].get('u') }
            ).catch(
                err => console.log("Error in getUserPerEmail: ",err)
            ).finally(() => session.close());
        }).catch();

        return user;
    }

    getAllPosts(): Post[] {
        let posts: Post[];
        const session = this.createSession();
        session.readTransaction(tx => {
            tx.run("MATCH (p:Post) RETURN p").then(result => {
                posts = result.records.map(result => result.get('p'));
            }).finally(() => session.close());
        })

        return posts;
    }

    getAllUsers(): User[] {
        let users: User[];
        const session = this.createSession();
        session.readTransaction(tx => {
            tx.run("MATCH (u:User) RETURN u").then(result => {
                users = result.records.map(result => result.get('p'));
            }).finally(() => session.close());
        });

        return users;
    }

    getAuthor(postId: string): User {
        let user: User;
        const session = this.createSession();
        session.readTransaction(tx => {
            tx.run("MATCH (p:Post)-[:AUTHORED_BY]->(u:User) RETURN u").then(result => {
                user = result.records[0].get('u');
            }).finally(() => session.close());
        });

        return user;
    }

    getAllPostsOfOneUser(userId: string): Post[] {
        let posts: Post[];
        const session = this.createSession();
        session.readTransaction(tx => {
            tx.run("MATCH (u:USER)<-[:AUTHORED_BY]-(p:Post) RETURN p").then(result => {
                posts = result.records.map(record => record.get('p'));
            }).finally(() => session.close());
        });

        return posts;
    }

    upVotePost(id: string, voterId: string): Post {
        return this.votePost(id, voterId, true);
    }

    downVotePost(id: string, voter: User): Post {
        return this.votePost(id, voter.name, false);
    }

    writePost(post: PostInput, author: string): Post {
        let newPost: Post;
        const postId =  randomBytes(16).toString('hex');
        const session = this.createSession();
        session.writeTransaction(tx => {
            tx.run("CREATE (p:Post) {id: $id, title: $title })-[:AUTHORED_BY]->(u:User) WHERE u.id =~ $userId RETURN p", {
                id: postId, title: post.title, userId: author
            }).then().finally(() => session.close());
        });

        return newPost;
    }

    private votePost(postId: string, voterId: string, isUpvote: boolean): Post {
        let post: Post;
        const session = this.createSession();
        session.writeTransaction(tx => {
            tx.run("MATCH (p:Post), (u:User) WHERE p.id == $postId AND u.id == $voterid" +
                "CREATE (p)<-[:VOTE {isUpVoted: $isUpVoted}]-(u) RETURN p", {
                postId: postId, voterId: voterId, isUpVoted: isUpvote
            }).then(result => {
                post = result.records[0].get('p')
            }).finally(() => session.close());
        });

        return post;
    }

    private createSession(): Session {
        return this.driver.session({});
    }
}
