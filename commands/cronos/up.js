const { MessageEmbed }	=   require('discord.js');

module.exports  =    {

    name        :   'up',
	description :   'Retourne le datetime de boot!',
    usage       :   '<text>',
	args        :   false,	
    cooldown    :   5,
	permissions :   ['862769533311254548'],	//	Admin


    execute(message, NULL, client) {

		const dateEmbed	=	new MessageEmbed().setColor('#0099ff')
												.setTitle(`${client.myDateUp.myHour}\n${client.myDateUp.myDate}`);
		if (message.channel.type !== 'dm') {
			message.delete();
		}

		message.author.send(dateEmbed);

	},

};