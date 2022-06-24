exports.preloadPublication = async (req, res, next) => {

    const publication = await publicationService.getOne(req.params.publicationId).lean();
    req.publication = publication;
    next();

}

exports.isPublicationAuthor = async (req, res, next) => {
    
    if (publication.author != req.user._id) {
        return next({ status: 401, message: 'You are not authorized to edit this publication' });
    }

    next();
}