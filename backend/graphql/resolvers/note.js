const Note = require('./../../model/Note');
const checkAuth = require('./../../utils/check_auth')

//NOTE: only finish putting function that is needed
module.exports = {
    Query: {
        getNote: async (_, __, { request }) => {
            // NOTE: get note of current user
            const { userID } = checkAuth(request);
            const note = await Note.findOne({ userID })
                .catch(err => {
                    throw new Error(err);
                });
            if (!note) throw new Error('Unable to find note');
            return note.message;
        }
    },
    Mutation: {
        updateNote: async (parent, { msg }, { request }) => {
            // NOTE: return the updated note message
            const { userID } = checkAuth(request);
            const note = await Note.findOneAndUpdate({ userID }, { message: msg }, {
                new: true,
                useFindAndModify: false
            })
                .catch(err => {
                    throw new Error(err);
                });
            if (!note) throw new Error('Unable to find note');
            // console.log(msg)
            return note.message;
        }
    }
}