module.exports  =    {

    name        :   'say',
	aliases     :   ['dire', 'aurene', 'aurène'],
	description :   'Repeat text!',
    usage       :   '<text>',	
    guildOnly   :   true,
	args        :   true,	
    cooldown    :   5,
	// permissions  :   '🌻Administrateur🌻',

    execute(message, args) {
        message.channel.send(`${args.join(' ')}`);
        message.delete();
	},

};