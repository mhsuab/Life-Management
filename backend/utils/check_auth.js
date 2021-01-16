const jwt = require('jsonwebtoken');
require('dotenv-defaults').config();

module.exports = (req) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split('Bearer ')[1]
        if (token) {
            jwt.verify(token, atob(process.env.JWT_CERT), (err, decoded) => {
                if (err) throw new Error('Invalid/Expired token');
                return decoded;
            })
        }
        throw new Error('Authentication token must be \'Bearer [token]');
    }
    throw new Error('authorization header must be provided');
}