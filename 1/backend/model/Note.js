const { model, Schema } = require('mongoose');

const noteSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Note must belong to a user.']
    },
    message: {
        type: String,
    }
});

module.exports = model('note', noteSchema);
