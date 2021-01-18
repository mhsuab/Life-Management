// model
const todo = require('../graphql/resolvers/todo');
const Block = require('./../model/Block');
const Todo = require('./../model/Todo');

module.exports = async () => {
    const blocks = await Block.find()
        .sort({ Day: 1 })
        .catch(err => {
            throw new Error(err);
        });
    const todos = await Todo.find({ category: "Completed" })
        .sort({ completedDay: 1 })
        .catch(err => {
            throw new Error(err);
        });
    const today = new Date();
    const blocks2rm = blocks.reduce((accumulator, block) => {
        const blockDate = new Date(block.Day);
        if (blockDate > today) return accumulator;
        if (block.onCalendar) {
            // NOTE: delete depends on calendar
            console.log(block);
            blockDate.setDate(blockDate.getDate() + block.expiredAfter);
        } else {
            // NOTE: delete depends on day
            console.log(block);
            blockDate.setDate(blockDate.getDate() + block.blockExpiresDay);
        }
        if (today > blockDate) return [...accumulator, block._id];
        return accumulator;
    }, []);
    await Block.deleteMany({ "_id": { $in: blocks2rm } })
        .catch(err => {
            throw new Error(err);
        });

    const todos2rm = todos.reduce((accumulator, todo) => {
        const todoDate = new Date(todo.completedDay);
        todoDate.setDate(todoDate.getDate() + todo.expiredAfter);
        if (today > todoDate) return [...accumulator, todo._id];
        return accumulator;
    }, []);
    await Todo.deleteMany({ "_id": { $in: todos2rm } })
        .catch(err => {
            throw new Error(err);
        });
}