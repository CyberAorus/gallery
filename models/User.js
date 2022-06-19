const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    usernme: {
        type: String,
    },
    password: {
        type: String,
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;