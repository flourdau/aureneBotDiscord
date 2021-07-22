const { emojiBot }   =   require('../../config.json');

module.exports	=	{

	name	        :	'link',
	aliases         :   ['lien', 'site'],
	description     :   'A propos d\' Aurène',
    usage           :   false,	
    guildOnly       :   false,
	args            :   false,
	cooldown        :   30,
        
	execute(message)        {
		let githubAurene	= 'https://github.com/flourdau/aureneBotDiscord';
		let githubGrinder	= 'https://github.com/flourdau/grinderBotDiscord';
		let webSite			= 'https://positive-link.net';
		
		if (message.channel.type !== 'dm')	{
			message.delete();
		}
        message.author.send(`${ emojiBot } **Site internet :** ${webSite}\n**Github <@862023574004957255> :** ${githubAurene}\n**Github <@798552765399040020> :** ${githubGrinder}`);
	},

};