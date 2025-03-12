import jwt from 'jsonwebtoken';
const fs = require('fs');

const privateKeyPath = 'C:/Users/wanne/Documents/SCHOOL/fase 2/semester 1/full stack/full-stack-2324-group108/back-end/keys/rsa.key';
const publicKeyPath = 'C:/Users/wanne/Documents/SCHOOL/fase 2/semester 1/full stack/full-stack-2324-group108/back-end/keys/rsa.key.pub';

const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
const publicKey = fs.readFileSync(publicKeyPath, 'utf8');


/**
 * Helpers function to sign a JWT token to prevent double code
 * 
 * @param payload 
 * @param expiresIn 
 * @returns 
 */
const signJwtToken = (payload: object, expiresIn: string): string => {
    try {
        return jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn });
    } catch (err) {
        console.error(err);
        throw new Error('Error generating JWT token, see server logs for more details');
    }
};

/**
 * Helper function to verify a JWT token 
 * 
 * @param token 
 * @returns 
 */
const verifyJwtToken = (token: string): any => {
    try {
        return jwt.verify(token, publicKey, { algorithms: ['RS256'] });
    } catch (err) {
        console.error(err);
        throw new Error('Error verifying JWT token, see server logs for more details');
    }
};


const signToken = ({ name, admin }): string => {
    return signJwtToken({ name, admin }, '1h'); 
};

const signRefreshToken = ({ name, admin }): string => {
    return signJwtToken({ name, admin }, '7d');
};

const verifyToken = (token: string): any => {
    return verifyJwtToken(token);
};

const verifyRefreshToken = (token: string): any => {
    return verifyJwtToken(token);
};

export { 
    signToken,
    signRefreshToken,
    verifyToken,
    verifyRefreshToken
};
