import { AuthenticationError } from 'apollo-server';
import { TOKEN_SECRET } from '../config/env.config';
import * as jwt from 'jsonwebtoken';

export const verifyToken = (authorization: string) => {
    if (authorization) {
        const token = authorization.replace('Bearer ', '');
        try {
            const {userId} = jwt.verify(token, TOKEN_SECRET);
            return userId;
        } catch (err) {
            throw new AuthenticationError('Failed to verify token');
        }
    }
};

export const createToken = (userId: string) => {
    return jwt.sign({userId}, TOKEN_SECRET);
}
