const router = require('express').Router();
const authService = require('../services/authService');
const { COOKIE_SESSION } = require('../constants');
const { isAuth, isGuest } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorMapper');

router.get('/login', isGuest, (req, res) => {
    res.render('auth/login');
});

router.post('/login', isGuest, async (req, res) => {
    const { username, password } = req.body;

    if (username === '' && password === '') {
        res.render('auth/login', { error: 'Username and password are required' });
        return;
    }

    const user = await authService.login(username, password);
    const token = await authService.createToken(user);

    res.cookie(COOKIE_SESSION, token, { httpOnly: true });
    res.redirect('/')
});

router.get('/register', isGuest, (req, res) => {
    res.render('auth/register');
});

router.post('/register', isGuest, async (req, res) => {
    const { username, password, rePassword, address } = req.body;

    if (password !== rePassword) {
        res.render('auth/register', {
            error: 'Passwords do not match',
        });
        return;
    }
    // TODO: register user
    try {
        const createdUser = await authService.create({
            username,
            password,
            address
        });

        const token = await authService.createToken(createdUser);

        res.cookie(COOKIE_SESSION, token, { httpOnly: true })
        res.redirect('/');
    } catch (error) {
        //TODO: handle mongoose error
        return res.render('auth/register', {
            error: getErrorMessage(error),
        });
    }
});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(COOKIE_SESSION)
    res.redirect('/');
});

module.exports = router;
