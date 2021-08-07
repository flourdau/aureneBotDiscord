module.exports	=	{

	name		:	'stop',
	aliases		:	['arret', 'sp'],
	description	:	'Stop stream',
    usage		:	false,	
    guildOnly	:	false,
	args		:	false,
    cooldown	:	1,
	permissions :   [
						'862769533311254548',   //	Admin
						'869925004014415952',	//	Bots
						'862769533278093347',   //	Super Link
						'862769533278093346',   //	Link
						'862769533278093345'	//	New Link
					],


	execute(client) {

        const channelID     =   `868986550367711282`;
        const channel       =   client.channels.resolve(channelID);

		channel.leave();
		client.user.setPresence({ activity	:	{
										name	:	'Hello!',
										type	:	'CUSTOM_STATUS'
									}, 
									status		:	'online'} );
		return;

	},

};