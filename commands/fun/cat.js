const fetch	=   require('node-fetch');

module.exports	=	{

	name		:	'cat',
	aliases		:	['chat', 'miaou', '😺'],
	description	:	'Miaou! 😺 COMMAND BUG XD!!!',
    usage		:	false,	
    guildOnly	:	false,
	args		:	false,
    cooldown	:	1,
	// permissions	:	'🌻Administrateur🌻',

	async execute(message) {
		
		const response = await fetch('https://aws.random.cat/meow');
		let file = {file:false};

		if (message.channel.type !== 'dm') {
			message.delete();
		}
		if (response.ok) {
			file = await response.json();
			message.channel.send(file.file);
		}

	},

};