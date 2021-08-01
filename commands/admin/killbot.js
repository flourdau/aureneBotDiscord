const { emojiBot }	=	require('../../config.json');

module.exports	=	{

	name        :   'killbot',
	aliases     :   ['die', 'shutdown'],
	description :   '💀 Tue Aurène! RIP Aurène...',
	usage       :   false,	
    guildOnly   :   false,
	args		:   false,
    cooldown    :   1,
	permissions :   [
						'862769533311254548'   //Admin
					],


	execute(message) {

		message.channel.send(`${emojiBot} Bye...`)
				.then(msg => process.exit(console.log(`${emojiBot} Bye...`)));

	},

};