const { emojiBot }	=	require('../../config.json');

module.exports	=	{

	name		:	'beep',
	aliases		:	['bip', 'test'],
	description	:	'beep-boop test',
    usage		:	false,	
    guildOnly	:	false,
	args		:	false,
    cooldown	:	1,
	// permissions	:	'🌻Administrateur🌻',

	execute(message) {

		message.channel.send(`${emojiBot} Boop!`);

	},

};