const { emojiBot }      =   require('../config.json');
const myDate		    =   require('../lib/myDate.js');
const cron              =   require('node-cron');
const tabBonjour        =   require('../../dicosJSON/bonjour.json');
const tabAcclamation    =   require('../../dicosJSON/acclamation.json');
const message = require('./message');

module.exports  =   {

	name    :   'ready',
	once    :   true,

	execute(client) {



        //  !epic all jeudi 18h
        let c1 = cron.schedule('0 0 18 * * Thu', () => {
            client.channels.resolve("867622707049660496").send(`!epic`);
        });
        //  !actu all 6h
        let c2 = cron.schedule('0 0 0,7,13,20 * * *', () => {
            client.channels.resolve("867622707049660496").bulkDelete(50);
            client.channels.resolve("867622707049660496").send(`!actu`);
        });
        //  bonjour at 6h42
        let c3 = cron.schedule('0 42 6 * * *', () => {
            // client.channels.resolve("871516708865716274").bulkDelete(50);
            const bonjour   =   tabBonjour[Math.floor(Math.random() * tabBonjour.length)];
            client.channels.resolve("871516708865716274").send(`${bonjour}!`, { tts  :   true });
        });
        //  all minutes
        let c4 = cron.schedule('58 * * * * *', () => {

            setTimeout(function() {
                let canal = client.channels.resolve("871451269158543420");
                let messageID =   canal.lastMessageID;
// console.log(messageID);
//                 if (!messageID) {
//                     canal.send(`⏲ ${myDate.getMyDateTime().myHour}`);
//                 }
//                 else {
                    canal.messages.fetch(messageID)
                                    .then(message => {message.edit(`⏲ ${myDate.getMyDateTime().myHour}`);});
                // }
            }, 2000);
        });

        console.log(`${emojiBot} ${myDate.getMyDateTime().myDate} ${myDate.getMyDateTime().myHour} I'm Up!\n`);
        client.channels.resolve("862769536289734669").send(`${emojiBot} ${myDate.getMyDateTime().myDate} ${myDate.getMyDateTime().myHour} I'm Up!\nLogged in as ${client.user.username} <@270810792612462592>`);
        client.user.setPresence({ activity  :   {
                                    name    :   'Hello!',
                                    type    :   'CUSTOM_STATUS'
                                }, 
                                status  :   'online'});
    },

};
