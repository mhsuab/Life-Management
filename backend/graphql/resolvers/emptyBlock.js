const EmptyBlock = require('./../../model/EmptyBlock');
const checkAuth = require('./../../utils/check_auth')

//NOTE: only finish putting function that is needed
module.exports = {
    Query: {
        getEmptyBlock: async (_, __, context) => {}
    },
    Mutation: {
        addEmptyBlock: async (_, { emptyBlockInput }, context) => {},
        deleteEmptyBlock: async (_, { emptyBlockID }, context) => {},
        updateTodo: async (_, { emptyBlockID, emptyBlockInput }, context) => {}
    }
}