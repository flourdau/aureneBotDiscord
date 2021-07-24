const fetch                 =   require('node-fetch');
const { APIGW2, emojiBot }  =   require('../../config.json');

module.exports  =   {
	name        :   'deaths',
	aliases     :   ['mort'],
	description :   'Nombre de fois où Senacra est Mort dans GW2!',
    usage       :   false,	
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
        message.channel.send(`${emojiBot} <@270810792612462592> est morte ${gw2.deaths} fois! ^^`);

	},

};