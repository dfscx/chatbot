const fs = require('node:fs');
const path = require('node:path');
const ascii = require('ascii-table');

function getEvents(client) {
    const eventsTable = new ascii().setHeading('Eventos', 'Status');
    const eventsPath = path.join(__dirname, '..', 'events');
    const eventsFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
    for (const file of eventsFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
        eventsTable.addRow(file, 'pronto');
    }
    console.log(eventsTable.toString());
}

module.exports = { getEvents };