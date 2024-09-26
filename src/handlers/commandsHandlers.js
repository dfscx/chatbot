const fs = require('node:fs');
const path = require('node:path');
const ascii = require('ascii-table');

function getCommands(client) {
    const commandTable = new ascii().setHeading('Comandos', 'Status');
    const commandsPath = path.join(__dirname, '..', 'commands');
    const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandsFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`O comando em ${filePath} está faltando a propriedade 'data' ou 'execute'`);
        }
        commandTable.addRow(file, 'pronto');
    }
    console.log(commandTable.toString());
}

module.exports = { getCommands };