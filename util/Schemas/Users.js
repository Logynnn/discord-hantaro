const { Schema } = require('mongoose');

module.exports = new Schema({
    _id: {
        type: String
    },
    roles: {
        type: Array,
        default: [] // ['owner', 'developers', 'especials']
    },
    rep: {
        type: Map,
        default: { total: 0, last: 0 }
    }
});