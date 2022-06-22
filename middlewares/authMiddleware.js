const { COOKIE_SESSION } = require('../constants');
const { JWT_SECRET } = require('../config/env');
const jwt = require('jsonwebtoken');


exports.auth = (req, res, next) => {
    const token = req.cookies[COOKIE_SESSION];

    if (token) {

        jwt.verify(token, JWT_SECRET, ((err, decoded) => {
            if (err) {
                res.clearCookie(COOKIE_SESSION);
                return next(err);
            }
            req.user = decodedToken;
            res.locals.user = decodedToken;
            next();
        }));

    } else {
        next();
    }
};