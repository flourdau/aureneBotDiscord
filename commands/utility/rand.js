const { emojiBot }   =   require('../../config.json');

module.exports  =   {

	name        :   'rand',
	description :   'Rand with min max, 1 & 6 by default',
	aliases     :   ['de', 'lance'],
	usage       :   '<min> <max>',	
    guildOnly   :   false,
    cooldown    :   5,
	permissions :   '💗New Link',
	permissions :   [
                        '862769533311254548',   //Admin
                        '862769533278093345',   //New Link
                        '862769533278093346',   //Link
                        '862769533278093347'    //Super Link
                    ],

    execute(message, args) {

        function getRandomArbitrary(min, max) {
            min =   Math.ceil(min);
            max =   Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min);
        }
        
        if (message.channel.type !== 'dm') {
            message.delete();
        }

        if (args.length === 2) {
            message.channel.send(`${emojiBot} Résultat du rand entre ${args[0]} & ${args[1]} pour <@${message.author.id}> est: **` + getRandomArbitrary(args[0], args[1]) + "**");
        }
        else {
            message.channel.send(`${emojiBot} Résultat du dé classic pour <@${message.author.id}>: **` + Math.floor(Math.random() * (6 - 1) + 1) + "**🎲");
        }

	},

};