const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv-defaults').config();

const app = express();
const http = require('http');
const port = process.env.PORT || 4000;

const dboptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    auto_reconnect: true,
    useUnifiedTopology: true,
    poolSize: 10
}
if (!process.env.MONGO_URL) {
    console.error('Missing MONGO_URL!!!')
    process.exit(1)
}

mongoose.connect(process.env.MONGO_URL, dboptions);

db = mongoose.connection;
db.on('error', error => {
    console.error(error);
})
db.once('open', () => {
    console.log('MongoDB connected!');
})

// Routing
app.use(cors());
app.use(bodyParser.json());

http.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
});