// Code generated by github.com/prisma/graphqlgen, DO NOT EDIT.

import { GraphQLResolveInfo } from "graphql";
import { Post } from "../interfaces/Post";
import { User } from "../interfaces/User";
import { Context } from "../types/context";

export namespace QueryResolvers {
  export const defaultResolvers = {};

  export type PostsResolver =
    | ((
        parent: undefined,
        args: {},
        ctx: Context,
        info: GraphQLResolveInfo
      ) => Array<Post | null> | null | Promise<Array<Post | null> | null>)
    | {
        fragment: string;
        resolve: (
          parent: undefined,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo
        ) => Array<Post | null> | null | Promise<Array<Post | null> | null>;
      };

  export type UsersResolver =
    | ((
        parent: undefined,
        args: {},
        ctx: Context,
        info: GraphQLResolveInfo
      ) => Array<User | null> | null | Promise<Array<User | null> | null>)
    | {
        fragment: string;
        resolve: (
          parent: undefined,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo
        ) => Array<User | null> | null | Promise<Array<User | null> | null>;
      };

  export interface Type {
    posts:
      | ((
          parent: undefined,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo
        ) => Array<Post | null> | null | Promise<Array<Post | null> | null>)
      | {
          fragment: string;
          resolve: (
            parent: undefined,
            args: {},
            ctx: Context,
            info: GraphQLResolveInfo
          ) => Array<Post | null> | null | Promise<Array<Post | null> | null>;
        };

    users:
      | ((
          parent: undefined,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo
        ) => Array<User | null> | null | Promise<Array<User | null> | null>)
      | {
          fragment: string;
          resolve: (
            parent: undefined,
            args: {},
            ctx: Context,
            info: GraphQLResolveInfo
          ) => Array<User | null> | null | Promise<Array<User | null> | null>;
        };
  }
}

export namespace PostResolvers {
  export const defaultResolvers = {
    id: (parent: Post) => parent.id,
    title: (parent: Post) => parent.title,
    votes: (parent: Post) => parent.votes,
    author: (parent: Post) => parent.author
  };

  export type IdResolver =
    | ((
        parent: Post,
        args: {},
        ctx: Context,
        info: GraphQLResolveInfo
      ) => string | Promise<string>)
    | {
        fragment: string;
        resolve: (
          parent: Post,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo
        ) => string | Promise<string>;
      };

  export type TitleResolver =
    | ((
        parent: Post,
        args: {},
        ctx: Context,
        info: GraphQLResolveInfo
      ) => string | Promise<string>)
    | {
        fragment: string;
        resolve: (
          parent: Post,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo
        ) => string | Promise<string>;
      };

  export type VotesResolver =
    | ((
        parent: Post,
        args: {},
        ctx: Context,
        info: GraphQLResolveInfo
      ) => number | Promise<number>)
    | {
        fragment: string;
        resolve: (
          parent: Post,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo
        ) => number | Promise<number>;
      };

  export type AuthorResolver =
    | ((
        parent: Post,
        args: {},
        ctx: Context,
        info: GraphQLResolveInfo
      ) => User | Promise<User>)
    | {
        fragment: string;
        resolve: (
          parent: Post,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo
        ) => User | Promise<User>;
      };

  export interface Type {
    id:
      | ((
          parent: Post,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo
        ) => string | Promise<string>)
      | {
          fragment: string;
          resolve: (
            parent: Post,
            args: {},
            ctx: Context,
            info: GraphQLResolveInfo
          ) => string | Promise<string>;
        };

    title:
      | ((
          parent: Post,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo
        ) => string | Promise<string>)
      | {
          fragment: string;
          resolve: (
            parent: Post,
            args: {},
            ctx: Context,
            info: GraphQLResolveInfo
          ) => string | Promise<string>;
        };

    votes:
      | ((
          parent: Post,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo
        ) => number | Promise<number>)
      | {
          fragment: string;
          resolve: (
            parent: Post,
            args: {},
            ctx: Context,
            info: GraphQLResolveInfo
          ) => number | Promise<number>;
        };

    author:
      | ((
          parent: Post,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo
        ) => User | Promise<User>)
      | {
          fragment: string;
          resolve: (
            parent: Post,
            args: {},
            ctx: Context,
            info: GraphQLResolveInfo
          ) => User | Promise<User>;
        };
  }
}

export namespace UserResolvers {
  export const defaultResolvers = {
    id: (parent: User) => parent.id,
    name: (parent: User) => parent.name,
    email: (parent: User) => parent.email,
    posts: (parent: User) => (parent.posts === undefined ? null : parent.posts)
  };

  export type IdResolver =
    | ((
        parent: User,
        args: {},
        ctx: Context,
        info: GraphQLResolveInfo
      ) => string | Promise<string>)
    | {
        fragment: string;
        resolve: (
          parent: User,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo
        ) => string | Promise<string>;
      };

  export type NameResolver =
    | ((
        parent: User,
        args: {},
        ctx: Context,
        info: GraphQLResolveInfo
      ) => string | Promise<string>)
    | {
        fragment: string;
        resolve: (
          parent: User,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo
        ) => string | Promise<string>;
      };

  export type EmailResolver =
    | ((
        parent: User,
        args: {},
        ctx: Context,
        info: GraphQLResolveInfo
      ) => string | Promise<string>)
    | {
        fragment: string;
        resolve: (
          parent: User,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo
        ) => string | Promise<string>;
      };

