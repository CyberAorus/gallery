const { COOKIE_SESSION } = require('../constants');
const { JWT_SECRET } = require('../config/env');
const jwt = require('jsonwebtoken');


exports.auth = (req, res, next) => {
    const token = req.cookies[COOKIE_SESSION];

    if (token) {

        jwt.verify(token, JWT_SECRET, ((err, decodedToken) => {
            if (err) {
                res.clearCookie(COOKIE_SESSION);
                res.redirect('/auth/login');
            }
            req.user = decodedToken;
            res.locals.user = decodedToken;
            next();
        }));

    } else {
        next();
    }
};


exports.isAuth = (req, res, next) => {

    if (!req.user) {
        return res.redirect('/auth/login');
    }
    next();
}

exports.isGuest = (req, res, next) => {

    if (req.user) {
        return res.redirect('/');
    }
    next();
}

