const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');


exports.create = (userData) => User.create(userData);

exports.login = async (username, password) => {
    const user = await User.findOne({ username });

    if (!user) {
        throw { status: 404, message: 'User not found' };
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw { status: 401, message: 'Invalid password' };
    }
    return user;
}

exports.createToken = (user) => {
    const payload = {
        _id: user._id,
        username: user.username,
        address: user.address,
    }
    const options = { expiresIn: '3d' }

    const tokenPromise = new Promise((resolve, reject) => {

        jwt.sign(payload, JWT_SECRET, options, (err, decodedToken) => {

            if (err) {
                return reject(err);
            }
            resolve(decodedToken)
        });

    });
    return tokenPromise;    
}