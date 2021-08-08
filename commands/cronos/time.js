const { MessageEmbed }	=	require('discord.js');
const myDate			=   require('../../../../Libs/libJS/myDate.js');

module.exports	=	{

	name		:	'time',
	aliases		:	['heure'],
	description	:	'Renvoie l\'heure',
    usage		:	false,
    guildOnly	:	false,
	args		:	false,
    cooldown	:	1,
	permissions :   [
						'862769533311254548',   //	Admin
						'869925004014415952',	//	Bots
						'862769533278093347',   //	Super Link
						'862769533278093346',   //	Link
						'862769533278093345'	//	New Link
					],

	execute(message) {
		
		if (message.channel.type !== 'dm') {
			message.delete();
		}
		
		const dateEmbed	=	new MessageEmbed().setColor('#0099ff')
												.setTitle(`${myDate.getMyDateTime().myHour}`);
		message.channel.send(dateEmbed);

	},

};