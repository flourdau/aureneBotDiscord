const fs                            =   require('fs');
const { Client, Collection, MessageEmbed }        =   require('discord.js');
const { prefix, token, emojiBot }   =   require('./config.json');
const tabBonjour                    =   require('../dicosJSON/bonjour.json');

const client                        =   new Client({
    partials: [
        "MESSAGE",
        'CHANNEL',
        "REACTION"
    ]
});
client.commands                     =   new Collection();
client.cooldowns                    =   new Collection();
client.aliases                      =   new Collection();

const commandFolders                =   fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}


// Bot ready
client.once('ready', () => {
    console.log(`${emojiBot} I am Ready!`);
    // client.user.setPresence({
    //     activity: {
    //         name:'Hello World!'
    //     }, 
    //     status: 'dnd'
    // })
    // .then(console.log)
    // .catch(console.error)
}
);


// Commands & Actions
client.on('message', message => {

    // Reaction 🎁 & crosspost of all messages in channel Gift: 862769534757502980
    if ((message.channel.id === '862769534757502980') && (message.channel.type === 'news')) {
            message.react('🎁');
            message.crosspost()
              .then(() => console.log('Crossposted message'))
              .catch(console.error);
    }
    
    // Bonjour
    if ((message.content.indexOf("bonjour") !== -1) && (!message.author.bot)) {
        setTimeout(function() {
            message.channel.send(`${emojiBot} ` + tabBonjour[Math.floor(Math.random() * tabBonjour.length)] + `<@${message.author.id}>! : )`)
        }, 1000);
    }

	if (!message.content.startsWith(prefix) ) {
        return;
    }

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName  = args.shift().toLowerCase();

    // COMMANDS & ALIASES
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) {
        return message.reply('that\'s not a valid command!');
    }

    //  ONLY DM
    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('Je ne peux pas executer cette commande en privé, désolé!');
    }

    //  PERMISSIONS
    if (command.permissions) {
        const authorPerms = message.channel.permissionsFor(message.author);
        if (!authorPerms || !authorPerms.has(command.permissions)) {
            return message.reply('Pas de permission, désolé!');
        }
    }

    //  ARGS ERRORS
    if (command.args && !args.length) {
        let reply = `${emojiBot} Erreur d\'arguments, ${message.author}!`;
    
        if (command.usage) {
            reply += `\nUsage : \`${prefix}${command.name} ${command.usage}\``;
        }
    
        return message.channel.send(reply);
    }

    //  COOLDOWNS
    const { cooldowns } = client;

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`${emojiBot} Patiente : ${timeLeft.toFixed(1)} seconde(s) pour utiliser la command \`${command.name}\` merci.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    //  EXECUTE COMMAND
	try {
		command.execute(message, args, client);
	}
    catch (error) {
		console.error(error);
		message.reply('Erreur pendant l\'éxecution de la command!');
	}

});


// Send message all new members in #welcome
client.on("guildMemberAdd", member => {
    // public channel
    client.channels.resolve("862769535252693028").send(`Bienvenue <@${member.user.id}> !`);
    // private
    member.send(`Bienvenue <@${member.user.id}> !`);
})


// Réactions #charte add role 'new-ink'
client.on("messageReactionAdd", async (reaction, user) => {
    if (reaction.message.id === "862796269960822824" && reaction.emoji.name === "💗") {
        let member = reaction.message.guild.members.cache.get(user.id);
        let role = reaction.message.guild.roles.cache.get("862769533278093345");

        setTimeout(function() {
            member.send(`Tu possédes un petit pouvoir <@${member.user.id}>, te voilà automatiquement ${role.name}!`);
        }, 1000);
    }

})


// Réactions 🎁
client.on("messageReactionAdd", async (reaction, user) => {

    if (reaction.message.channel.id !== "862769534757502980" && reaction.emoji.name === "🎁") {
        try {
            await reaction.fetch();
        }
        catch (error) {
            console.error('Something went wrong when fetching the message: ', error);
            return;
        }

        // clone to a message
        let tmp = reaction.message;
        if (tmp.content === '') {
            tmp = reaction.message.attachments.first();
            
            if (!tmp) {
                tmp = reaction.message.embeds;
            }
            client.channels.resolve("862769534757502980").send(tmp);
        }
        else {
            client.channels.resolve("862769534757502980").send(`${tmp}`);
        }
        
        console.log(tmp);
        // Reply to a Reaction
        reaction.message.reply(`Merci <@${user.id}>!.. : )`)
        .then(() => console.log(`Sent a reply to ${user.username} Reaction`))
        .catch(console.error);

        // Reply to a Message author if diff of react
    }
})


client.login(token);