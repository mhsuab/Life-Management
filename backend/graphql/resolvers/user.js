const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv-defaults').config();

const User = require('./../../model/User');
const { validateRegisterInput, validateLoginInput } = require('./../../utils/validate');

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id
        },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
    );
}

module.exports = {
    Query: {
        getUser: async (_, __, context) => {},
    },
    Mutation: {
        login: async (_, { username, password }) => {},
        register: async (
            _,
            { registerInput }
        ) => {}
    }
};