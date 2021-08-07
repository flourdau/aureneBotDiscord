const { token, emojiBot }	=   require('../../config.json');

module.exports	=	{

	name        :   'resetbot',
	aliases     :   ['reset', 'restart', 'reboot'],
	description :   'Reset le bot! Enfin... ...je crois...XD',
	usage       :   false,	
    guildOnly   :   true,
	args		:   false,
    cooldown    :   1,
	permissions :   ['862769533311254548'],	//	Admin


	execute(message, NULL, client) {

		message.channel.send(`${emojiBot} Resetting...`)
						.then(msg => client.destroy(console.log(`${emojiBot} Resetting...`)))
						.then(() => client.login(token));

	},

};