const Publication = require('../models/publication');

exports.getAllPublications = () => Publication.find({});

exports.create = (publicationData) => Publication.create(publicationData);