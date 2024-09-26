const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { clientToken } = require('./config.json');

const { getEvents } = require('./handlers/eventsHandlers');
const { getCommands } = require('./handlers/commandsHandlers');

const client = new Client({ intents: [Object.keys(GatewayIntentBits)] });
client.commands = new Collection();
client.login(clientToken).then(() => {
    getEvents(client);
    getCommands(client);
});