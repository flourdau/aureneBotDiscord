const https                 		=   require('https');
const { MessageAttachment }			=   require('discord.js');
const { openweathermap, emojiBot }	=	require('../../config.json');
module.exports	=	{

	name	        :	'meteo',
	aliases         :   ['temps', 'météo'],
	description     :   'Météo par ville avec OpenWeatherMap',
    usage           :   '<ville> -full',	
    guildOnly       :   true,
	args        	:   true,
	cooldown        :   15,

	execute(message, args) {
		// if (args[0] === '-full') {
		// 	message.channel.send(`${emojiBot} Désolé, aucune ville trouvée pour la ville de ${args[0]}...`);
		// 	return;
		// }
		
		let city = args[0];
		let requestURL	=	`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openweathermap}&units=metric&lang=fr`;

        https.get(requestURL, (res) => {
            // console.log('statusCode:', res.statusCode);
            // console.log('headers:', res.headers);

            res.on('data', (d) => {
	
				d				=	JSON.parse(d);
				
				let icon		=	"http://openweathermap.org/img/w/" + d.weather[0].icon + ".png";
				let description	=	d.weather[0].description;
				let temp		=	d.main.temp;
				let Ressenti	=	d.main.feels_like;
				let pressure	=	d.main.pressure;
				let humidity	=	d.main.humidity;
				let speed		=	d.wind.speed;
				let deg			=	d.wind.deg;
				let sunrise		=	d.sys.sunrise;
				let sunset		=	d.sys.sunset;

                if (message.channel.type !== 'dm') {
                    message.delete();
                }

				const attachment    =   new MessageAttachment(`${icon}`);
				message.channel.send(attachment);
                message.channel.send(`${emojiBot} Météo pour la ville de ${city} : \`\`\`${description}\nTempérature\t:\t${temp}°C\nRessenti\t   :\t${Ressenti}°C\n\`\`\``);
				if (args[1] === '-full' || args[1] === '-f') {
	                message.channel.send(`\`\`\`Pression : ${pressure}hPa\nHumidité : ${humidity}%\nSpeed : ${speed}m/s ${deg}°\nLevé du soleil : ${sunrise}\nCouché du soleil : ${sunset}\n\`\`\``);
				}
            });
        })
        .on('error', (e) => {
            console.error(e);
        });

	},

};