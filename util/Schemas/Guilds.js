const { Schema, model } = require('mongoose');

const GuildSchema = Schema({
    _id: Schema.Types.ObjectId,
    guildID: String,
    guildName: String,
    prefix: String
});

module.exports = model('Guild', GuildSchema, 'guilds');