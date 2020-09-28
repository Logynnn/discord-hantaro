module.exports = client => {
    console.log(`Bot ${client.user.tag} - Iniciado com sucesso!`);
    client.register.fileCommands('./commands');
    client.user.setActivity('olá');
};