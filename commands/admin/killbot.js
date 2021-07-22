const { emojiBot }	=	require('../../config.json');

module.exports	=	{

	name        :   'killbot',
	aliases     :   ['die', 'shutdown', 'stop'],
	description :   'Tue le bot! RIP le bot',
	usage       :   false,	
    guildOnly   :   false,
	args		:   false,
    cooldown    :   1,
	// permissions :   '🌻Administrateur🌻',

	execute(message, args, client) {

		function killBot(channel, client) {
			channel.send(`${emojiBot}Bye...`)
			.then(msg => client.destroy(console.log('die')));
		}

		killBot(message.channel, client);

	},

};