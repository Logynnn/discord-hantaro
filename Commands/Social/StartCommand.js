const { Command } = require('../../util');

const { Types } = require('mongoose');
const User = require('../../util/Schemas/Users');

module.exports = class StartCommand extends Command {
    constructor(client) {
        super(client, {
            command: 'start',
            aliases: ['iniciar']
        });
    }

    async run({ message }) {
        const settings = await User.findOne({
            userID: message.author.id,
            guildID: message.guild.id
        }, (err, user) => {
            if (err) console.error(err);

            if (!user) {
                const newUser = new User({
                    _id: Types.ObjectId(),
                    userID: message.author.id,
                    guildID: message.guild.id
                });

                newUser.save()
                    .then(result => console.log(result))
                    .catch(console.error);

                return message.channel.send({
                    content: 'Usuário criado!'
                });
            };
        });
    }
};