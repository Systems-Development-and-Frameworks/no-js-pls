import { MutationResolvers, QueryResolvers, Resolvers } from "../generated/graphqlgen";
import { PostMutationResolver, PostQueryResolver } from "./post.resolver";
import { UserQueryResolver } from "./user.resolver";
import { NestedFields } from "./nested/nestedFields";

const Query: QueryResolvers.Type = {
    ...PostQueryResolver,
    ...UserQueryResolver
};

const Mutation: MutationResolvers.Type = {
    ...PostMutationResolver
};

export const resolvers: Resolvers = {
    Query,
    Mutation,
    ...NestedFields
};
