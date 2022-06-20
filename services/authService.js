const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');


exports.create = (userData) => User.create(userData);

exports.login = async (username, password) => {
    const user = await User.findOne({ username });

    if (!user) {
        throw new Error('User or password not found');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('User or password not found');
    }
    return user;
}

exports.createToken = (user) => {
    const payload = {
        username: user.username,
        address: user.address,
        id: user._id,
    }
    const options = { expiresIn: '3h' }

    const tokenPromise = new Promise((resolve, reject) => {

        jwt.sign(payload, JWT_SECRET, options, (err, decodedToken) => {

            if (err) {
                return reject(err);
            }
            resolve(decodedToken)
        });

    })
    return tokenPromise;
}