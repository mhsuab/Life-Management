const jwt = require('jsonwebtoken');
require('dotenv-defaults').config();

module.exports = (request) => {
    const authHeader = request.headers['authorization'];
    if (authHeader) {
        const token = authHeader.split('Bearer ')[1]
        if (token) {
            const {
                id,
                todoExpiresDay,
                calendarExpiresDay,
                notificationTime,
                blockExpiresDay
            } = jwt.verify(token, Buffer.from(process.env.JWT_CERT, 'base64').toString(), (err, decoded) => {
                if (err) throw new Error('Invalid/Expired token');
                return decoded;
            })
            return {
                userID: id,
                todoExpiresDay,
                calendarExpiresDay,
                notificationTime,
                blockExpiresDay
            };
        }
        throw new Error('Authentication token must be \'Bearer [token]\'');
    }
    throw new Error('authorization header must be provided');
}