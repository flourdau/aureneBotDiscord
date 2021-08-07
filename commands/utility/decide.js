const { emojiBot }	=	require('../../config.json');
const tabOui		=	require('../../../dicosJSON/oui.json');
const tabNon		=	require('../../../dicosJSON/non.json');
const myMath		=   require('../../../libJS/myMath.js');

module.exports	=	{

	name		:	'decide',
	aliases		:	['choix', 'choisi'],
	description	:	'Repond oui ou non',
    usage		:	false,
    guildOnly	:	true,
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

		const nb	=	myMath.getRandomArbitrary(0, 2);

		if (nb) {
		    message.channel.send(`${emojiBot} ` + tabOui[Math.floor(Math.random() * tabOui.length)] + `<@${message.author.id}>! : )`);
		}
		else {
			message.channel.send(`${emojiBot} ` + tabNon[Math.floor(Math.random() * tabNon.length)] + `<@${message.author.id}>! : )`);			
		}

	},

};