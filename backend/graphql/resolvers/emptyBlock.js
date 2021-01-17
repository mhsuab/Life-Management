const EmptyBlock = require('./../../model/EmptyBlock');
const checkAuth = require('./../../utils/check_auth')

//NOTE: only finish putting function that is needed
module.exports = {
    Query: {
        getEmptyBlock: async (_, __, { request }) => {
            // NOTE: return all empty blocks of current user
            const { userID } = checkAuth(request);
            const emptyBlocks = await EmptyBlock.find({ userID })
                .catch(err => {
                    throw new Error(err);
                });
            if (!emptyBlocks) throw new Error("Unable to find empty block for current user");
            return emptyBlocks;
        }
    },
    Mutation: {
        addEmptyBlock: async (_, { emptyBlockInput }, { request }) => {
            // NOTE: return the added empty block
            const { userID } = checkAuth(request);
            const newEmptyBlock = await EmptyBlock.create({
                ...emptyBlockInput,
                userID
            }).catch(err => {
                throw new Error(err);
            });
            return newEmptyBlock;
        },
        deleteEmptyBlock: async (_, { emptyBlockID }, { request }) => {
            // NOTE: return the deleted Todo
            const { userID } = checkAuth(request);
            const delEmptyBlock = await EmptyBlock.findOneAndDelete({
                $and: [{ userID }, { "_id": emptyBlockID }]
            }).catch(err => {
                throw new Error(err);
            });
            if (!delEmptyBlock) throw new Error("Unable to find target empty block to delete.")
            return delEmptyBlock;
        },
        updateEmptyBlock: async (_, { emptyBlockID, emptyBlockInput }, { request }) => {
            // NOTE: return the updated Empty Block
            const { userID } = checkAuth(request);
            const updateEmptyBlock = await EmptyBlock.findOneAndUpdate(
                {
                    $and: [{ userID }, { "_id": emptyBlockID }]
                },
                { ...emptyBlockInput },
                {
                    new: true,
                    useFindAndModify: false
                }
            ).catch(err => {
                throw new Error(err);
            });
            if (!updateEmptyBlock) throw new Error('Unable to find empty block');
            return updateEmptyBlock;
        }
    }
}