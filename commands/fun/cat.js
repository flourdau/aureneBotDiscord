const fetch	=   require('node-fetch');

module.exports	=	{

	name		:	'cat',
	aliases		:	['chat', 'miaou', '😺'],
	description	:	'Miaou! 😺!!!',
    usage		:	false,	
    guildOnly	:	false,
	args		:	false,
    cooldown	:	1,
	permissions :   [
						'862769533311254548',   //Admin
						'862769533278093345',   //New Link
						'862769533278093346',   //Link
						'862769533278093347'    //Super Link
					],

	async execute(message) {
		
		const response	=	await fetch('https://aws.random.cat/meow');

		if (message.channel.type !== 'dm') {
			message.delete();
		}
		if (response.ok) {
			let file	=	await response.json();
			message.channel.send(file.file);
		}

	},

};