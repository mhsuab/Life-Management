const Todo = require('./../../model/Todo');
const checkAuth = require('./../../utils/check_auth')

//NOTE: only finish putting function that is needed
module.exports = {
    Query: {
        getTodo: async (_, __, context) => {}
    },
    Mutation: {
        addTodo: async (_, { todo }, context) => {},
        deleteTodo: async (_, { todoID }, context) => {},
        updateTodo: async (_, { todoID, todo }, context) => {}
    }
}