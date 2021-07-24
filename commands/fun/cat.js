const fetch	=   require('node-fetch');

module.exports	=	{

	name		:	'cat',
	aliases		:	['chat', 'miaou', '😺'],
	description	:	'Miaou! 😺',
    usage		:	false,	
    guildOnly	:	false,
	args		:	false,
    cooldown	:	1,
	// permissions	:	'🌻Administrateur🌻',

	async execute(message) {
		
		const { file }	=	await fetch('https://aws.random.cat/meow').then(response => response.json())
																		.catch(console.error);
		
        if (message.channel.type !== 'dm') {
            message.delete();
        }
        message.channel.send(file);

	},

};