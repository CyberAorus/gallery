const Publication = require('../models/publication');

exports.create = (publicationData) => Publication.create(publicationData);