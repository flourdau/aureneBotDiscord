const { token }   =   require('../../config.json');

module.exports	=	{

	name        :   'resetbot',
	aliases     :   ['reset', 'restart'],
	description :   'Reset le bot! Enfin... ...je crois...XD',
	usage       :   false,	
    guildOnly   :   true,
	args		:   false,
    cooldown    :   1,
	// permissions :   '🌻Administrateur🌻',

	execute(message, NULL, client) {

		function resetBot(channel, client) {
			channel.send('Resetting...')
			.then(msg => client.destroy(console.log('die')))
			.then(() => client.login(token));
		}

		resetBot(message.channel, client);

	},

};