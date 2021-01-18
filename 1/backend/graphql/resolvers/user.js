const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv-defaults').config();

const User = require('./../../model/User');
const Note = require('./../../model/Note');
const EmptyBlock = require('./../../model/EmptyBlock');
const checkAuth = require('./../../utils/check_auth');

const generateToken = ({
    id,
    todoExpiresDay,
    calendarExpiresDay,
    notificationTime
}) => {
    return jwt.sign(
        {
            id,
            todoExpiresDay,
            calendarExpiresDay,
            notificationTime
        },
        Buffer.from(process.env.JWT_SECRET, 'base64').toString(),
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
            if (!validatePWD) throw new Error('Password not correct!');
            return {
                ...user._doc,
                id: user._id,
                token: generateToken({
                    id: user._id,
                    ...user._doc
                })
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

            const res = await User.create({
                username,
                pwdHash,
                todoExpiresDay,
                calendarExpiresDay,
                notificationTime
            }).catch(err => {
                throw new Error(err);
            });
            Note.create({
                userID: res._id,
                message: ""
            }, (err, _) => {
                if (err) throw new Error(err);
            });
            EmptyBlock.create({
                userID: res._id,
                subject: "empty",
                color: "grey"
            }, (err, _) => {
                if (err) throw new Error(err);
            });
            return {
                ...res._doc,
                id: res._id,
                token: generateToken({
                    id: res._id,
                    ...res._doc
                })
            }
        }
    }
};