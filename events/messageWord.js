const { emojiBot }      =   require('../config.json');
const tabBonjour        =   require('../../../Collections/bonjour.json');
const tabAcclamation    =   require('../../../Collections/acclamation.json');

module.exports  =   {

	name    :   'message',


	async execute(message) {

        // Bonjour
        if ((message.content.toLowerCase().indexOf("bonjour") !== -1) && (!message.author.bot)) {
            setTimeout(function() {
                message.channel.send(`${emojiBot} ` + tabBonjour[Math.floor(Math.random() * tabBonjour.length)] + `<@${message.author.id}>! : )`)
            }, 1000);
        }

        // Youpi
        if ((message.content.toLowerCase().indexOf("youpi") !== -1) && (!message.author.bot)) {
            setTimeout(function() {
                message.channel.send(`${emojiBot} ` + tabAcclamation[Math.floor(Math.random() * tabAcclamation.length)] + `<@${message.author.id}>!`)
            }, 1000);
        }

    }

};