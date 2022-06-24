const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const publicationService = require('../services/publicationService');
const { getErrorMessage } = require('../utils/errorMapper');
const { preloadPublication, isPublicationAuthor } = require('../middlewares/publicationMiddleware');

router.get('/', async (req, res) => {

    const publications = await publicationService.getAllPublications().lean();
    res.render('publication', { publications });
});

router.get('/:publicationId/details', async (req, res) => {

    const publication = await publicationService.getOneDetailed(req.params.publicationId).lean();
    // const isAuthor = publication.author._id == req.user?._id;

    res.render('publication/details', { ...publication });

});



router.get('/:publicationId/edit', isAuth, preloadPublication, isPublicationAuthor, async (req, res, next) => {

    res.render('publication/edit', { ...req.publication });
});

router.post('/:publicationId/edit', isAuth, preloadPublication, isPublicationAuthor, async (req, res, next) => {

    try {

        await publicationService.update(req.params.publicationId, req.body);

        res.redirect(`/publication/${req.params.publicationId}/details`);
    } catch (error) {
        res.render('publication/edit', { ...req.body, error: getErrorMessage(error) });
    }


});

router.get('/create', isAuth, (req, res) => {

    res.render('publication/create');
});

router.post('/create', async (req, res) => {

    const publicationData = { ...req.body, author: req.user._id };
    try {

        await publicationService.create(publicationData);
        res.redirect('/publications');
    } catch (error) {
        res.render('publication/create', { ...req.body, error: getErrorMessage(error) });
    }
});


module.exports = router;