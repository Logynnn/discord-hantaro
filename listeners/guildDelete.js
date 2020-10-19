const Guild = require('../util/Schemas/Guilds');

module.exports = (client, guild) => {
    Guild.findOneAndDelete({
        guildID: guild.id
    }, (err, res) => {
        if (err) console.error(err);

        console.log('[GUILD_REMOVE] Fui removido de um servidor...');
    });
};