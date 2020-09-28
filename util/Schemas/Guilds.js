const { Schema } = require('mongoose');

module.exports = new Schema({
    _id: {
        type: String
    },
    prefix: {
        type: String,
        default: require('../Assets/Config').prefix
    },
    lang: {
        type: String,
        default: 'ptBR'
    }
});