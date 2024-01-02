import jwt from 'jsonwebtoken';

const generateJwtToken = ({ name, admin }): string => {
    const options = {
        issuer: 'web manager',
        expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`
    };

    try{
        return jwt.sign({ name, admin }, process.env.JWT_SECRET, options);
    } catch (err) {
        console.error(err);
        throw new Error('Error generating JWT token, see server logs for more details');
    }

}

export { generateJwtToken };