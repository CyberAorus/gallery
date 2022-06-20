const User = require('../models/user');


exports.create = (userData) => User.create(userData); 