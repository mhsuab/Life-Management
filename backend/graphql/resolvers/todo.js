const Todo = require('./../../model/Todo');
const checkAuth = require('./../../utils/check_auth');

//NOTE: only finish putting function that is needed
module.exports = {
    Query: {
        getTodo: async (_, __, { request }) => {
            // NOTE: return all todos of current user
            const { userID } = checkAuth(request);
            const todos = await Todo.find({ userID })
                .catch(err => {
                    throw new Error(err);
                });
            return todos;
        }
    },
    Mutation: {
        addTodo: async (_, { todo }, { request }) => {
            // NOTE: return the added Todo
            const { userID, todoExpiresDay } = checkAuth(request);
            const newTodo = await Todo.create({
                ...todo,
                userID,
                expiredAfter: todoExpiresDay
            }).catch(err => {
                throw new Error(err);
            });
            return newTodo;
        },
        deleteTodo: async (_, { todoID }, { request }) => {
            // NOTE: return the deleted Todo
            const { userID } = checkAuth(request);
            const delTodo = await Todo.findOneAndDelete({
                $and: [{ userID }, { "_id": todoID }]
            }).catch(err => {
                throw new Error(err);
            });
            if (!delTodo) throw new Error("Unable to find target todo to delete.")
            return delTodo;
        },
        updateTodo: async (_, { todoID, todo }, { request }) => {
            // NOTE: return the updated Todo
            const { userID } = checkAuth(request);
            if ( todo.category === 'Completed' ) {
                const date = new Date();
                todo = {
                    ...todo,
                    completedDay: date.toLocaleDateString('zh-TW', {timeZone: 'Asia/Taipei'})
                }
            } else {
                todo = {
                    ...todo,
                    completedDay: null
                }
            }
            const updateTodo = await Todo.findOneAndUpdate(
                {
                    $and: [{ userID }, { "_id": todoID }]
                },
                { ...todo },
                {
                    new: true,
                    useFindAndModify: false
                }
            ).catch(err => {
                throw new Error(err);
            });
            if (!updateTodo) throw new Error('Unable to find todo');
            return updateTodo;
        }
    }
}