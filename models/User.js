const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../config/env');


const userSchema = new mongoose.Schema({
    usernme: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        //required: true,
    }
});

userSchema.pre('save', function (next) {
    bcrypt.hashSync(this.password, SALT_ROUNDS)
        .then(hashedPassword => {
            this.password = hashedPassword;
            next();
        });
});

const User = mongoose.model('User', userSchema);
module.exports = User;