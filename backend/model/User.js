const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username Required']
    },
    pwdHash: {
        type: String,
        required: [true, 'pwdHash Required']
    },
    todoExpiresDay: {
        type: Number,
        required: [true, 'todoExpiresDay Required']
    },
    calendarExpiresDay: {
        type: Number,
        required: [true, 'calendarExpiresDay Required']
    },
    blockExpiresDay: {
        type: Number,
        required: [true, 'blockExpiresDay required']
    },
    notificationTime: {
        type: Number,
        min: 0,
        max: 23,
        required: [true, 'notificationTime Required']
    },
});

module.exports = model('user', userSchema);