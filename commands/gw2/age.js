const fetch                 =   require('node-fetch');
const { APIGW2, emojiBot }  =   require('../../config.json');

module.exports  =    {
	name        :   'age',
	aliases     :   false,
	description :   'Play Times in Guild Wars 2 for Senacra!',
    usage       :   '<command>',	
    guildOnly   :   false,
	args        :   false,	
    cooldown    :   60,
	// permissions  :   '🌻Administrateur🌻',
    
    async execute(message) {

        let requestURL  =   `https://api.guildwars2.com/v2/characters/Senacra%20Flora%20Haze/core?access_token=${APIGW2}`;
		let gw2		    =	await fetch(requestURL).then(res => res.json())
                                                    .catch(console.error);

        if (message.channel.type !== 'dm') {
            message.delete();
        }
        message.channel.send(`${emojiBot} Play Times in Guild Wars 2 for <@${message.author.id}>` + Math.floor(gw2.age / 60 /60 / 24) + " days!..");

    },

};