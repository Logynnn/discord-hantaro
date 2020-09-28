const { Command } = require('../../util');

module.exports = class AvatarCommand extends Command {
    constructor(client) {
        super(client, {
            command: 'avatar',
            aliases: ['av']
        });
    }

    async run({ message, args }) {
        let target = message.mentions.users.first() ||
        message.guild.members.cache.find(
          x => x.displayName.toLowerCase() === args.join(" ").toLowerCase()
        ) ||
        message.guild.members.cache.find(
          x => x.user.username.toLowerCase() === args.join(" ").toLowerCase()
        ) ||
        message.guild.members.cache.get(args[0]) ||
        message.author;
      target = target.user == undefined ? target : target.user;

        return message.channel.send({
            embed: {
                color: '#433B67',
                image: {
                    url: target.displayAvatarURL({ format: 'png', size: 1024 })
                },
                author: {
                    name: `🖼 Avatar de ${target.tag}`
                }
            }
        });
    }
};