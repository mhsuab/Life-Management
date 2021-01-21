const EmptyBlock = require('../../model/EmptyBlock');
const Block = require('./../../model/Block');
const checkAuth = require('./../../utils/check_auth');
import moment from "moment";

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
        },
        getWeek: async (_, { date }, { request }) => {
            const { userID } = checkAuth(request);
            const week = [0, 1, 2, 3, 4, 5, 6].map(day => {
                return moment(new Date(date)).add(day, 'days').format("YYYY/MM/DD");
            })
            const blocks = await Block.find({
                $and: [{ userID }, { onCalendar: true }, {
                    "Day": { $in: week }
                }]
            }).sort({ 'Day': 1 })
                .catch(err => {
                    throw new Error(err);
                })
            return blocks;
        },
        getMonth: async (_, { month }, { request }) => {
            const { userID } = checkAuth(request);
            //console.log('asdf')
            const blocks = await Block.find({
                $and: [{ userID }, {
                    "Day": { '$regex': month, '$options': 'i'}
                }, { "onCalendar": true }]
            }).sort({ 'Day': 1 })
                .catch(err => {
                    throw new Error(err);
                })
            //console.log('getMonth')
            //console.log([...Array(new Date(month.slice(0, 4), month.slice(-2), 0).getDate()).keys()])
            const target = moment(new Date(month)).format("YYYY/MM/DD");
            return [...Array(new Date(month.slice(0, 4), month.slice(-2), 0).getDate()).keys()].map(day => {
                return blocks.some(block => block.Day === moment(target).add(day, 'days').format("YYYY/MM/DD"));
            })
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
                console.log('addblock');
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
            console.log(block)
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