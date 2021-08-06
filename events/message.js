const { Collection }        =   require('discord.js');
const { prefix, emojiBot }  =   require('../config.json');

module.exports = {

	name    :   'message',

	async execute(message, client) {

		console.log(`${message.author.tag} in #${message.channel.name || "DM"} sent: ${message.content}`);
        
        if (!message.content.startsWith(prefix) ) {
            return;
        }

        const args  =   message.content.slice(prefix.length).trim().split(/ +/);
        const commandName   =   args.shift().toLowerCase();

        // COMMANDS & ALIASES
        const command   =   client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) {
            return message.reply('command Invalide!..');
        }

        //  ONLY DM
        if (command.guildOnly && message.channel.type === 'dm') {
            return message.reply('je ne peux pas executer cette commande en privé, désolé!');
        }

        //  PERMISSIONS
        if (command.permissions) {
            let perm    =   false

            perm = await client.guilds.cache.get('862769533278093342').members.fetch(message.author.id).then(authorPerms => {
                let verif   =   false;

                for (const perm of command.permissions) {
                    if (verif = authorPerms._roles.includes(perm)) {
                        break;
                    }
                };
                          
                return verif;
            });

            if (!perm) {
                if (message.channel.type !== 'dm') {
                    message.delete();
                }
                return message.author.send(`Pas de permission pour ${prefix}${commandName}, désolé ${message.author}!`);
            }

        }

        //  ARGS ERRORS
        if (command.args && !args.length) {
            let reply   =   `${emojiBot} Erreur d\'arguments, ${message.author}!`;

            if (command.usage) {
                reply += `\nUsage : \`${prefix}${command.name} ${command.usage}\``;
            }

            return message.channel.send(reply);
        }

        //  COOLDOWNS
        const { cooldowns } =   client;

        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Collection());
        }

        const now               =   Date.now();
        const timestamps        =   cooldowns.get(command.name);
        const cooldownAmount    =   (command.cooldown || 3) * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime    =   timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft  =   (expirationTime - now) / 1000;
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

	}

};