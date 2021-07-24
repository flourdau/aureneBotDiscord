const { MessageEmbed }		=   require('discord.js');
module.exports	=	{

	name		:	'date',
	aliases		:	false,
	description	:	'Renvoie la date',
    usage		:	false,
    guildOnly	:	false,
	args		:	false,
    cooldown	:	1,
	// permissions	:	'🌻Administrateur🌻',

	execute(message, args, client) {
		
		if (message.channel.type !== 'dm') {
			message.delete();
		}
		const dateEmbed = new MessageEmbed().setColor('#0099ff')
											.setTitle(`${client.myDate().myDate}`);
		message.channel.send(dateEmbed);

	},

};