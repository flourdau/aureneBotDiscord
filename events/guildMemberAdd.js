const { emojiBot }   =   require('../config.json');

module.exports  =   {

	name    :   'guildMemberAdd',

	async execute(member, client) {
        
        // public channel
        await client.channels.resolve("862769535252693028").send(`${emojiBot} Bienvenue <@${member.user.id}> !`);
        // private
        member.send(`${emojiBot} Bienvenue <@${member.user.id}> !`);

    }

};
