require('dotenv-defaults').config();

// resolvers
const blockResolver = require('./resolvers/block');
const emptyBlockResolver = require('./resolvers/emptyBlock');
const noteResolver = require('./resolvers/note');
const todoResolver = require('./resolvers/todo');
const userResolver = require('./resolvers/user');

// models
const Block = require('./../model/Block');
const EmptyBlock = require('./../model/EmptyBlock');
const Note = require('./../model/Note');
const Todo = require('./../model/Todo');
const User = require('./../model/User');

module.exports = {
    Query: {
        ...blockResolver.Query,
        ...emptyBlockResolver.Query,
        ...noteResolver.Query,
        ...todoResolver.Query,
        ...userResolver.Query
    },
    Mutation: {
        ...blockResolver.Mutation,
        ...emptyBlockResolver.Mutation,
        ...noteResolver.Mutation,
        ...todoResolver.Mutation,
        ...userResolver.Mutation,
        rmUserDB: async () => {
            // NOTE: only for me to clear the whole DB
            if (process.env.IS_DEVELOP === 'true') {
                await Block.deleteMany({}, (err, _) => {
                    if (err) throw new Error('Unable to delete Block');
                })
                await EmptyBlock.deleteMany({}, (err, _) => {
                    if (err) throw new Error('Unable to delete Empty Block');
                })
                await Note.deleteMany({}, (err, _) => {
                    if (err) throw new Error('Unable to delete Note');
                })
                await Todo.deleteMany({}, (err, _) => {
                    if (err) throw new Error('Unable to delete Todo');
                })
                await User.deleteMany({}, (err, _) => {
                    if (err) throw new Error('Unable to delete User');
                })
                return "Remove ALL success";
            }
            return "Noooooo, you shouldn't be using this";
        }
    },
    Subscription: {
        updateCalendar: {
            subscribe(_, __, { pubsub }) {
                return pubsub.asyncIterator('calendar');
            }
        }
    }
}