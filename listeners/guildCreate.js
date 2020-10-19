const { Types } = require('mongoose');
const Guild = require('../util/Schemas/Guilds');

module.exports = (client, guild) => {
    guild = new Guild({
        _id: Types.ObjectId(),
        guildID: guild.id,
        guildName: guild.name,
        prefix: client.config.prefix
    });

    guild.save()
        .then(result => console.log(result))
        .catch(console.error);

    console.log('[GUILD_CREATE] Fui adicionado à um novo servidor!');
};