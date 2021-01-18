const { model, Schema } = require('mongoose');

const emptyBlockSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Block must belong to a user.']
    },
    subject: {
        type: String,
        required: [true, 'Empty Block must belong to a subject.']
    },
    color: {
        type: String,
        required: [true, 'Empty Block must give its color.']
    }
});

module.exports = model('empty_block', emptyBlockSchema);