const cron              =   require('node-cron');

module.exports	=	{

	name		:	'ready',
	description	:	'TV',

	execute(client) {

        // all day at 17h30
        cron.schedule('59 29 17 * * *', () => {
            client.channels.resolve("862769535043239966").send(`!vu`);                 
        });

	},

};