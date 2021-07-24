const { emojiBot }	=	require('../../config.json');

module.exports	=	{

	name	        :	'about',
	aliases         :   ['git'],
	description     :   'A propos d\' Aurène',
    usage           :   false,	
    guildOnly       :   false,
	args            :   false,
	cooldown        :   30,
        
	execute(message) {
		if (message.channel.type !== 'dm') {
			message.delete();
		}
        message.author.send(`${emojiBot} Voici le lien vers mon dépôt github:\n https://github.com/flourdau/aureneBotDiscord!`);
	},

};