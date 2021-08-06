const ytpl = require('ytpl');

module.exports  =   {

	name		:	'actu',
	aliases		:	['news', 'info', 'day'],
	description	:	'Actualité',
    usage		:	'<ville> --full',	
    guildOnly	:	false,
    cooldown	:	60,
	permissions :   [
                        '862769533311254548',   //Admin
                        '869925004014415952',	//Bots
                        '862769533278093345',   //New Link
                        '862769533278093346',   //Link
                        '862769533278093347'    //Super Link
                    ],

	async execute(message, args, client) {

        if (message.channel.type !== 'dm') {
            message.delete();
		}

        const canalID   =   `867622707049660496`;
        const messageID =   `872539390273003580`;
        const canal     =   client.channels.resolve(canalID);
        const playlist  =   await ytpl(`PLCnUnV3yCIYuuHRjVDwiBaRDeSbEbGyZU`, { pages: 1 });
        const url       =   playlist.url;
        
        setTimeout(function() {
            canal.messages.fetch(messageID)
                            .then(message => {message.edit(`${url}&playnext=1&index=1`);});
        }, 500);

        if (args.length > 0 && (args[0].search(/[^A-Za-z\s]/) === -1)) {
            city = args.join(' ');
            
            setTimeout(function() {
                const canalLogID    =   `862769536289734669`;
                const canalLog      =   client.channels.resolve(canalLogID);

                canalLog.send(`!meteo ${city}`);
                canalLog.send(`!air ${city}`);
            }, 3000);
        }
        
        if (!message.author.bot) {
            message.author.send(`Je viens de up <#867622707049660496>! :) `);
        }

    },

};