const { model, Schema } = require('mongoose');

const todoSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Todo must belong to a user.']
    },
    name: {
        type: String,
        required: [true, 'Todo must have a title.']
    },
    category: {
        type: String,
        enum: ['Todo', 'Doing', 'Completed'],
        requeired: [true, 'Todo must have a category, Todo, Doing, or Completed.']
    },
    expiredAfter: {
        type: Number,
        required: [true, 'Todo must have a expired day.']
    },
    subject: {
        type: String,
        required: [true, 'Todo must belong to a subject.']
    },
    color: {
        type: String,
        required: [true, 'Todo must give its color.']
    },
    completedDay: {
        type: String
    }
});

module.exports = model('todo', todoSchema);