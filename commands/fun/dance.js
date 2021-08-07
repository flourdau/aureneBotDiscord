const { MessageAttachment } =   require('discord.js');

module.exports  =    {

	name        :   'dance',
    aliases     :   ['danse'],
	description :   'Dance Dance Dance!',	
    usage       :   false,	
    guildOnly   :   false,
    args        :   false,	
    cooldown    :   5,
	permissions :   [
                        '862769533311254548',   //	Admin
                        '869925004014415952',	//	Bots
                        '862769533278093347',   //	Super Link
                        '862769533278093346',   //	Link
                        '862769533278093345'	//	New Link
                    ],


	execute(message) {

        const attachment    =   new MessageAttachment('https://i.imgur.com/mV9JF2y.gif');
        
        if (message.channel.type !== 'dm') {
            message.delete();
        }

        message.channel.send(attachment);

	},

};