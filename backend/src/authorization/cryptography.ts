import { createHash } from 'crypto';

const generateSHA256Hash = (password: string): string => {
    return createHash('sha256')
        .update(password)
        .digest('hex');
};


const generateSHA512Hash = (password: string): string => {
    return createHash('sha512')
        .update(password)
        .digest('hex');
};

const generateMD5Hash = (password: string): string => {
    return createHash('md5')
        .update(password)
        .digest('hex');
};

export {
    generateSHA256Hash,
    generateSHA512Hash,
    generateMD5Hash
}