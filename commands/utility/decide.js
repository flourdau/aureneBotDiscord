const { emojiBot }	=	require('../../config.json');
const tabOui		=	require('../../../dicosJSON/oui.json');
const tabNon		=	require('../../../dicosJSON/non.json');

module.exports	=	{

	name		:	'decide',
	aliases		:	['choix', 'choisi'],
	description	:	'Repond oui ou non',
    usage		:	false,
    // guildOnly	:	true,
	args		:	false,
    cooldown	:	1,
	// permissions	:	'🌻Administrateur🌻',

	execute(message) {

		function getRandomArbitrary(min, max) {
			min	=	Math.ceil(min);
            max	=	Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min);
        }
		
		let nb	=	getRandomArbitrary(0, 2);

		if (nb) {
		    message.channel.send(`${emojiBot} ` + tabOui[Math.floor(Math.random() * tabOui.length)] + `<@${message.author.id}>! : )`);
		}
		else {
			message.channel.send(`${emojiBot} ` + tabNon[Math.floor(Math.random() * tabNon.length)] + `<@${message.author.id}>! : )`);			
		}

	},

};