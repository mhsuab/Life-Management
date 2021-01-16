const Block = require('./../../model/Block');
const checkAuth = require('./../../utils/check_auth')

//NOTE: only finish putting function that is needed
module.exports = {
    Query: {
        getOneDay: async (_, { date }, context) => {
            //TODO: maybe not user, userID should be better
            const user = checkAuth(context);
            const blocks = await Block.find({ "$or": [{"userID": user}, {"Day": date}] })
            return posts;
        },
        getCalendar: async (_, { date }, context) => {}
    },
    Mutation: {
        addBlock: async (_, { block }, context) => {},
        deleteBlock: async (_, { blockID }, context) => {},
        updateBlock: async (_, { blockID, block }, context) => {}
    },
    Subscription: {},
}