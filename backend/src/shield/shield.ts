import { rule, shield, and, or, not, allow } from 'graphql-shield'

const isAuthenticated = rule({cache: "contextual"})(
    async (parent, args, ctx, info) => {
        console.log('Test authorization');
        console.log(ctx.userId);
        return ctx.userId !== null;
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


