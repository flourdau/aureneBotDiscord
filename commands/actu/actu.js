module.exports  =   {

	name		:	'actu',
	aliases		:	['news', 'info', 'day'],
	description	:	'Actualité',
    usage		:	'<ville> -full',	
    guildOnly	:	false,
    cooldown	:	5,

	execute(message, args) {

		if (message.channel.type !== 'dm') {
			message.delete();
		}

		message.channel.send('/date');

		setTimeout(function() {
            if (args[0]) {
                message.channel.send(`!meteo ${args[0]} -full`);
            }
            if (args[1] === '-full' || args[1] === '-f') {
                message.channel.send('https://www.youtube.com/playlist?list=UUqt99sKYNTxqlHtzV9weUYA&playnext=1&index=1');
            }
            message.channel.send('https://www.youtube.com/playlist?list=PLCnUnV3yCIYuuHRjVDwiBaRDeSbEbGyZU&playnext=1&index=1');
        },      1000);

	},

};