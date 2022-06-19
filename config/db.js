const mongoose = require('mongoose');

const { MONGODB_URI } = require('./env');

exports.dbInit = () => {
    mongoose.connection.on('open', () => console.log('Connected to MongoDB'));

    return mongoose.connect(MONGODB_URI);
}