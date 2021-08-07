const { prefix, emojiBot }	=	require('../../config.json');

module.exports	=	{

	name		:	'help',
	description	:	'Liste des commands ou les informations spécifiques d\'une command.',
	aliases		:	['commands', 'list', 'aide', 'man'],
	usage		:	'<command name>',
	cooldown	:	5,


	execute(message, args) {

		const data			=	[];
		const { commands }	=	message.client;

		if (!args.length) {

			data.push(`${emojiBot}Ici la liste des commands :`);
			data.push(commands.map(command => command.name).join(', '));
			data.push(`\nTu peux envoyer \`${prefix}help [command name]\` pour plus d\'informations!`);

			return message.author.send(data, { split: true })
				.then(() => {

					if (message.channel.type === 'dm') {
						return;
					}

					message.delete();
					message.reply(`${emojiBot} Je t\'envoi la liste des commands par MP!`);
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.reply(`${emojiBot} Désolé, Je ne peux pas te MP, tu les as désactivé?`);
				});
		}

		const name 		=	args[0].toLowerCase();
		const command	=	commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
		
		if (!command) {
			return message.reply(`${emojiBot} Command invalide!`);
		}
		
		data.push(`${emojiBot}\n**Nom :** ${command.name}`);
		
		if (command.aliases) {
			data.push(`**Alias :** ${command.aliases.join(', ')}`);
		}

		if (command.description) {
			data.push(`**Description :** ${command.description}`);
		}

		if (command.usage) {
			data.push(`**Usage :** ${prefix}${command.name} ${command.usage}`);
		}

		data.push(`**Cooldown :** ${command.cooldown || 1} second(s)`);
		
		message.channel.send(data, { split: true });

	},

};