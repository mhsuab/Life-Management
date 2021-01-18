const EmptyBlock = require('../../model/EmptyBlock');
const Block = require('./../../model/Block');
const checkAuth = require('./../../utils/check_auth');

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
                $and: [{ userID }, { "Day": date }, { "onCalendar": true }]
            }).catch(err => {
                throw new Error(err);
            })
            return ifExist;
        }
    },
    Mutation: {
        addBlock: async (_, { block }, { request, pubsub }) => {
            const { userID, calendarExpiresDay, blockExpiresDay } = checkAuth(request);
            const addBlock = await Block.create({
                userID,
                ...block,
                expiredAfter: calendarExpiresDay,
                blockExpiresDay
            }).catch(err => {
                throw new Error(err);
            })
            if (addBlock.onCalendar) {
                await (pubsub.publish('calendar', {
                    updateCalendar: {
                        type: 'ADDED',
                        info: {
                            "Day": addBlock.Day,
                            "ifExist": await Block.exists({
                                $and: [{ userID }, { "Day": addBlock.Day }, { "onCalendar": true }]
                            })
                        }
                    }
                }))
            }

            return addBlock;
        },
        deleteBlock: async (_, { blockID }, { request, pubsub }) => {
            const { userID } = checkAuth(request);
            const delBlock = await Block.findOneAndDelete({
                $and: [{ userID }, { "_id": blockID }]
            }).catch(err => {
                throw new Error(err);
            });
            if (!delBlock) throw new Error("Unable to find target block to delete.");

            if (delBlock.onCalendar) {
                await (pubsub.publish('calendar', {
                    updateCalendar: {
                        type: 'DELETED',
                        info: {
                            "Day": delBlock.Day,
                            "ifExist": await Block.exists({
                                $and: [{ userID }, { "Day": delBlock.Day }, { "onCalendar": true }]
                            })
                        }
                    }
                }))
            }

            return delBlock;
        },
        updateBlock: async (_, { blockID, block }, { request, pubsub }) => {
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

            await (pubsub.publish('calendar', {
                updateCalendar: {
                    type: 'UPDATED',
                    info: {
                        "Day": upBlock.Day,
                        "ifExist": await Block.exists({
                            $and: [{ userID }, { "Day": upBlock.Day }, { "onCalendar": true }]
                        })
                    }
                }
            }))

            return upBlock;
        }
    },
    Subscription: {},
}