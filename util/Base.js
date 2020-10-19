const { Types } = require('mongoose');
const Guild = require('./Schemas/Guilds');

module.exports = class Base {
    constructor(client) {
        this.client = client;
        this.database = this.client.database;

        this._cooldown = {
            commands: new Map()
        };
    }

    async emitMessage(message) {
        if (message.author.bot || message.channel.type == 'dm') return;

        this.emitCommand(message);
    }

    async emitCommand(message) {
        const id = this.client.user.id;

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
                        'Este servidor não possui um banco de dados, então acabo de criar uma. Agora você pode tirar proveito de meus comandos!'
                })
                    .then(msg => msg.delete({ timeout: 10000 }));
            };
        });

        const prefixes = [settings.prefix || this.client.prefix, `<@${id}>`, `<@!${id}>`];
        const prefix = prefixes.find(content => message.content.startsWith(content)) || false;
        if(!prefix || !message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(' ');
        const argsAlt = [...args].join(' ').split(/ +/g).slice(1);
        
        const command = [...args].join(' ').split(/ +/g).shift().toLowerCase();
        args.shift();

        const cmdRun = this.client.register.commands.find(c => c.command === command || c.aliases.includes(command));
        if (cmdRun) {
            const inCooldown = this._cooldown.commands.get(message.author.id);
            let cooldown = 5000;
            if (inCooldown) cooldown = Date.now() - inCooldown;

            if (!inCooldown || cooldown >= 3000) {
                this._cooldown.commands.set(message.author.id, Date.now());
                cmdRun.run({ message, args, argsAlt , prefix, command, firstUpperLetter: this.firstUpperLetter });
            } else {
                const seconds = Math.floor(((inCooldown + 3000) - Date.now()) / 1000);
                
                message.channel.send(`aguarde ${seconds ? seconds + ' segundos' : 'alguns milissegundos'}`);
            };
        };
    }

    firstUpperLetter (str = 'no string') {
        return str[0].toUpperCase() + str.slice(1);
    }

    mentionReplace(str = null) {
        if(!str) return 'no string';
        const id = this.client.user.id;
        const mentions = [`<@${id}>`, `<@!${id}>`];
        if(mentions.some(mention => str.includes(mention))) {
            let text = str;
            for(var i = 0, length = mentions.length; i < length; i++) {
                const mention = mentions[i];
                if(text.includes(mention)) text = text.split(mention).join(`@${this.client.user.username} `);
            }
            return text;
        } else { return str };
    }
};