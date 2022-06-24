const Publication = require('../models/publication');

exports.getAllPublications = () => Publication.find();
exports.getOne = (publicationId) => Publication.findById(publicationId);
exports.getOneDetailed = (publicationId) => Publication.findById(publicationId).populate('author');
exports.create = (publicationData) => Publication.create(publicationData);
exports.update = (publicationId, publicationData) => Publication.findByIdAndUpdate({_id: publicationId}, {$set: publicationData}, {runValidators: true});