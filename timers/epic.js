const cron  =   require('node-cron');

module.exports	=	{

	name		:	'ready',
	description	:	'epic games',


	execute(client) {

        // all Thuday at 18h
        cron.schedule('59 59 17 * * Thuday', () => {
            client.channels.resolve("862769534757502980").send(`!epic`);         
        });

	},

};