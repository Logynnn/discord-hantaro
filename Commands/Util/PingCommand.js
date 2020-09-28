const { Command } = require('../../util');

module.exports = class Ping extends Command {
    constructor(client) {
        super(client, {
            command: 'ping',
            aliases: ['ping']
        });
    }

    async run({ message, argsAlt, prefix, command }) {
        message.channel.send({
            content: `**:ping_pong: Pong!** A latência é de **${this.client.ws.ping.toFixed(2)}ms**`
        });
    }
};