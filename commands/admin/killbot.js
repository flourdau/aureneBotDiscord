const { emojiBot }	=	require('../../config.json');

module.exports	=	{

	name        :   'killbot',
	aliases     :   ['die', 'shutdown', 'stop'],
	description :   '💀 Tue Aurène! RIP Aurène...',
	usage       :   false,	
    guildOnly   :   false,
	args		:   false,
    cooldown    :   1,
	// permissions :   '🌻Administrateur🌻',

	execute(message) {

		message.channel.send(`${emojiBot} Bye...`)
				.then(msg => process.exit(console.log(`${emojiBot} Bye...`)));

	},

};