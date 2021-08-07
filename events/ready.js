const { emojiBot }      =   require('../config.json');
const myDate		    =   require('../../libJS/myDate.js');
const tabBonjour        =   require('../../dicosJSON/bonjour.json');
const tabAcclamation    =   require('../../dicosJSON/acclamation.json');
const tabNFSW           =   require('../../dicosJSON/nfsw.json');

module.exports  =   {

	name    :   'ready',
	once    :   true,


	async execute(client) {
        
        const bonjour       =   tabBonjour[Math.floor(Math.random() * tabBonjour.length)];
        const acclamation   =   tabAcclamation[Math.floor(Math.random() * tabAcclamation.length)];
        const nfsw          =   tabNFSW[Math.floor(Math.random() * tabNFSW.length)];

        
        console.log(`${emojiBot} ${nfsw}!\n`);
        console.log(`${emojiBot} ${myDate.getMyDateTime().myDate} ${myDate.getMyDateTime().myHour}!`);
        console.log(`${emojiBot} ${acclamation}! ${bonjour} Senacra Flora Van Haze!`);
        client.channels.resolve("862769536289734669").send(`${emojiBot} ${myDate.getMyDateTime().myDate} ${myDate.getMyDateTime().myHour} I'm Up!\nLogged in as ${client.user.username}`);
        client.user.setPresence({ activity  :   {
                                    name    :   'Hello!',
                                    type    :   'CUSTOM_STATUS'
                                }, 
                                status  :   'online'});
    },

};
