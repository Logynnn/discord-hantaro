const { Command } = require('../../util');

module.exports = class AvatarCommand extends Command {
    constructor(client) {
        super(client, {
            command: 'avatar',
            aliases: ['av']
        });
    }

    async run({ message, argsAlt }) {
        let target = argsAlt[0] ?
            message.mentions.users.first ||
                this.client.users.cache.find(
                    user => user.username.toLowerCase() == argsAlt.join(' ').toLowerCase() ||
                        user.tag.toLowerCase() == argsAlt.join(' ').toLowerCase()
                ) ||
                message.guild.members.cache.find(
                    user => user.displayName.toLowerCase().includes(argsAlt.join(' ').toLowerCase())
                ) ||
                await this.client.users.fetch(argsAlt[0]).catch(console.error) || message.author
            : message.author;
        target = target.user ? target.user : target;

        return message.channel.send({
            embed: {
                color: this.client.config.defaultColor,
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