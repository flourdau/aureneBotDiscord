module.exports	=	{

	name		:	'stop',
	aliases		:	['arret', 'sp'],
	description	:	'Stop stream',
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

	execute(message, args, client) {

        const channelID     =   `868986550367711282`;
        const channel       =   client.channels.resolve(channelID);

		channel.leave();
		client.user.setPresence({
		activity	:	{
			name	:	'Hello!',
			type	:	'CUSTOM_STATUS'
		}, 
		status		:	'online'});
		return;

	},

};