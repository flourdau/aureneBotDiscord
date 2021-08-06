const { emojiBot }      =   require('../config.json');
const tabBonjour        =   require('../../dicosJSON/bonjour.json');
const tabAcclamation    =   require('../../dicosJSON/acclamation.json');

module.exports  =   {

	name    :   'message',

	async execute(message) {

        // Bonjour
        if ((message.content.indexOf("bonjour") !== -1) && (!message.author.bot)) {
            setTimeout(function() {
                message.channel.send(`${emojiBot} ` + tabBonjour[Math.floor(Math.random() * tabBonjour.length)] + `<@${message.author.id}>! : )`)
            }, 1000);
        }

        // Youpi
        if ((message.content.indexOf("youpi") !== -1) && (!message.author.bot)) {
            setTimeout(function() {
                message.channel.send(`${emojiBot} ` + tabAcclamation[Math.floor(Math.random() * tabAcclamation.length)] + `<@${message.author.id}>!`)
            }, 1000);
        }

    }

};