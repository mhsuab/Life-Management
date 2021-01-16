const jwt = require('jsonwebtoken');
require('dotenv-defaults').config();

module.exports = (context) => {
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split('Bearer ')[1]
        if (token) {
            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) throw new Error('Invalid/Expired token');
                return decoded;
            })
        }
        throw new Error('Authentication token must be \'Bearer [token]');
    }
    throw new Error('authorization header must be provided');
}