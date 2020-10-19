const { Command } = require('../../util');

module.exports = class PingCommand extends Command {
    constructor(client) {
        super(client, {
            command: 'ping',
            aliases: ['latency']
        });
    }

    async run({ message, argsAlt, prefix, command }) {
        message.channel.send({
            content: `**:ping_pong: Pong!** A latência é de **${this.client.ws.ping.toFixed(2)}ms**`
        });
    }
};