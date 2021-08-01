const myDate                    =   require('./lib/myDate.js');
const fs                        =   require('fs');
const { Client, Collection }    =   require('discord.js');
const { token }                 =   require('./config.json');

const client                    =   new Client({
    partials    :   [
        "GUILD_MEMBER",
        "MESSAGE",
        'CHANNEL',
        "REACTION"
    ]
});

client.myDateUp                 =   myDate.getMyDateTime();
client.commands                 =   new Collection();
client.cooldowns                =   new Collection();
client.aliases                  =   new Collection();

const eventFiles                =   fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const commandFolders            =   fs.readdirSync('./commands');

for (const file of eventFiles) {
    const event =   require(`./events/${file}`);

    if (event.once) {
        client.once(event.name, async (...args) => event.execute(...args, client));
    }
    else {
        client.on(event.name, async (...args) => event.execute(...args, client));
    }

}

for (const folder of commandFolders) {
	const commandFiles  =   fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	
    for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

client.login(token);