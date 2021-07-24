const { MessageEmbed }		=   require('discord.js');

module.exports  =   {

	name		:	'actu',
	aliases		:	['news', 'info', 'day'],
	description	:	'Actualité',
    usage		:	'<ville> -full',	
    guildOnly	:	false,
    cooldown	:	60,

	execute(message, args, client) {
        
        if (message.channel.type !== 'dm') {
            message.delete();
		}

        message.channel.send(`!datetime`);

        setTimeout(function() {
            message.channel.send(`https://www.youtube.com/playlist?list=PLCnUnV3yCIYuuHRjVDwiBaRDeSbEbGyZU&playnext=1&index=1`);
        },      500);

        if (args[1] === '-full' || args[1] === '-f') {
            setTimeout(function() {
                message.channel.send('https://www.youtube.com/playlist?list=UUqt99sKYNTxqlHtzV9weUYA&playnext=1&index=1');
            },      1000);
        }        

        if (args[0]) {
            setTimeout(function() {
                const cityEmbed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(args[0])

                message.channel.send(cityEmbed);
                message.channel.send(`!meteo ${args[0]} ${args[1]}`);
                message.channel.send(`!air ${args[0]} ${args[1]}`);
            },      3000);
        }

	},

};