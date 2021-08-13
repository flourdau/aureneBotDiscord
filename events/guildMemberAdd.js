const { emojiBot }   =   require('../config.json');
const tabBienvenue        =   require('../../../Collections/bienvenue.json');
const tabBonjour        =   require('../../../Collections/bonjour.json');

module.exports  =   {

	name    :   'guildMemberAdd',


	async execute(member, client) {
        
        const wordBienvenue =   tabBienvenue[Math.floor(Math.random() * tabBienvenue.length)];
        const wordBonjour   =   tabBonjour[Math.floor(Math.random() * tabBonjour.length)];

        await client.channels.resolve("862769535252693028").send(`${emojiBot} ${wordBonjour} & ${wordBienvenue} <@${member.user.id}> !`);
        member.send(`${emojiBot} N'hésite pas à demander de l'aide avec !help`);

    }

};
