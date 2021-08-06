const { MessageEmbed }	=	require('discord.js');
const cron              =   require('node-cron');
const myDate            =   require('../lib/myDate.js');

module.exports	=	{

	name		:	'ready',
	description	:	'Affiche l\'heure',

	execute(client) {		

        cron.schedule('*/59 * * * * *', () => {

            const canalID       =   `867622707049660496`;
            const messageID     =   `872539388909879348`;
            const canal         =   client.channels.resolve(canalID);
            const horlogeEmbed	=	new MessageEmbed().setColor('#0099ff')
                                                        .setTitle(`${myDate.getMyDateTime().myDate} ${myDate.getMyDateTime().myHour}`);

            canal.messages.fetch(messageID)
                            .then(message => {message.edit(horlogeEmbed);});
    
        });

	},

};