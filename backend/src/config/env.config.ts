import * as env from 'env-var';

const TOKEN_SECRET = env.get('TOKEN_SECRET').asString();
const NEO4J_URI = env.get('NEO4J_URI').asString();
const NEO4J_USER = env.get('NEO4J_USER').asString();
const NEO4J_PASSWORD = env.get('NEO4J_PASSWORD').asString();
const NEO4J_DATABASE = env.get('NEO4J_DATABASE').asString();


export {
    TOKEN_SECRET,
    NEO4J_URI,
    NEO4J_USER,
    NEO4J_DATABASE,
    NEO4J_PASSWORD
};
