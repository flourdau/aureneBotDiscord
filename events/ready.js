const { emojiBot }   =   require('../config.json');
const myDate		 =   require('../lib/myDate.js');

module.exports  =   {

	name    :   'ready',
	once    :   true,

	execute(client) {

        console.log(`${emojiBot} ${myDate.getMyDateTime().myDate} ${myDate.getMyDateTime().myHour} I'm Up!\n`);
        client.channels.resolve("862769536289734669").send(`${emojiBot} ${myDate.getMyDateTime().myDate} ${myDate.getMyDateTime().myHour} I'm Up!\nLogged in as ${client.user.username} <@270810792612462592>`);
        client.user.setPresence({ activity  :   {
                                    name    :   'Hello!',
                                    type    :   'CUSTOM_STATUS'
                                }, 
                                status  :   'online'});
    },

};
