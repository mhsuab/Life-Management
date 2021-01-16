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
        rmUserDB: async (_, __, context) => {}
    },
    Subscription: {
        updateCalendar: {
            subscribe(_, __, { pubsub }) {
                return pubsub.asyncIterator('calendar');
            }
        }
    }
}