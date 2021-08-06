const ytpl = require('ytpl');

module.exports  =   {

	name		:	'vu',
	aliases		:	['zapping'],
	description	:	'Vu tous les soirs 20h05? sur France 3!',
    usage		:	false,	
    guildOnly	:	false,
    cooldown	:	60,
	permissions :   [
                        '862769533311254548',   //Admin
                        '869925004014415952',	//Bots
                    ],


	async execute(message, args, client) {
        
        if (message.channel.type !== 'dm') {
            message.delete();
		}

        const canalID       =   `862792394272276541`;
        const messageVuID   =   `872947116564156436`;
        const canal         =   client.channels.resolve(canalID);
        const playlist      =   await ytpl(`UUqt99sKYNTxqlHtzV9weUYA`, { pages: 1 });
        const shortUrl      =   playlist.items[0].shortUrl;

        canal.messages.fetch(messageVuID)
                        .then(message => {message.edit(shortUrl);});
	},

};