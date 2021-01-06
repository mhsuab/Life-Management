const { model, Schema } = require('mongoose');

const blockSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Block must belong to a user.']
    },
    name: {
        type: String,
        required: [true, 'Block must have its name.']
    },
    subject: {
        type: String,
        required: [true, 'Block must belong to a subject.']
    },
    color: {
        type: String,
        required: [true, 'Block must give its color.']
    },
    onCanlendar: {
        type: Boolean,
        required: [true, 'Block must set whether it should be on the calendar.']
    },
    startTime: {
        type: Number,
        min: 0,
        max: 23,
        required: [true, 'Block should have a start time.']
    },
    endTime: {
        type: Number,
        min: 0,
        max: 23,
        required: [true, 'Block must have an end time.']
    },
    Day: {
        type: String,
        required: [true, 'Block must belong to a certain day.']
    },
    isReview: {
        type: Boolean,
        required: [true, 'Block must set whether it should be review.']
    },
    repeated: {
        type: Number,
        required: [true, 'Block should set whether it should be repeat']
    },
    expiredAfter: {
        type: Number,
        required: [true, 'Todo must have a expired day.']
    },
});

module.exports = model('block', blockSchema);