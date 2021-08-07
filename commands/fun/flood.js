const { emojiBot }   =   require('../../config.json');

module.exports  =   {

    name        :   'flood',
	aliases     :    ['spam', 'test'],
	description :   'Flood Party! XD',
    usage       :   '<max> <"text">',	
    guildOnly   :   false,
	args        :   true,	
    cooldown    :   5,
	permissions :   ['862769533311254548'], //  Admin


	execute(message, args) {

        args[0] =   parseInt(args[0]);

        let tmp =   args[0];
        args[0] =   '';

        args[1] =   `${args.join(' ')} `.repeat(tmp);

        if (message.channel.type !== 'dm')   {
            message.delete();
        }

        if (tmp > 0)  {
            message.channel.send(`${ emojiBot } Flood:\n\n${ args[1] } !!!`);
        }
        else {
            message.channel.send(`${ emojiBot } !flood <command> <max> <"text">`);
        }

    },

};