const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username Required']
    },
    pwdHash: {
        type: String,
        required: [true, 'Username Required']
    },
    todoExpiresDay: {
        type: Number,
        required: [true, 'Username Required']
    },
    calendarExpiresDay: {
        type: Number,
        required: [true, 'Username Required']
    },
    notificationTime: {
        type: Number,
        min: 0,
        max: 23,
        required: [true, 'Username Required']
    },
});

module.exports = model('user', userSchema);