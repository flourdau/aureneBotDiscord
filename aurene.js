//  NEED HELP 4 CREATE A LIBRARY...
const myDate                    =  function getMyDate() {

    let d       = new Date();
    let local   = 'fr-FR';
    let options = {weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"};
    let myDate  = d.toLocaleDateString(local, options)
                    .toLowerCase()
                    .split(' ')
                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ');
    let myHour  = d.toLocaleTimeString(local);

    return { 'myDate' : myDate, 'myHour' : myHour };

}

const fs                        =   require('fs');
const { Client, Collection }    =   require('discord.js');
const { token }                 =   require('./config.json');

const client                    =   new Client({
    partials: [
        "GUILD_MEMBER",
        "MESSAGE",
        'CHANNEL',
        "REACTION"
    ]
});

client.myDate                   =   myDate;
client.commands                 =   new Collection();
client.cooldowns                =   new Collection();
client.aliases                  =   new Collection();

const eventFiles                =   fs.readdirSync('./events')
                                        .filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);

    if (event.once) {
        client.once(event.name, async (...args) => event.execute(...args, client));
    }
    else {
        client.on(event.name, async (...args) => event.execute(...args, client));
    }

}

const commandFolders            =   fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

client.login(token);