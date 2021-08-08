const cron          =   require('node-cron');
const tabBonjour    =   require('../../../Collections/bonjour.json');

module.exports	=	{

	name		:	'ready',
	description	:	'Renvoie bonjour',


	execute(client) {

        // 6h42
        cron.schedule('59 41 6 * * *', () => {

            //  actualité
            const canalID   =   `867622707049660496`;
            const messageID =   `872539388909879348`;
            const bonjour   =   tabBonjour[Math.floor(Math.random() * tabBonjour.length)];
            let canal       =   client.channels.resolve(canalID);
            
            canal.messages.fetch(messageID)
                            .then(message => {message.edit(`${bonjour}!`);});

            //  aurene-tts
            client.channels.resolve("871516708865716274").send(`${bonjour}!`, { tts  :   true });
                            
        });

	},

};