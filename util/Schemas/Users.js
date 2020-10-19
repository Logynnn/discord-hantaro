const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userID: {
        type: String,
        default: null
    },
    guildID: {
        type: String,
        default: null
    },
    xp: {
        type: Number,
        default: 0,
    },
    level: {
        type: Number,
        default: 0,
    }
});

// module.exports = model('Users', UserSchema, 'users');