  export type PostsResolver =
    | ((
        parent: User,
        args: {},
        ctx: Context,
        info: GraphQLResolveInfo
      ) => Array<Post | null> | null | Promise<Array<Post | null> | null>)
    | {
        fragment: string;
        resolve: (
          parent: User,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo
        ) => Array<Post | null> | null | Promise<Array<Post | null> | null>;
      };

  export interface Type {
    id:
      | ((
          parent: User,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo
        ) => string | Promise<string>)
      | {
          fragment: string;
          resolve: (
            parent: User,
            args: {},
            ctx: Context,
            info: GraphQLResolveInfo
          ) => string | Promise<string>;
        };

    name:
      | ((
          parent: User,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo
        ) => string | Promise<string>)
      | {
          fragment: string;
          resolve: (
            parent: User,
            args: {},
            ctx: Context,
            info: GraphQLResolveInfo
          ) => string | Promise<string>;
        };

    email:
      | ((
          parent: User,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo
        ) => string | Promise<string>)
      | {
          fragment: string;
          resolve: (
            parent: User,
            args: {},
            ctx: Context,
            info: GraphQLResolveInfo
          ) => string | Promise<string>;
        };

    posts:
      | ((
          parent: User,
          args: {},
          ctx: Context,
          info: GraphQLResolveInfo
        ) => Array<Post | null> | null | Promise<Array<Post | null> | null>)
      | {
          fragment: string;
          resolve: (
            parent: User,
            args: {},
            ctx: Context,
            info: GraphQLResolveInfo
          ) => Array<Post | null> | null | Promise<Array<Post | null> | null>;
        };
  }
}

export namespace MutationResolvers {
  export const defaultResolvers = {};

  export interface PostInput {
    title: string;
  }

  export interface ArgsWrite {
    post: PostInput;
  }

  export interface ArgsUpvote {
    id: string;
  }

  export interface ArgsLogin {
    email: string;
    password: string;
  }

  export interface ArgsSignup {
    name: string;
    email: string;
    password: string;
  }

  export type WriteResolver =
    | ((
        parent: undefined,
        args: ArgsWrite,
        ctx: Context,
        info: GraphQLResolveInfo
      ) => Post | null | Promise<Post | null>)
    | {
        fragment: string;
        resolve: (
          parent: undefined,
          args: ArgsWrite,
          ctx: Context,
          info: GraphQLResolveInfo
        ) => Post | null | Promise<Post | null>;
      };

  export type UpvoteResolver =
    | ((
        parent: undefined,
        args: ArgsUpvote,
        ctx: Context,
        info: GraphQLResolveInfo
      ) => Post | null | Promise<Post | null>)
    | {
        fragment: string;
        resolve: (
          parent: undefined,
          args: ArgsUpvote,
          ctx: Context,
          info: GraphQLResolveInfo
        ) => Post | null | Promise<Post | null>;
      };

  export type LoginResolver =
    | ((
        parent: undefined,
        args: ArgsLogin,
        ctx: Context,
        info: GraphQLResolveInfo
      ) => string | null | Promise<string | null>)
    | {
        fragment: string;
        resolve: (
          parent: undefined,
          args: ArgsLogin,
          ctx: Context,
          info: GraphQLResolveInfo
        ) => string | null | Promise<string | null>;
      };

  export type SignupResolver =
    | ((
        parent: undefined,
        args: ArgsSignup,
        ctx: Context,
        info: GraphQLResolveInfo
      ) => string | null | Promise<string | null>)
    | {
        fragment: string;
        resolve: (
          parent: undefined,
          args: ArgsSignup,
          ctx: Context,
          info: GraphQLResolveInfo
        ) => string | null | Promise<string | null>;
      };

  export interface Type {
    write:
      | ((
          parent: undefined,
          args: ArgsWrite,
          ctx: Context,
          info: GraphQLResolveInfo
        ) => Post | null | Promise<Post | null>)
      | {
          fragment: string;
          resolve: (
            parent: undefined,
            args: ArgsWrite,
            ctx: Context,
            info: GraphQLResolveInfo
          ) => Post | null | Promise<Post | null>;
        };

    upvote:
      | ((
          parent: undefined,
          args: ArgsUpvote,
          ctx: Context,
          info: GraphQLResolveInfo
        ) => Post | null | Promise<Post | null>)
      | {
          fragment: string;
          resolve: (
            parent: undefined,
            args: ArgsUpvote,
            ctx: Context,
            info: GraphQLResolveInfo
          ) => Post | null | Promise<Post | null>;
        };

    login:
      | ((
          parent: undefined,
          args: ArgsLogin,
          ctx: Context,
          info: GraphQLResolveInfo
        ) => string | null | Promise<string | null>)
      | {
          fragment: string;
          resolve: (
            parent: undefined,
            args: ArgsLogin,
            ctx: Context,
            info: GraphQLResolveInfo
          ) => string | null | Promise<string | null>;
        };

    signup:
      | ((
          parent: undefined,
          args: ArgsSignup,
          ctx: Context,
          info: GraphQLResolveInfo
        ) => string | null | Promise<string | null>)
      | {
          fragment: string;
          resolve: (
            parent: undefined,
            args: ArgsSignup,
            ctx: Context,
            info: GraphQLResolveInfo
          ) => string | null | Promise<string | null>;
        };
  }
}

export interface Resolvers {
  Query: QueryResolvers.Type;
  Post: PostResolvers.Type;
  User: UserResolvers.Type;
  Mutation: MutationResolvers.Type;
}

// @ts-ignore
declare module "graphql-tools" {
  interface IResolvers extends Resolvers {}
}