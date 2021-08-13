const { emojiBot }      =   require('../config.json');
const tabBonjour        =   require('../../../Collections/bonjour.json');
const tabAcclamation    =   require('../../../Collections/acclamation.json');

module.exports  =   {

	name    :   'message',


	async execute(message) {

        // Bonjour
        if ((message.content.toLowerCase().indexOf("bonjour") !== -1) && (!message.author.bot)) {
            setTimeout(function() {
                message.reply(`${emojiBot} ${tabBonjour[Math.floor(Math.random() * tabBonjour.length)]}! : )`)
            }, 1000);
        }

        // Youpi
        if ((message.content.toLowerCase().indexOf("youpi") !== -1) && (!message.author.bot)) {
            setTimeout(function() {
                message.reply(`${emojiBot} ${tabAcclamation[Math.floor(Math.random() * tabAcclamation.length)]}!`)
            }, 1000);
        }

    }

};