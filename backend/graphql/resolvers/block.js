const EmptyBlock = require('../../model/EmptyBlock');
const Block = require('./../../model/Block');
const checkAuth = require('./../../utils/check_auth')

//NOTE: only finish putting function that is needed
module.exports = {
    Query: {
        getOneDay: async (_, { date }, { request }) => {
            // NOTE: return all the blocks for given date
            const { userID } = checkAuth(request);
            const blocks = await Block.find({ $and: [{ userID }, { "Day": date }] })
            return blocks;
        },
        getCalendar: async (_, { date }, { request }) => {
            // NOTE: return true if the `date` has blocks
            const { userID } = checkAuth(request);
            const ifExist = await Block.exists({
                $and: [{ userID }, { "Day": date }]
            }).catch(err => {
                throw new Error(err);
            })
            return ifExist;
        }
    },
    Mutation: {
        addBlock: async (_, { block }, { request }) => {
            const { userID, calendarExpiresDay } = checkAuth(request);
            const addBlock = await Block.create({
                userID,
                ...block,
                expiredAfter: calendarExpiresDay
            }).catch(err => {
                throw new Error(err);
            })
            return addBlock;
        },
        deleteBlock: async (_, { blockID }, { request }) => {
            const { userID } = checkAuth(request);
            const delBlock = await Block.findOneAndDelete({
                $and: [{ userID }, { "_id": blockID }]
            }).catch(err => {
                throw new Error(err);
            });
            if (!delBlock) throw new Error("Unable to find target block to delete.");
            return delBlock;
        },
        updateBlock: async (_, { blockID, block }, { request }) => {
            const { userID } = checkAuth(request);
            const upBlock = await Block.findOneAndUpdate(
                {
                    $and: [{ userID }, { "_id": blockID }]
                }, {
                    ...block
                },
                {
                    new: true,
                    useFindAndModify: false
                }
            ).catch(err => {
                throw new Error(err);
            });
            if (!upBlock) throw new Error('Unablt to find block');
            return upBlock;
        }
    },
    Subscription: {},
}