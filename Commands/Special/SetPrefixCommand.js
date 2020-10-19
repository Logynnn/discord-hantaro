const { Command } = require('../../util');

const { Types } = require('mongoose');
const Guild = require('../../util/Schemas/Guilds');

module.exports = class SetPrefixCommand extends Command {
    constructor(client) {
        super(client, {
            command: 'setprefix',
            aliases: ['prefix']
        });
    }

    async run({ message, argsAlt, prefix }) {
        const settings = await Guild.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if (err) console.error(err);

            if (!guild) {
                const newGuild = new Guild({
                    _id: Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: this.client.config.prefix
                });

                newGuild.save()
                    .then(result => console.log(result))
                    .catch(console.error);

                return message.channel.send({
                    content:
                        'Este servidor não possui um banco de dados, então acabo de criar um. Por favor, execute o comando novamente!'
                })
                    .then(msg => msg.delete({ timeout: 10000 }));
            };
        });

        if (!argsAlt[0]) {
            return message.channel.send({
                content: 'Especifique um novo prefixo!'
            })
                .then(msg => msg.delete({ timeout: 10000 }));
        } else if (argsAlt[0].length > 4) {
            return message.channel.send({
                content: 'Especifique um prefixo com menos de 4 dígitos!'
            })
                .then(msg => msg.delete({ timeout: 10000 }));
        } else {
            await settings.updateOne({
                prefix: argsAlt[0]
            });

            return message.channel.send({
                content: 'Prefixo do servidor alterado para ' + argsAlt[0] + ' com sucesso!'
            });
        };
    }
};