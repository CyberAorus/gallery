const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    paintingTechnique: {
        type: String,
        required: true
    },
    artPicture: {
        type: String,
        required: true
    },
    certificate: {
        type: String,
        required: true,
        enum: ['Yes', 'No']
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    usersShared: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],

});


const Publication = mongoose.model('Publication', publicationSchema);
module.exports = Publication;