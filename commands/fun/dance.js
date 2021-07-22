const { MessageAttachment } =   require('discord.js');

module.exports  =    {

	name        :   'dance',
    aliases     :   ['danse'],
	description :   'Dance Dance Dance!',	
    usage       :   false,	
    guildOnly   :   false,
    args        :   false,	
    cooldown    :   5,
        // permissions  :   '🌻Administrateur🌻',

	execute(message) {

        const attachment    =   new MessageAttachment('https://i.imgur.com/mV9JF2y.gif');
        console.log(attachment);
        
        if (message.channel.type !== 'dm') {
            message.delete();
        }
        message.channel.send(attachment);
	},

};