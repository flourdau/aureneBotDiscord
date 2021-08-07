const cron  =   require('node-cron');

module.exports	=	{

	name		:	'ready',
	description	:	'Affiche l\'actualité France 24',

    
	execute(client) {		
        
        cron.schedule('0 0 0,7,13,20 * * *', () => {
            const canalID   =   `862769536289734669`;
            const canal     =   client.channels.resolve(canalID);

            canal.send(`!actu Lille`);
        });

	},

};