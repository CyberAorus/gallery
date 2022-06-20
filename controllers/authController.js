const router = require('express').Router();
const authService = require('../services/authService');

router.get('/login', (req, res) => {
    res.render('auth/login');
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
        await authService.create({
            username,
            password,
            address
        });
        
        res.redirect('/login');
    } catch (error) {
        //TODO: handle mongoose error
        res.render('auth/register', {
            error: 'db error',
        });
        return;
    }
});

module.exports = router;
