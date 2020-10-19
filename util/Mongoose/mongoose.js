const mongoose = require('mongoose');

module.exports = {
    init: () => {
        mongoose.connect();
    }
};