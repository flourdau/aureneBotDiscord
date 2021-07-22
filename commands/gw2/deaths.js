const https                 =   require('https');
const { APIGW2, emojiBot }  =   require('../../config.json');

module.exports  =   {
	name        :   'deaths',
	aliases     :   ['mort'],
	description :   'Nombre de fois où Senacra est Mort dans GW2!',
    usage       :   false,	
    guildOnly   :   false,
	args        :   false,
    cooldown    :   15,
	// permissions  :   '🌻Administrateur🌻',

    execute(message) {

        let requestURL  =   `https://api.guildwars2.com/v2/characters/Senacra%20Flora%20Haze/core?access_token=${APIGW2}`;

        https.get(requestURL, (res) => {
            // console.log('statusCode:', res.statusCode);
            // console.log('headers:', res.headers);

            res.on('data', (d) => {
                let deaths = JSON.parse(d).deaths;

                if (message.channel.type !== 'dm') {
                    message.delete();
                }
                message.channel.send(`${emojiBot} <@270810792612462592> est morte ${deaths} fois! ^^`);
            });
        })
        .on('error', (e) => {
            console.error(e);
        });

	},

};