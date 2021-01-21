import { GraphQLServer, PubSub } from 'graphql-yoga';
const mongoose = require("mongoose");
const cron = require('node-cron');
require('dotenv-defaults').config();

const resolvers = require('./graphql/resolver');
const scheduleDB = require('./utils/scheduleDB');

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

const startServer = async () => {
    if (process.env.IS_DEVELOP === 'true') {
        if (!process.env.MONGO_URL_atlas) {
            console.error('Missing MONGO_URL!!!')
            process.exit(1)
        }

        mongoose.connect(process.env.MONGO_URL_atlas, options);
        console.log(`Connect to MONGO_URL: ${process.env.MONGO_URL_atlas}`);
    } else {
        if (!process.env.MONGO_URL) {
            console.error('Missing MONGO_URL!!!')
            process.exit(1)
        }

        mongoose.connect(process.env.MONGO_URL, options);
        console.log(`Connect to MONGO_URL: ${process.env.MONGO_URL}`);
    }

    const pubsub = new PubSub()
    const server = new GraphQLServer({
        typeDefs: './graphql/typeDef.graphql',
        resolvers,
        context: ({ request }) => ({ request, pubsub }),
    });

    const db = mongoose.connection;
    db.on('error', (error) => {
        console.error(error)
    })

    db.once('open', () => {
        console.log('MongoDB connected!')
        // server.start({ port: process.env.PORT | 4000 }, () => {
        server.start({ port: process.env.PORT | 4000, playground: (process.env.NODE_ENV !== 'production') }, () => {
            console.log(`🚀 Server ready at http://localhost:${process.env.PORT | 4000}; MODE: ${process.env.NODE_ENV}`)
        })
    });
};

startServer();
cron.schedule('* 0 * * *', () => {
    scheduleDB();
});