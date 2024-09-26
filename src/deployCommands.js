const { REST, Routes } = require('discord.js');
const { clientId, guildId, clientToken } = require('./config.json');

const fs = require('node:fs');
const path = require('node:path');
const commands = [];

const commandsPath = path.join(__dirname, 'commands');
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandsFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
    } else {
        console.log(`O comando em ${filePath} está faltando a propriedade 'data' ou 'execute'`);
    }
}

const rest = new REST().setToken(clientToken);

(async () => {
    try {
        console.log(`Carregando ${commands.length} comandos no aplicativo`);
        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );
        console.log(`${data.length} commands carrgados`);
    } catch (error) {
        console.error(error);
    }
})();