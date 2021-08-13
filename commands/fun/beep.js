const { emojiBot }	=	require('../../config.json');

module.exports	=	{

	name		:	'beep',
	aliases		:	['bip', 'test'],
	description	:	'beep-boop test',
    usage		:	false,	
    guildOnly	:	false,
	args		:	false,
    cooldown	:	10,
	permissions :   [
						'862769533311254548',   //	Admin
						'862769533278093347',   //	Super Link
						'862769533278093346',   //	Link
						'862769533278093345'	//	New Link
					],

					
	execute(message) {

		if (message.channel.type !== 'dm') {
			message.delete();
		}

		message.channel.send(`${emojiBot} Boop!`);

	},

};