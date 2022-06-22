const router = require('express').Router();
const authService = require('../services/authService');
const { COOKIE_SESSION } = require('../constants');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await authService.login(username, password);
    const token = await authService.createToken(user);

    res.cookie(COOKIE_SESSION, token, { httpOnly: true });
    res.redirect('/')
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
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
        console.log(error.message);
        res.render('auth/register', {
            error: error.message,
        });
        return;
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie(COOKIE_SESSION)
    res.redirect('/');
});

module.exports = router;
