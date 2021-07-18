
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const tabBonjour = require('../dicosJSON/bonjour.json');
const client = new Discord.Client({
    partials: [
        "MESSAGE",
        "REACTION"
    ]
});
// console.log(tabBonjour);

// Connection
client.login(token);

// Bot ready
client.once("ready", () => {
    client.user.setPresence({
        activity: {
            name:'Hello World!'
        }, 
        status: 'dnd'
    })
    .then(console.log)
    .catch(console.error)
})

// Commands response
client.on("message", (message) => {
    message.content = message.content.toLowerCase();
    if (message.content.indexOf("bonjour") !== -1) {
        message.channel.send(tabBonjour[Math.floor(Math.random()*tabBonjour.length)] + "! : )")
    }
    else if (message.content === `${prefix}ping`) {
		message.channel.send('Pong.');
	} else if (message.content === `${prefix}beep`) {
		message.channel.send('Boop.');
	} else if (message.content === `${prefix}server`) {
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	} else if (message.content === `${prefix}user-info`) {
		message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
	}
})

// send message all new members sur #welcome
client.on("guildMemberAdd", member => {
    // public message
        client.channels.resolve("862769535252693028").send(`Bienvenue <@${member.user.id}> !`);
    // private message
        member.send(`Bienvenue <@${member.user.id}> !`);
    })