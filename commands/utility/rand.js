const { emojiBot }  =   require('../../config.json');
const myMath		=   require('../../../libJS/myMath.js');

module.exports  =   {

	name        :   'rand',
	description :   'Rand with min max, 1 & 6 by default',
	aliases     :   ['de', 'lance'],
	usage       :   '<min> <max>',	
    guildOnly   :   false,
    cooldown    :   5,
	permissions :   '💗New Link',
	permissions :   [
                        '862769533311254548',   //	Admin
                        '869925004014415952',	//	Bots
                        '862769533278093347',   //	Super Link
                        '862769533278093346',   //	Link
                        '862769533278093345'	//	New Link
                    ],


    execute(message, args) {
        
        if (message.channel.type !== 'dm') {
            message.delete();
        }

        if (args.length === 2) {
            message.channel.send(`${emojiBot} Résultat du rand entre ${args[0]} & ${args[1]} pour <@${message.author.id}> est: **` + myMath.getRandomArbitrary(args[0], args[1]) + "**");
        }
        else {
            message.channel.send(`${emojiBot} Résultat du dé classic pour <@${message.author.id}>: **` + Math.floor(Math.random() * (6 - 1) + 1) + "**🎲");
        }

	},

};