const https                 =   require('https');
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
    
    execute(message) {

        let requestURL  =   `https://api.guildwars2.com/v2/characters/Senacra%20Flora%20Haze/core?access_token=${APIGW2}`;

        https.get(requestURL, (res) => {
            // console.log('statusCode:', res.statusCode);
            // console.log('headers:', res.headers);

            res.on('data', (d) => {
                if (message.channel.type !== 'dm') {
                    message.delete();
                }
                message.channel.send(`${emojiBot} Play Times in Guild Wars 2 for <@${message.author.id}>` + Math.floor(JSON.parse(d).age / 60 /60 / 24) + " days!..");
            });
        })
        .on('error', (e) => {
            console.error(e);
        });

    },

};