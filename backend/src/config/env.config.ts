import * as env from 'env-var';

const TOKEN_SECRET = env.get('TOKEN_SECRET').asString();

export {
    TOKEN_SECRET
};
