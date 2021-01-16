const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const atob = require('atob');
require('dotenv-defaults').config();

const User = require('./../../model/User');
const checkAuth = require('./../../utils/check_auth');

const generateToken = ({ id }) => {
    return jwt.sign(
        { id: id },
        atob(process.env.JWT_SECRET),
        {
            algorithm: 'RS256',
            expiresIn: '8h'
        }
    );
}

module.exports = {
    Query: {
        login: async (_, { username, password }) => {
            if (!username || !password) throw new Error('Missing field!');
            const user = await User.findOne({ "username": username })
                .catch(err => {
                    throw new Error(err);
                });
            if (!user) throw new Error('Username not existed');

            const validatePWD = bcrypt.compare(password, user.pwdHash)
                .catch(err => {
                    throw new Error(err);
                });
            if ( !validatePWD ) throw new Error('Password not correct!');
            return {
                ...user._doc,
                id: user._id,
                token: generateToken(user._id)
            }
        },
    },
    Mutation: {
        register: async (
            _,
            { registerInput: {
                username,
                password,
                confirmPassword,
                todoExpiresDay,
                calendarExpiresDay,
                notificationTime
            } }
        ) => {
            // check input validation
            if (!username || !password || !confirmPassword || !todoExpiresDay || !todoExpiresDay || !calendarExpiresDay || !notificationTime) throw new Error('Missing field!')
            if (password !== confirmPassword) throw new Error("Passwords didn't match.")
            // check user existence
            if (
                await User.exists({ "username": username })
                    .catch(err => {
                        throw new Error(err);
                    })
            ) throw new Error("Username taken.")

            // hash password
            const pwdHash = await bcrypt.hash(password, 12)
                .catch(err => {
                    throw new Error(err);
                });

            const user = new User({
                username,
                pwdHash,
                todoExpiresDay,
                calendarExpiresDay,
                notificationTime
            });
            const res = await user.save()
                .catch(err => {
                    throw new Error(err);
                });

            return {
                ...res._doc,
                id: res._id,
                token: generateToken(res._id)
            }
        }
    }
};