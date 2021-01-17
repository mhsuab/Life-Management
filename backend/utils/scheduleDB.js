// model
const Block = require('./../model/Block');
const Todo = require('./../model/Todo');

module.exports = async () => {
    const blocks = await Block.find()
        .sort({ Day: 1 })
        .catch(err => {
            throw new Error(err);
        });
    const todos = await Todo.find({ completedDay: { $ne: null }})
        .sort({ completedDay: 1 })
        .catch(err => {
            throw new Error(err);
        });
    const today = new Date();
    // console.log(today.toLocaleDateString('zh-TW', {timeZone: 'Asia/Taipei'}));
    const blocks2rm = blocks.filter(block => {
        const blockDate = new Date(block.Day);
        if (block.onCalendar) {
            console.log(block);
        } else {
            console.log(block);
        }
        return true;
    });
    // console.log(blocks2rm);
    const todos2rm = todos.filter(todo => {
        const todoDate = new Date(todo.completedDay);
        // console.log(todoDate.toLocaleDateString('zh-TW', {timeZone: 'Asia/Taipei'}));
        todoDate.setDate(todoDate.getDate() + todo.expiredAfter);
        if (today > todoDate) return true;
        return false;
    });
    // console.log(todos2rm);
}