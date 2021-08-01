const fs					=	require('fs');
const { prefix, emojiBot }	=	require('../../config.json');

module.exports	=	{

	name        :   'reload',
	aliases     :   ['recharge', 'rl'],
	description :   'Recharge une command',
	usage       :   '<command name>',	
    guildOnly   :   false,
	args		:   true,
    cooldown    :   5,
	permissions :   [
						'862769533311254548'   //Admin
					],

	execute(message, args) {

		const commandName	=	args[0].toLowerCase();
		const command		=	message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return message.channel.send(`${emojiBot} Pas de Command : \`${commandName}\` (${prefix}help), ${message.author}!`);
		}

		const commandFolders	=	fs.readdirSync('./commands');
		const folderName		=	commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`));

		delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

		try {
			const newCommand	=	require(`../${folderName}/${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			message.channel.send(`Command \`${newCommand.name}\` rechargée!`);
		}
		catch (error) {
			console.error(error);
			message.channel.send(`Erreur pendant la recharge de la command : \`${command.name}\`:\n\`${error.message}\``);
		}

	},
};