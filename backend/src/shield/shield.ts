import { rule, shield, and, or, not, allow } from 'graphql-shield'

const isAuthenticated = rule({cache: "contextual"})(
    async (parent, args, ctx, info) => {
        return ctx.userId !== undefined && ctx.dataSources.databaseAPI.getUserPerId(ctx.userId) !== undefined;
    }
)

export const permission = shield({
    Query: {
        posts: allow,
        users: allow
    },
    Mutation: {
        write: isAuthenticated,
        upvote: isAuthenticated,
        login: allow,
        signup: allow
    }
})


