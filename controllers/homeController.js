const router = require('express').Router();
const publicationService = require('../services/publicationService');
const userService = require('../services/userService');

router.get('/', async (req, res) => {
    const publicationsResult = await publicationService.getAllPublications().lean();
    const publications = publicationsResult.map(x => ({ ...x, sharedCount: x.sharedWith.length }));

    res.render('home', { publications });
});


router.get('/profile', async (req, res) => {
    userService.getOne(req.user._id).lean();
    res.render('home/profile', {...req.user});
});

module.exports = router;